"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Car } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import ChauffeurProgramCard from '../cards/ChauffeurProgramCard';
import SlideNavigation from '../common/SlideNavigation';

interface ChauffeurProgramSlidesProps {
  // Add props for API integration if needed
}

// Animation variants
const containerVariants: Variants = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3
    }
  }
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const linkVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0 
  },
  hover: {
    scale: 1.05,
    color: "#10b981", // emerald-600
    transition: {
      duration: 0.2
    }
  }
};

const ChauffeurProgramSlides: React.FC<ChauffeurProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === chauffeurSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? chauffeurSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Setup Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        } else {
          setIsVisible(false);
          controls.start("hidden");
        }
      },
      { threshold: 0.1 } // 10% visibility threshold
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  // Reset animation when slide changes
  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [currentSlide, controls, isVisible]);

  // Chauffeur Training Programs Slides content
  const chauffeurSlides: SlideProps[] = [
    {
      title: "Chauffeur Training Programs",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <motion.h1 className="text-5xl font-bold text-gray-900 mb-6" variants={itemVariants}>
              Chauffeur Training Programs
            </motion.h1>
            <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Chauffeur Training at MyDrive Academy! At MyDrive Academy, we equip you with the knowledge and skills to 
              take charge of your career in the chauffeur industry. Whether you're pursuing a career as a limousine 
              chauffeur or taxicab driver, our programs cover everything you need—from rules and regulations to customer 
              service and city navigation.
            </motion.p>
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
              Our courses are approved by the BACP (Business Affairs and Consumer Protection) of the City of Chicago, 
              ensuring you receive the most up-to-date and relevant training.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
            variants={cardsContainerVariants}
          >
            <motion.div variants={cardVariants}>
              <ChauffeurProgramCard 
                title="Become a Licensed Livery (Restricted) Chauffeur"
                subtitle="One-Day Program"
                price="120"
                points={[
                  "For professional drivers in luxury transport services",
                  "This license allows the licensee to drive limousines and Uber Black",
                  "Covers customer service, safe driving techniques, navigation skills, and professional etiquette, providing you with the expertise to excel in private car, limo, and executive transportation services."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <ChauffeurProgramCard 
                title="Become a Licensed Taxi Chauffeur"
                subtitle="Four-Day Program"
                price="250"
                points={[
                  "This license allows the licensee to drive taxicabs, limousines, and Uber Black",
                  "For Professional Taxi and Rideshare Drivers Our Licensed Taxi Chauffeur Training focuses on city navigation, passenger safety, traffic laws, and efficient route planning to ensure you deliver reliable, professional service.",
                  "This course prepares you for a successful career in taxi or rideshare driving, meeting all regulatory requirements while equipping you with the skills to navigate busy city streets with confidence."
                ]}
                icon={<Car />}
              />
            </motion.div>
          </motion.div>
          
          <motion.div className="text-center" variants={itemVariants}>
            <motion.p className="text-sm text-gray-700 mb-4" variants={itemVariants}>
              ***Looking for driving with professional instructors? {' '}
              <motion.a 
                href="/adult-programs-best-sellers" 
                className="text-emerald-600 hover:underline"
                variants={linkVariants}
                whileHover="hover"
              >
                Click here!
              </motion.a>
            </motion.p>
            <motion.p className="text-red-500" variants={itemVariants}>
              Redirected to Adult Programs Best Sellers
            </motion.p>
          </motion.div>
        </motion.div>
      )
    }
  ];

  return (
    <div 
      className="py-12 px-4 bg-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8 }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.div>
      
      {/* Slide navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={chauffeurSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {chauffeurSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default ChauffeurProgramSlides;