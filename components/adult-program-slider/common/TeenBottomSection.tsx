import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { TeenBottomSectionProps } from '../types';

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
    y: 15,
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

const notesContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    color: '#10b981',
    transition: {
      duration: 0.2,
    },
  },
};

const TeenBottomSection: React.FC<TeenBottomSectionProps> = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <motion.div
      className="text-center mt-8"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-4 text-sm text-gray-700"
        variants={notesContainerVariants}
      >
        <motion.p className="mb-2" variants={itemVariants}>
          ***All packages include the use of our modern, comfortable vehicle for your test.
        </motion.p>
        <motion.p variants={itemVariants}>
          ***A valid Learner&apos;s Permit is required to enroll in any of these packages. Need help obtaining yours?{' '}
          <motion.a
            href="/permit-prep"
            className="text-emerald-600 hover:underline"
            variants={linkVariants}
            whileHover="hover"
          >
            Click here!
          </motion.a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default TeenBottomSection;

