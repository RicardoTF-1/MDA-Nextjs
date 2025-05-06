"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Car, Award, Users } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import TeenProgramCard from '../cards/TeenProgramCard';
import TeenBottomSection from '../common/TeenBottomSection';
import SlideNavigation from '../common/SlideNavigation';

interface TeenProgramSlidesProps {
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

const stepsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15
    }
  }
};

const stepVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
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
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const TeenProgramSlides: React.FC<TeenProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === teenSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? teenSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Initialize animation state
  useEffect(() => {
    // Set the initial animation state without triggering animations
    controls.set("hidden");
    
    // Mark component as ready for the observer
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
        // Use requestAnimationFrame to ensure component is mounted
        requestAnimationFrame(() => {
          controls.start("visible");
        });
      } else {
        setIsVisible(false);
        // We don't need to set it back to hidden when not intersecting
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

  // Teen Programs Slides content
  const teenSlides: SlideProps[] = [
    {
      title: "Teen Driver's Education Programs",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-6 text-center" 
            variants={itemVariants}
          >
            Teen Driver's Education
          </motion.h1>
          
          {/* Full Width Layout */}
          <motion.div 
            className="bg-gray-50 rounded-xl p-6 shadow-sm"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl font-bold text-gray-800 mb-6 text-center"
              variants={itemVariants}
            >
              License Process
            </motion.h2>
            
            {/* Steps Layout */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
              variants={stepsContainerVariants}
            >
              {/* Step 1 - Classroom */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                variants={stepVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mb-2">1</div>
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookOpen size={28} className="text-white" />
                  </motion.div>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">30 Hours Classroom</h3>
                <p className="text-gray-600 text-xs">Complete driver's ed course</p>
              </motion.div>
              
              {/* Step 2 - Permit Test */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                variants={stepVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mb-2">2</div>
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">Pass Permit Test</h3>
                <p className="text-gray-600 text-xs">At local DMV office</p>
              </motion.div>
              
              {/* Step 3 - BTW Training */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                variants={stepVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mb-2">3</div>
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Car size={28} className="text-white" />
                  </motion.div>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">6 Hours BTW Training</h3>
                <p className="text-gray-600 text-xs">With certified instructor</p>
              </motion.div>
              
              {/* Step 4 - Practice */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                variants={stepVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mb-2">4</div>
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">50 Hours Practice</h3>
                <p className="text-gray-600 text-xs">With licensed adult</p>
              </motion.div>
              
              {/* Step 5 - Road Test */}
              <motion.div 
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
                variants={stepVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mb-2">5</div>
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Award size={28} className="text-white" />
                  </motion.div>
                </div>
                <h3 className="font-semibold text-gray-800 text-base mb-1">Road Test</h3>
                <p className="text-gray-600 text-xs">At age 16+ with 9mo permit</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Requirements Footer */}
          <motion.div 
            className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-700"
            variants={itemVariants}
          >
            <motion.p 
              className="font-medium mb-2 text-center"
              variants={itemVariants}
            >
              Requirements:
            </motion.p>
            <motion.ul 
              className="list-disc pl-5 space-y-1 max-w-lg mx-auto"
              variants={itemVariants}
            >
              <motion.li variants={itemVariants}>Must be 15-17 years old</motion.li>
              <motion.li variants={itemVariants}>Parent/guardian consent required</motion.li>
              <motion.li variants={itemVariants}>Valid learner's permit for behind-the-wheel training</motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>
      )
    },
    // Slide 1 - Complete Program
    {
      title: "Teen Driving Programs: Complete Program",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-8 text-center"
            variants={itemVariants}
          >
            Teen Driving Programs: Complete Program
          </motion.h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={cardsContainerVariants}
          >
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Partner Program"
                subtitle="30 Hours Driver's Education Classroom + 6 hrs Behind-the-Wheel"
                subtitleColor="emerald-400"
                points={[
                  "Partner required to register.",
                  "Teens with or without prior driving experience who need basic training",
                  "Includes 6 hours of behind-the-wheel training and 6 hours of partner observation."
                ]}
                icon={<Users />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Solo Program"
                subtitle="30 Hours Driver's Education Classroom + 8 hrs Behind-the-Wheel"
                subtitleColor="emerald-400"
                bestSeller={true}
                points={[
                  "(For teens with or without prior driving experience)",
                  "Covers core driving techniques, parking skills, and defensive driving strategies",
                  "Includes 8 hours of one-on-one behind-the-wheel training."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Teens Driver's Education"
                subtitle="30 Hours Classroom ONLY"
                subtitleColor="emerald-400"
                points={[
                  "State-mandatory classroom portion for all new teen drivers.",
                  "Learn all road rules and road signs.",
                  "Obtain your driver's permit during the second week of the course."
                ]}
                buttonText="Register Now"
                icon={<BookOpen />}
              />
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TeenBottomSection />
          </motion.div>
        </motion.div>
      )
    },
    // Slide 2 - Behind-the-Wheel Training Options 1
    {
      title: "Teen Driving Programs: Behind-the-Wheel Training Options",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-8 text-center"
            variants={itemVariants}
          >
            Teen Driving Programs: Behind-the-Wheel Training Options
          </motion.h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={cardsContainerVariants}
          >
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Partner Program"
                subtitle="6 Hours Behind-the-Wheel"
                subtitleColor="emerald-400"
                points={[
                  "Partner required to register.",
                  "Teens with or without prior driving experience who need basic training",
                  "Includes 6 hours of behind-the-wheel training and 6 hours of partner observation."
                ]}
                icon={<Users />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Solo Program"
                subtitle="8 Hours Behind-the-Wheel"
                subtitleColor="emerald-400"
                bestSeller={true}
                points={[
                  "Fully meets the state's driving practice requirement for teens.",
                  "Covers Core driving techniques, parking skills, and defensive driving strategies.",
                  "Includes 8 hours of one-on-one behind-the-wheel training."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="12-Hr Teen Package"
                subtitle="12 Hours Behind-the-Wheel"
                subtitleColor="emerald-400"
                bestSeller={true}
                points={[
                  "Designed for teens <strong>with or without prior driving experience</strong> who need <strong>basic training</strong>",
                  "Covers <strong>core driving techniques, parking skills, and defensive driving strategies</strong>",
                  "Includes <strong>12 hours of behind-the-wheel training</strong>",
                  "Increased hands-on practice, night driving basics and confidence-building"
                ]}
                icon={<Car />}
              />
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TeenBottomSection />
          </motion.div>
        </motion.div>
      )
    },
    // Slide 3 - Behind-the-Wheel Training Options 2
    {
      title: "Teen Driving Programs: Behind-the-Wheel Training Options",
      content: (
        <motion.div 
          className="max-w-6xl mx-auto px-4 py-12 h-[600px]"
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-8 text-center"
            variants={itemVariants}
          >
            Teen Driving Programs: Behind-the-Wheel Training Options
          </motion.h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={cardsContainerVariants}
          >
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="12-Hr Teen Package"
                subtitle="12 Hours Behind-the-Wheel"
                subtitleColor="emerald-400"
                bestSeller={true}
                points={[
                  "Teens looking for more in-depth training before taking their road test.",
                  "Increased hands-on practice, night driving basics, and enhanced confidence-building.",
                  "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Extra Practice 1"
                subtitle="25 Hours Behind-the-Wheel"
                subtitleColor="emerald-400"
                points={[
                  "Teens seeking extensive training to master safe driving habits.",
                  "Advanced maneuvering, highway driving, and real-world traffic experience.",
                  "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <TeenProgramCard 
                title="Extra Practice 2"
                subtitle="50 Hours Behind-the-Wheel"
                subtitleColor="emerald-400"
                points={[
                  "New drivers aiming for full proficiency and meeting state-supervised driving requirements.",
                  "Comprehensive behind-the-wheel training, varied road conditions, and mastery of defensive driving techniques.",
                  "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
                ]}
                icon={<Car />}
              />
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TeenBottomSection />
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
        totalSlides={teenSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {teenSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default TeenProgramSlides;
