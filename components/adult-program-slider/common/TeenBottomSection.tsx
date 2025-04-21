// components/adult-program-slider/common/TeenBottomSection.tsx
import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { TeenBottomSectionProps } from '../types';

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
    y: 15 
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

const notesContainerVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 10,
    scale: 0.98
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const linkVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 5 
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
    color: "#10b981",
    transition: {
      duration: 0.2
    }
  }
};

const redirectVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 10 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.8,
      ease: "easeOut"
    }
  }
};

const arrowVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -5 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  bounce: {
    y: [0, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

/**
 * Bottom link component for Teen Programs slides
 * Includes redirects, notes, and main links
 */
const TeenBottomSection: React.FC<TeenBottomSectionProps> = ({ 
  redirectText, 
  redirectLink,
  mainLinkText = "DSS Page For Teen Programs", 
  mainLink = "/teen-programs" 
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
      className="text-center mt-8"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700"
        variants={notesContainerVariants}
      >
        <motion.p 
          className="mb-2"
          variants={itemVariants}
        >
          ***All packages include the use our modern, comfortable vehicle for your test.
        </motion.p>
        <motion.p 
          className="mb-2"
          variants={itemVariants}
        >
          ***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours?{' '}
          <motion.a 
            href="/permit-prep" 
            className="text-emerald-600 hover:underline"
            variants={linkVariants}
            whileHover="hover"
          >
            Click here!
          </motion.a>
        </motion.p>
        {redirectText && (
          <motion.p 
            className="text-red-500 flex items-center justify-end"
            variants={redirectVariants}
          >
            <span>Redirected to {redirectText}</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-1"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </motion.p>
        )}
      </motion.div>
      
      <motion.div 
        className="flex flex-col items-center"
        variants={itemVariants}
      >
        <motion.div 
          className="text-xl font-bold mb-2"
          variants={itemVariants}
        >
          {mainLinkText === "Click Here for more Options!" ? (
            <span>{mainLinkText}</span>
          ) : (
            <span>See all Programs</span>
          )}
        </motion.div>
        <motion.div
          variants={arrowVariants}
          animate="bounce"
        >
          <ArrowDown size={32} className="mb-2" />
        </motion.div>
        <motion.a 
          href={mainLink} 
          className="text-red-500 text-lg font-medium hover:underline"
          variants={linkVariants}
          whileHover="hover"
        >
          {mainLinkText}
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default TeenBottomSection;