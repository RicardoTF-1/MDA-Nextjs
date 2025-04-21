"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Car } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideProps } from '../types';
import ClassCProgramCard from '../cards/ClassCProgramCard';
import SlideNavigation from '../common/SlideNavigation';
import LocationDropdown from '../common/LocationDropdown';

interface ClassCProgramSlidesProps {
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
      delayChildren: 0.3,
      staggerChildren: 0.15
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
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const logoVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};

const ClassCProgramSlides: React.FC<ClassCProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [observerInitialized, setObserverInitialized] = useState(false);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === classCSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? classCSlides.length - 1 : prev - 1));
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

  // Class C Programs Slides content
  const classCSlides: SlideProps[] = [
    {
      title: "Class C Programs",
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
              Class C Programs
            </motion.h1>
            <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
              Kickstart your career with MyDrive Academy's specialized Class C programs! In Illinois, a Class C license 
              is required for drivers who operate vehicles that transport 15 passengers (including the driver) with a gross 
              vehicle weight rating (GVWR) of less than 26,001 pounds. This license is essential for a wide range of passenger 
              or transport roles, including taxicabs, shuttle buses, and noncommercial vehicles. This expands your opportunities 
              to drive commercial vehicles for large enterprises like:
            </motion.p>
            
            <motion.div 
              className="flex justify-center items-center space-x-8 mt-8"
              variants={containerVariants}
            >
              <motion.img 
                src="/api/placeholder/120/60" 
                alt="Amazon Logistics" 
                variants={logoVariants}
              />
              <motion.img 
                src="/api/placeholder/80/60" 
                alt="UPS" 
                variants={logoVariants}
              />
              <motion.img 
                src="/api/placeholder/80/60" 
                alt="Postmates" 
                variants={logoVariants}
              />
              <motion.img 
                src="/api/placeholder/120/60" 
                alt="DoorDash" 
                variants={logoVariants}
              />
              <motion.img 
                src="/api/placeholder/80/60" 
                alt="Uber" 
                variants={logoVariants}
              />
              <motion.img 
                src="/api/placeholder/120/60" 
                alt="FedEx" 
                variants={logoVariants}
              />
            </motion.div>
            
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-8" variants={itemVariants}>
              Additionally, If you plan to transport passengers for hire, you will need to obtain a Passenger Endorsement. 
              This endorsement requires an additional exam and ensures that you meet all necessary safety and regulatory 
              standards for passenger transport.
            </motion.p>
            
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
              Our expert instructors are dedicated to providing the training and support you need to pass your exams and 
              hit the road as a confident, professional driver. With hands-on training and comprehensive instruction, we 
              ensure you're fully prepared to meet Illinois state requirements and succeed in your new career.
            </motion.p>
            
            <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
              Discover the Gateway to Exciting Careers! License C type training can open the door to great employment 
              opportunities! Start your journey to obtaining a Class C License today at MyDrive Academy!
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
            variants={cardsContainerVariants}
          >
            <motion.div variants={cardVariants}>
              <ClassCProgramCard 
                title="Written Exam Prep for License C"
                subtitle=""
                price={130}
                points={[
                  "A comprehensive preparation for the Illinois Class C CDL written exams",
                  "Provides thorough understanding of CDL regulations, and a solid foundation for safe commercial driving."
                ]}
                icon={<BookOpen />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <ClassCProgramCard 
                title="2 Hr Behind the Wheel + Road Test"
                subtitle=""
                price={410}
                bestSeller={true}
                points={[
                  "Ideal for drivers with some experience who need a quick refresher before the test.",
                  "2 hours of behind-the-wheel training with an instructor.",
                  "Hands-on practice, expert guidance on road test maneuvers, and increased confidence in passing the skills assessment."
                ]}
                icon={<Car />}
              />
            </motion.div>
            
            <motion.div variants={cardVariants}>
              <ClassCProgramCard 
                title="1 Hr Behind the Wheel + Written Exam Prep + Road Test"
                subtitle=""
                price={460}
                bestSeller={true}
                points={[
                  "Ideal for those seeking a fast, comprehensive Class C CDL prep",
                  "1-hour personalized driving session with an instructor.",
                  "Efficiently covers both written and practical aspects of the CDL and provides a well-rounded learning experience."
                ]}
                icon={<Car />}
              />
            </motion.div>
          </motion.div>
          
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <LocationDropdown 
                title="Select your Location"
                subtitle="DSS Page with Price"
                locations={[
                  { label: "CHICAGO", value: "chicago", href: "/chicago" },
                  { label: "SUBURB", value: "suburb", href: "/suburb" }
                ]}
              />
            </motion.div>
            
            <motion.p className="text-sm text-gray-700 max-w-4xl mx-auto mt-6" variants={itemVariants}>
              ***Use our vehicles for your road test at the Secretary of State facility
            </motion.p>
            <motion.p className="text-sm text-gray-700 max-w-4xl mx-auto mt-2" variants={itemVariants}>
              ***Student enrolling in any of these packages MUST possess a valid, non-CDL Illinois driver's license. Need one?
              <motion.span 
                className="text-red-500 ml-2"
                animate={{ opacity: [0, 1], x: [10, 0] }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Redirected to Adult Programs Best Sellers
              </motion.span>
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
        totalSlides={classCSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {classCSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default ClassCProgramSlides;