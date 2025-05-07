import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { SlideContainerProps } from '../types';
import SlideNavigation from './SlideNavigation';

// Animation variants
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const backgroundVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 0.3,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const SlideContainer: React.FC<SlideContainerProps> = ({
  slides,
  currentSlide,
  setCurrentSlide,
}) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = (): void => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = (): void => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Setup Intersection Observer
  useEffect(() => {
    const currentRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  // Reset animation on slide change
  useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start('visible');
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentSlide, controls]);

  return (
    <motion.div
      className="py-12 px-4 bg-white relative overflow-hidden"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"
        variants={backgroundVariants}
      ></motion.div>
      <motion.div
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"
        variants={backgroundVariants}
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
      <motion.div
        className="transition-all duration-500 ease-in-out"
        variants={contentVariants}
      >
        {slides[currentSlide].content}
      </motion.div>
    </motion.div>
  );
};

export default SlideContainer;

