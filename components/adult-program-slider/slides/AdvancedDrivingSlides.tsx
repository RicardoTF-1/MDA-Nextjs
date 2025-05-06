"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Car } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import AdvancedSkillsCard from '../cards/AdvancedSkillsCard';
import SlideNavigation from '../common/SlideNavigation';

interface AdvancedDrivingSlidesProps {
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

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardItemVariants: Variants = {
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
    y: 20 
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

const AdvancedDrivingSlides: React.FC<AdvancedDrivingSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === advancedSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? advancedSlides.length - 1 : prev - 1));
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

  // Advanced Driving Skills Slides content
  const advancedSlides: SlideProps[] = [
    {
      title: "Advanced Driving Skills",
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
              Advanced Driving Skills
            </motion.h1>
            <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Advanced Driving Skills at MyDrive Academy! At MyDrive Academy, we go beyond the basics to help you master 
              advanced driving techniques that are essential for safe, confident driving in Illinois. Our expert 
              instructors provide hands-on training in:
            </motion.p>
            <motion.ul className="text-left max-w-md mx-auto mt-4 space-y-2" variants={itemVariants}>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="text-emerald-500 mr-2">•</span>
                <span>Stick Shift Driving</span>
              </motion.li>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="text-emerald-500 mr-2">•</span>
                <span>Parallel Parking & Highway Driving</span>
              </motion.li>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="text-emerald-500 mr-2">•</span>
                <span>Winter Driving</span>
              </motion.li>
            </motion.ul>
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
              Whether you're looking to refine your skills or prepare for real-world driving challenges, our 
              advanced courses ensure you're equipped for the road ahead.
            </motion.p>
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
              Take your driving to the next level—learn to drive smarter, safer, and with total confidence. 
              Sign up today!
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={cardContainerVariants}
          >
            <motion.div variants={cardItemVariants}>
              <AdvancedSkillsCard 
                title="Stick Shift Lessons"
                subtitle="One-Day Program"
                description={[
                  "Drivers who want to learn manual transmission for personal or professional reasons.",
                  "Improves vehicle control, saves on maintenance costs, and opens up opportunities to drive a wider range of vehicles.",
                  "Available in 2 hours or 4 hours lesson"
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardItemVariants}>
              <AdvancedSkillsCard 
                title="Parallel Parking & Highway Driving"
                subtitle="2 hours Behind-the-Wheel"
                description={[
                  "City drivers, new or nervous drivers, and those needing help with parking or highway travel.",
                  "Boosts confidence, reduces stress, and ensures legal parking.",
                  "Covers merging, lane discipline, defensive driving, and speed control."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardItemVariants}>
              <AdvancedSkillsCard 
                title="Winter Driving"
                subtitle="2 hours Behind-the-Wheel"
                description={[
                  "Illinois drivers navigating snow, ice, slippery roads, and freezing conditions.",
                  "Improves control on icy surfaces, teaches safe braking and skid recovery, and enhances confidence in harsh weather."
                ]}
                icon={<Car />}
              />
            </motion.div>
          </motion.div>
          
          <motion.div className="text-center" variants={itemVariants}>
            <motion.p className="text-xl mb-2" variants={itemVariants}>Available in 2 hour and 4 hour options</motion.p>
            <motion.p className="text-gray-700 mb-4" variants={itemVariants}>
              ***Enrolling to these programs must already have a Driver's License. {' '}
              <motion.a 
                href="/adult-programs-best-sellers" 
                className="text-emerald-600 hover:underline"
                variants={linkVariants}
                whileHover="hover"
              >
                Click here if you need one!
              </motion.a>
            </motion.p>
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
      
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {advancedSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default AdvancedDrivingSlides;
