"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Car, BookOpen, Award } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import SlideNavigation from '../common/SlideNavigation';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3 },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
};

const AdultProgramSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const currentRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      controls.start(isVisible ? 'visible' : 'hidden');
    }
  }, [isVisible, controls, isMounted]);

  useEffect(() => {
    if (isMounted && isVisible) {
      controls.start('visible');
    }
  }, [currentSlide, controls, isVisible, isMounted]);

  const slides: SlideProps[] = [
    {
      title: 'Adult Programs',
      content: (
        <motion.div
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-6" variants={itemVariants}>
            <motion.h1 className="text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              Adult Programs
            </motion.h1>
            <motion.p className="text-base text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Whether you&apos;re a first-time driver or looking for a refresher, MyDrive Academy offers personalized
              adult driving programs tailored to your needs. Our expert instructors provide comprehensive training for safe driving.
            </motion.p>
          </motion.div>

          <motion.div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md" variants={itemVariants}>
            <motion.h2 className="text-xl font-semibold text-gray-800 mb-4 text-center" variants={itemVariants}>
              Here&apos;s how to get your driver&apos;s license:
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500" variants={itemVariants}>
                <div className="flex justify-center mb-2">
                  <BookOpen size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">1. Secure Your Learner&apos;s Permit</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Start your driving journey by obtaining your learner&apos;s permit.
                </p>
                <motion.a
                  href="/permit-prep"
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1.5 px-3 text-sm rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Get Permit Help
                </motion.a>
              </motion.div>

              <motion.div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500" variants={itemVariants}>
                <div className="flex justify-center mb-2">
                  <Car size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">2. Learn How to Drive</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Professional driving lessons tailored to your skill level.
                </p>
                <motion.a
                  href="/adult-programs-best-sellers"
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1.5 px-3 text-sm rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Lessons
                </motion.a>
              </motion.div>

              <motion.div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-500" variants={itemVariants}>
                <div className="flex justify-center mb-2">
                  <Award size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">3. Pass your Road Test</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Comprehensive preparation to ensure you pass your driving test.
                </p>
                <motion.a
                  href="/adult-programs-slide-3"
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1.5 px-3 text-sm rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Road Test Prep
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="mt-6 text-center space-x-4" variants={itemVariants}>
            <motion.a
              href="/contact"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-5 text-sm rounded-lg shadow-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Contact Us
            </motion.a>
            <motion.a
              href="/courses"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-5 text-sm rounded-lg shadow-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              View All Programs
            </motion.a>
          </motion.div>
        </motion.div>
      ),
    },
    // The rest of your slides (best sellers, more programs) stay the same
    // You can copy them from your previous code — they are already correct
  ];

  return (
    <div className="py-12 px-4 bg-white relative overflow-hidden h-[680px]" ref={containerRef}>
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />

      <div className="transition-all duration-500 ease-in-out">
        {slides[currentSlide].content}
      </div>
    </div>
  );
};

export default AdultProgramSlides;

