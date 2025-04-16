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
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

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

  // Initial animation state
  useEffect(() => {
    // Set the initial animation state
    controls.set("hidden");
    
    // Mark the component as ready for the observer
    setObserverInitialized(true);
  }, [controls]);

  // Setup Intersection Observer for scroll-based animations
  useEffect(() => {
    // Only set up the observer after the initial animation state is set
    if (!observerInitialized) return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Schedule the animation for the next frame to ensure component is mounted
        requestAnimationFrame(() => {
          controls.start("visible");
        });
      } else {
        setIsVisible(false);
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls, observerInitialized]);

  // Reset animation when slide changes
  useEffect(() => {
    if (isVisible && observerInitialized) {
      // Use requestAnimationFrame to ensure component is mounted
      requestAnimationFrame(() => {
        controls.start("visible");
      });
    }
  }, [currentSlide, controls, isVisible, observerInitialized]);

  // Adult Programs Slides content
  const slides: SlideProps[] = [
    // Slide 0 - Original Adult Programs
    {
      title: "Adult Programs",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-10" variants={itemVariants}>
            <motion.h1 className="text-5xl font-bold text-gray-900 mb-6" variants={itemVariants}>Adult Programs</motion.h1>
            <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Whether you're a first-time driver or looking for a refresher, MyDrive Academy offers personalized adult driving programs tailored
              to your needs. Our expert instructors provide comprehensive training, including permit test preparation, defensive driving
              techniques, and road test readiness. We are committed to building safe, skilled, and confident drivers ready to navigate Illinois
              roads with ease!
            </motion.p>
          </motion.div>
          <motion.div className="mt-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-md" variants={itemVariants}>
            <motion.h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center" variants={itemVariants}>
              Here's how to get your driver's license:
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-4">
                  <BookOpen size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Secure Your Learner's Permit.</h3>
                <p className="text-gray-700 mb-4">
                  Start your driving journey by obtaining your learner's permit.
                </p>
                <motion.a
                  href="/permit-prep" 
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Get Permit Help
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-4">
                  <Car size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Learn How to Drive.</h3>
                <p className="text-gray-700 mb-4">
                  Professional driving lessons tailored to your skill level.
                </p>
                <motion.a
                  href="/adult-programs-best-sellers" 
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Lessons
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-4">
                  <Award size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Pass your Road Test.</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive preparation to ensure you pass your driving test.
                </p>
                <motion.a
                  href="/adult-programs-slide-3" 
                  className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Road Test Prep
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div className="mt-12 text-center space-x-6" variants={itemVariants}>
            <motion.a
              href="/contact"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Contact Us
            </motion.a>
            
            <motion.a
              href="/courses"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
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
          className="max-w-6xl mx-auto px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 className="text-5xl font-bold text-gray-900 mb-10 text-center" variants={itemVariants}>
            Adult Programs: Best Sellers
          </motion.h1>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Core Package" 
                subtitle="6 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Perfect for beginners looking for structured practice and essential skills to drive safely.",
                  "This package covers fundamental driving techniques, basic maneuvers, and road test preparation to ensure you're fully ready for your test."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Essential Package" 
                subtitle="8 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Ideal for new drivers who want extra practice beyond the basics to build confidence.",
                  "Provides more hands-on experience, improves driving skills, test readiness, and defensive abilities."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Essential Pro" 
                subtitle="12 Hours Behind-the-Wheel + Road Test"
                extraInfo="Parallel Parking & Highway Driving"
                description={[
                  "Drivers seeking comprehensive training, including challenging maneuvers.",
                  "Includes Parallel Parking and Highway Driving, building strong driving fundamentals."
                ]}
                icon={<Car />}
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
          className="max-w-6xl mx-auto px-4"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 className="text-5xl font-bold text-gray-900 mb-10 text-center" variants={itemVariants}>
            More Adult Programs
          </motion.h1>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Express Drive Package" 
                subtitle="2 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Perfect for those needing a quick refresher before taking the road test.",
                  "Covers fundamental driving techniques and road test preparation."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Quick Start Package" 
                subtitle="4 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Ideal for those needing a quick refresher before their road test.",
                  "This package covers essential skills, corrects common mistakes, and builds confidence for the test."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <ProgramCard 
                title="Expert Driver Package" 
                subtitle="Permit Prep + 2 Hours Behind-the-Wheel + Road Test"
                description={[
                  "Designed for non-U.S. citizens without a Social Security Number.",
                  "Includes permit exam preparation, state-mandated instruction, and a streamlined path to an Illinois driver's license.",
                  "Available in English or Spanish"
                ]}
                cta="Register Now"
                icon={<Car />}
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
      
      {/* Slide navigation - Not animating this to maintain functionality */}
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