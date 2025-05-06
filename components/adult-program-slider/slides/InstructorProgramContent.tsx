"use client";

import React, { useRef, useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface InstructorProgramContentProps {
  // Add props for API integration if needed
}

// Animation variants
const containerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
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
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3
    }
  }
};

const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -10 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05, 
    backgroundColor: "#10b981",
    transition: { 
      duration: 0.2 
    } 
  },
  tap: { 
    scale: 0.95 
  }
};

const linkVariants: Variants = {
  hover: { 
    color: "#10b981", 
    scale: 1.05,
    transition: { 
      duration: 0.2 
    } 
  }
};

const InstructorProgramContent: React.FC<InstructorProgramContentProps> = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

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
        // No need to start "hidden" animation when element leaves viewport
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

  return (
    <motion.div 
      className="max-w-6xl mx-auto px-4 py-12 h-[680px]"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div 
        className="text-center mb-8"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-4xl font-bold text-gray-900 mb-4"
          variants={itemVariants}
        >
          Instructor Training Program
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Become a certified driving instructor in Illinois and share your passion for safe driving!
        </motion.p>
        <motion.p 
          className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4"
          variants={itemVariants}
        >
          At My Drive Academy, our comprehensive Instructor Program equips you with the knowledge and skills 
          to educate and empower new drivers.
        </motion.p>
        <motion.p 
          className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4"
          variants={itemVariants}
        >
          Join us in shaping the next generation of responsible motorists and build a rewarding career.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="flex justify-center"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg max-w-lg w-full"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div 
            className="p-6 bg-gray-900 text-white text-center relative"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            ></motion.div>
            <motion.div 
              className="flex justify-center mb-3"
              variants={itemVariants}
              animate={{ 
                scale: [1, 1.1, 1],
                rotateZ: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.8,
                ease: "easeInOut"
              }}
            >
              <GraduationCap size={48} className="text-emerald-400" />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold mb-2"
              variants={itemVariants}
            >
              Instructor Certification Program
            </motion.h2>
            <motion.p 
              className="text-emerald-400 font-semibold"
              variants={itemVariants}
            >
              Comprehensive Training & Certification
            </motion.p>
          </motion.div>
          <motion.div 
            className="p-6"
            variants={itemVariants}
          >
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <motion.p 
                className="flex items-start mb-3"
                variants={listItemVariants}
              >
                <motion.span 
                  className="text-emerald-500 mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1,
                    ease: "easeInOut"
                  }}
                >
                  ✓
                </motion.span>
                <span className="text-gray-800">Learn effective teaching methodologies for new drivers</span>
              </motion.p>
              <motion.p 
                className="flex items-start mb-3"
                variants={listItemVariants}
              >
                <motion.span 
                  className="text-emerald-500 mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.1,
                    ease: "easeInOut"
                  }}
                >
                  ✓
                </motion.span>
                <span className="text-gray-800">Master advanced driving techniques to demonstrate to students</span>
              </motion.p>
              <motion.p 
                className="flex items-start mb-3"
                variants={listItemVariants}
              >
                <motion.span 
                  className="text-emerald-500 mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.2,
                    ease: "easeInOut"
                  }}
                >
                  ✓
                </motion.span>
                <span className="text-gray-800">Understand Illinois traffic laws and regulations in depth</span>
              </motion.p>
              <motion.p 
                className="flex items-start mb-3"
                variants={listItemVariants}
              >
                <motion.span 
                  className="text-emerald-500 mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.3,
                    ease: "easeInOut"
                  }}
                >
                  ✓
                </motion.span>
                <span className="text-gray-800">Gain practical experience with supervised teaching sessions</span>
              </motion.p>
            </motion.div>
            <motion.a 
              href="#register-now" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Register Now
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-8 text-center max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-4"
          variants={itemVariants}
        >
          Program Requirements
        </motion.h3>
        <motion.div 
          className="bg-gray-50 p-6 rounded-lg"
          variants={itemVariants}
        >
          <motion.ul 
            className="text-left space-y-2"
            variants={itemVariants}
          >
            <motion.li 
              className="flex items-start"
              variants={listItemVariants}
            >
              <span className="text-emerald-500 mr-2">•</span>
              <span>Valid Illinois driver's license for at least 2 years</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={listItemVariants}
            >
              <span className="text-emerald-500 mr-2">•</span>
              <span>Clean driving record (no major violations in the past 3 years)</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={listItemVariants}
            >
              <span className="text-emerald-500 mr-2">•</span>
              <span>High school diploma or equivalent</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={listItemVariants}
            >
              <span className="text-emerald-500 mr-2">•</span>
              <span>Pass a background check</span>
            </motion.li>
            <motion.li 
              className="flex items-start"
              variants={listItemVariants}
            >
              <span className="text-emerald-500 mr-2">•</span>
              <span>Complete all required coursework and examinations</span>
            </motion.li>
          </motion.ul>
        </motion.div>
        
        <motion.p 
          className="mt-6 text-gray-700"
          variants={itemVariants}
        >
          Start your journey as a driving instructor today! For more information or to schedule a consultation, 
          please contact our instructor training department at {' '}
          <motion.a 
            href="mailto:instructors@mydriveacademy.com" 
            className="text-emerald-600 hover:underline"
            variants={linkVariants}
            whileHover="hover"
          >
            instructors@mydriveacademy.com
          </motion.a>.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default InstructorProgramContent;
