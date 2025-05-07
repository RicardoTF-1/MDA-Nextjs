import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

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

const checkmarkVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    color: "#10b981" // emerald-500
  },
  visible: {
    opacity: 1,
    scale: 1,
    color: "#10b981",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    color: "#059669" // emerald-600
  },
  visible: {
    opacity: 1,
    color: "#059669",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    color: "#047857", // emerald-700
    transition: {
      duration: 0.2
    }
  }
};

const FooterNotes: React.FC = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animation triggers
  useEffect(() => {
    const currentRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
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
      className="text-sm text-gray-600 max-w-4xl mx-auto bg-gray-50 p-4 rounded-lg"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.p className="mb-2" variants={itemVariants}>
        <motion.span className="text-emerald-500" variants={checkmarkVariants}>
          ✓
        </motion.span>{' '}
        All packages include the use of our modern, comfortable vehicle for your road test.
      </motion.p>

      <motion.p className="mb-2" variants={itemVariants}>
        <motion.span className="text-emerald-500" variants={checkmarkVariants}>
          ✓
        </motion.span>{' '}
        For Road Test, students must meet the instructor at the designated DMV location.
      </motion.p>

      <motion.p variants={itemVariants}>
        <motion.span className="text-emerald-500" variants={checkmarkVariants}>
          ✓
        </motion.span>{' '}
        A valid Learner&apos;s Permit is required to enroll in any of these packages.{' '}
        <motion.a
          href="/permit-prep"
          className="text-emerald-600 hover:underline font-medium"
          variants={linkVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          Get permit help here!
        </motion.a>
      </motion.p>
    </motion.div>
  );
};

export default FooterNotes;

