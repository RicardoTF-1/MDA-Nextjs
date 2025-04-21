"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Car, BookOpen, Award } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import ProgramCard from '../cards/ProgramCard';
import BottomLink from '../common/BottomLink';
import FooterNotes from '../common/FooterNotes';
import SlideNavigation from '../common/SlideNavigation';

interface AdultProgramSlidesProps {
  // Any props needed for API connections can be added here
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

const buttonVariants: Variants = {
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
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

const AdultProgramSlides: React.FC<AdultProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Function to navigate to the next slide
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to navigate to the previous slide
  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to navigate to a specific slide
  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Setup Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Just set the visibility state here, don't call controls.start yet
        setIsVisible(entry.isIntersecting);
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
  }, []);

  // Handle animation controls separately, after component has mounted
  useEffect(() => {
    if (isMounted) {
      if (isVisible) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }
  }, [isVisible, controls, isMounted]);

  // Reset animation when slide changes
  useEffect(() => {
    if (isMounted && isVisible) {
      controls.start("visible");
    }
  }, [currentSlide, controls, isVisible, isMounted]);

  // Adult Programs Slides content
  const slides: SlideProps[] = [
    // Slide 0 - Original Adult Programs
    {
      title: "Adult Programs",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-2 sm:px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-4 sm:mb-6" variants={itemVariants}>
            <motion.h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4" variants={itemVariants}>Adult Programs</motion.h1>
            <motion.p className="text-sm sm:text-base text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Whether you're a first-time driver or looking for a refresher, MyDrive Academy offers personalized adult driving programs tailored
              to your needs. Our expert instructors provide comprehensive training for safe driving.
            </motion.p>
          </motion.div>
          <motion.div className="mt-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 shadow-md" variants={itemVariants}>
            <motion.h2 className="text-xl font-semibold text-gray-800 mb-4 text-center" variants={itemVariants}>
              Here's how to get your driver's license:
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <motion.div 
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border-l-4 border-emerald-500"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">
                  <BookOpen size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">1. Secure Your Learner's Permit</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Start your driving journey by obtaining your learner's permit.
                </p>
                <motion.a
                  href="/permit-prep" 
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1 px-2 sm:py-1.5 sm:px-3 text-xs sm:text-sm rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Get Permit Help
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border-l-4 border-emerald-500"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">
                  <Car size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">2. Learn How to Drive</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Professional driving lessons tailored to your skill level.
                </p>
                <motion.a
                  href="/adult-programs-best-sellers" 
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1 px-2 sm:py-1.5 sm:px-3 text-xs sm:text-sm rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Lessons
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border-l-4 border-emerald-500"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">
                  <Award size={28} className="text-emerald-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">3. Pass your Road Test</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2">
                  Comprehensive preparation to ensure you pass your driving test.
                </p>
                <motion.a
                  href="/adult-programs-slide-3" 
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1 px-2 sm:py-1.5 sm:px-3 text-xs sm:text-sm rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Road Test Prep
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div className="mt-4 sm:mt-6 text-center space-x-2 sm:space-x-4" variants={itemVariants}>
            <motion.a
              href="/contact"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1.5 px-3 sm:py-2 sm:px-5 text-xs sm:text-sm rounded-lg shadow-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Contact Us
            </motion.a>
            
            <motion.a
              href="/courses"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-1.5 px-3 sm:py-2 sm:px-5 text-xs sm:text-sm rounded-lg shadow-sm"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              View All Programs
            </motion.a>
          </motion.div>
        </motion.div>
      )
    },
    // Slide 1 - Best Sellers Programs
    {
      title: "Adult Programs: Best Sellers",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-2 sm:px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center" variants={itemVariants}>
            Adult Programs: Best Sellers
          </motion.h1>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Core Package" 
                subtitle="6 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Perfect for beginners looking for structured practice.",
                  "Covers fundamental techniques and test preparation."
                ]}
                icon={<Car size={24} />}
                compact={true}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Essential Package" 
                subtitle="8 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Ideal for drivers who want extra practice.",
                  "Builds confidence with more hands-on experience."
                ]}
                icon={<Car size={24} />}
                compact={true}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Essential Pro" 
                subtitle="12 Hours Behind-the-Wheel + Road Test"
                extraInfo="Parallel Parking & Highway"
                description={[
                  "For those seeking comprehensive training.",
                  "Includes Parallel Parking and Highway Driving."
                ]}
                icon={<Car size={24} />}
                compact={true}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <BottomLink 
              viewAllLink="/adult-programs" 
              linkText="View All Adult Programs" 
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FooterNotes />
          </motion.div>
        </motion.div>
      )
    },
    // Slide 2 - More Adult Programs
    {
      title: "More Adult Programs",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-2 sm:px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center" variants={itemVariants}>
            More Adult Programs
          </motion.h1>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Express Drive Package" 
                subtitle="2 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Quick refresher before taking the road test.",
                  "Covers fundamental driving techniques."
                ]}
                icon={<Car size={24} />}
                compact={true}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Quick Start Package" 
                subtitle="4 Hours Behind-the-Wheel + Road Test"
                description={[
                  "For those needing a quick refresher.",
                  "Covers essential skills for test confidence."
                ]}
                icon={<Car size={24} />}
                compact={true}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Expert Driver Package" 
                subtitle="Permit Prep + 2 Hrs + Road Test"
                description={[
                  "For non-U.S. citizens without SSN.",
                  "Available in English or Spanish"
                ]}
                cta="Register Now"
                icon={<Car size={24} />}
                compact={true}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <BottomLink 
              viewAllLink="/adult-programs" 
              linkText="Explore All Program Options" 
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FooterNotes />
          </motion.div>
        </motion.div>
      )
    }
  ];

  return (
    <div 
      className="py-4 sm:py-6 px-2 sm:px-4 bg-white relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background decorative elements - reduced size */}
      <motion.div 
        className="absolute -top-10 -left-10 w-20 h-20 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8 }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-10 -right-10 w-20 h-20 bg-emerald-50 rounded-full opacity-30"
        animate={isVisible ? { scale: [0.8, 1], opacity: [0, 0.3] } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.div>
      
      {/* Slide navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {slides[currentSlide].content}
      </div>
    </div>
  );
};

export default AdultProgramSlides;