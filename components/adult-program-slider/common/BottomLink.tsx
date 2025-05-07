import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { BottomLinkProps } from '../types';

// Animation variants
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
    color: '#059669', // Emerald-600
  },
  visible: {
    opacity: 1,
    y: 0,
    color: '#059669',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    color: '#047857', // Emerald-700
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Bottom link component shared between Best Sellers and More Programs slides
 * Displays a link to view all programs with appropriate styling
 */
const BottomLink: React.FC<BottomLinkProps> = ({ viewAllLink, linkText }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Set component as mounted
  useEffect(() => {
    setIsMounted(true);
    controls.set('hidden');

    return () => {
      setIsMounted(false);
    };
  }, [controls]);

  // Setup Intersection Observer for scroll-based animations
  useEffect(() => {
    const currentRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
  }, []);

  // Handle animation controls in a separate effect
  useEffect(() => {
    if (isMounted) {
      if (isVisible) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }
  }, [isVisible, controls, isMounted]);

  return (
    <motion.div
      className="text-center mb-4 sm:mb-6 bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm"
      ref={containerRef}
      variants={containerVariants}
      animate={controls}
      initial="hidden"
    >
      <motion.div
        className="text-base sm:text-lg font-bold text-gray-700 mb-2 sm:mb-4"
        variants={itemVariants}
      >
        DSS Page with Price
      </motion.div>
      <motion.a
        href={viewAllLink}
        className="text-emerald-600 hover:text-emerald-700 font-medium underline text-sm sm:text-base"
        variants={linkVariants}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
      >
        {linkText}
      </motion.a>
    </motion.div>
  );
};

export default BottomLink;

