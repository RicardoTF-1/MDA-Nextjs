// components/adult-program-slider/common/SlideNavigation.tsx
import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideNavigationProps } from '../types';

// Animation variants
const buttonVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: (index: number) => index === 0 ? -20 : 20 // Left button goes left, right button goes right
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    backgroundColor: "#10b981",
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.9
  }
};

const indicatorContainerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delayChildren: 0.2,
      staggerChildren: 0.05
    }
  }
};

const indicatorVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  active: {
    width: "2rem",
    backgroundColor: "#10b981",
    transition: {
      duration: 0.3
    }
  },
  inactive: {
    width: "0.75rem",
    backgroundColor: "#d1d5db",
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.2,
    backgroundColor: "#9ca3af"
  }
};

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onSelect
}) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
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

  return (
    <div ref={containerRef}>
      {/* Previous button */}
      <motion.div 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        custom={0}
        initial="hidden"
        animate={controls}
        variants={buttonVariants}
      >
        <motion.button 
          onClick={onPrevious}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <ChevronLeft size={28} />
        </motion.button>
      </motion.div>
      
      {/* Next button */}
      <motion.div 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
        custom={1}
        initial="hidden"
        animate={controls}
        variants={buttonVariants}
      >
        <motion.button 
          onClick={onNext}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <ChevronRight size={28} />
        </motion.button>
      </motion.div>
      
      {/* Slide indicators */}
      <motion.div 
        className="flex justify-center mt-8 space-x-3"
        initial="hidden"
        animate={controls}
        variants={indicatorContainerVariants}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
            variants={indicatorVariants}
            animate={index === currentSlide ? "active" : "inactive"}
            whileHover="hover"
            initial={{
              width: index === currentSlide ? "2rem" : "0.75rem",
              backgroundColor: index === currentSlide ? "#10b981" : "#d1d5db"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SlideNavigation;