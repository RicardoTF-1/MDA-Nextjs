// components/adult-program-slider/common/BottomLink.tsx
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { BottomLinkProps } from '../types';

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
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const linkVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 5,
    color: "#059669" // Emerald-600
  },
  visible: { 
    opacity: 1, 
    y: 0,
    color: "#059669",
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    color: "#047857", // Emerald-700
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Bottom link component shared between Best Sellers and More Programs slides
 * Displays a link to view all programs with appropriate styling
 */
const BottomLink: React.FC<BottomLinkProps> = ({ 
  viewAllLink, 
  linkText 
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
    <motion.div 
      className="text-center mb-8 bg-gray-50 rounded-xl p-6 shadow-sm"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div 
        className="text-lg font-bold text-gray-700 mb-4"
        variants={itemVariants}
      >
        DSS Page with Price
      </motion.div>
      <motion.a 
        href={viewAllLink} 
        className="text-emerald-600 hover:text-emerald-700 font-medium underline"
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