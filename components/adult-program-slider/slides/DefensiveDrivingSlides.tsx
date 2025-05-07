"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import DefensiveProgramCard from '../cards/DefensiveProgramCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, when: "afterChildren" }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

const DefensiveDrivingSlides: React.FC = () => {
  const [currentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

  useEffect(() => {
    controls.set("hidden");
    setObserverInitialized(true);
  }, [controls]);

  useEffect(() => {
    if (!observerInitialized) return;

    const refCopy = containerRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        requestAnimationFrame(() => controls.start("visible"));
      } else {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    if (refCopy) observer.observe(refCopy);

    return () => {
      if (refCopy) observer.unobserve(refCopy);
    };
  }, [controls, observerInitialized]);

  useEffect(() => {
    if (isVisible && observerInitialized) {
      requestAnimationFrame(() => controls.start("visible"));
    }
  }, [currentSlide, controls, isVisible, observerInitialized]);

  const defensiveSlides: SlideProps[] = [
    {
      title: "Defensive Driving Courses",
      content: (
        <motion.div
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.h1 className="text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
              Defensive Driving Courses
            </motion.h1>
            <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              NSC-Approved Remedial & Defensive Driving Courses
            </motion.p>
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
              At MyDrive Academy, our National Safety Council (NSC)-approved programs—Remedial Driving Course,
              Defensive Driving Course (DDC), and Alive at 25—are designed to help drivers meet legal requirements,
              reduce violations, and develop better road awareness.
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={cardsContainerVariants}>
            <motion.div variants={cardVariants}>
              <DefensiveProgramCard
                title="Remedial Course"
                subtitle="License Reinstatement"
                price={100}
                points={[
                  "In this 4-hour class, drivers with a suspended license due to traffic violations or court orders.",
                  "Improve Your Driving, Reduce Risks, and Meet Legal Requirements."
                ]}
                icon={<Shield />}
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <DefensiveProgramCard
                title="Defensive Driving Course"
                subtitle="Dismiss Tickets, Lower Insurance, Drive Safe"
                price={95}
                points={[
                  "This 4-hour class may qualify you for up to 10% discounts on car insurance and workers' compensation discounts for companies with fleet vehicles.",
                  "Prevent fines or points, improve driving skills, and qualify for insurance discounts."
                ]}
                icon={<Shield />}
              />
            </motion.div>

            <motion.div variants={cardVariants}>
              <DefensiveProgramCard
                title="Alive at 25"
                subtitle="Smart Choices for Young Drivers"
                price={45}
                points={[
                  "For drivers aged 15-24 cited for traffic violations or required by courts, schools, or employers.",
                  "May qualify for up to 10% car insurance discounts or workers' comp savings for fleet-driving employers."
                ]}
                icon={<Shield />}
              />
            </motion.div>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
            <motion.div className="flex justify-center space-x-4 mb-4" variants={itemVariants}>
              <motion.a
                href="#select-location"
                className="bg-emerald-500 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Select Location
              </motion.a>
              <motion.div
                className="flex items-center text-gray-700"
                variants={itemVariants}
                animate={{
                  x: [0, 5, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
              >
                <span className="mr-2">→</span>
                <span>Schedule</span>
                <span className="mx-2">→</span>
                <span>Registration</span>
              </motion.div>
            </motion.div>

            <motion.div className="text-center mt-6 text-gray-600" variants={itemVariants}>
              <motion.p className="mb-2" variants={itemVariants}>
                ***Looking for driving with professional instructors?{' '}
                <motion.a
                  href="/adult-programs-best-sellers"
                  className="text-emerald-600 hover:underline"
                  whileHover={{ scale: 1.05, color: "#10b981" }}
                  transition={{ duration: 0.2 }}
                >
                  Click here!
                </motion.a>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )
    }
  ];

  return (
    <div
      className="py-12 px-4 bg-white relative overflow-hidden h-[680px]"
      ref={containerRef}
    >
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

      <div className="transition-all duration-500 ease-in-out">
        {defensiveSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default DefensiveDrivingSlides;

