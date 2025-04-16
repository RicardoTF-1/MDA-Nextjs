// components/adult-program-slider/common/LocationDropdown.tsx
import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface LocationOption {
  label: string;
  value: string;
  href: string;
}

interface LocationDropdownProps {
  title?: string;
  subtitle?: string;
  locations?: LocationOption[];
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

const buttonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05, 
    backgroundColor: "#10b981",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { 
      duration: 0.2 
    } 
  },
  tap: { 
    scale: 0.95 
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
      duration: 0.3,
      ease: "easeOut"
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
 * Location dropdown component for selecting program locations
 * Can be used on program slides to select Chicago or Suburb locations
 */
const LocationDropdown: React.FC<LocationDropdownProps> = ({
  title = "Select your Location",
  subtitle = "DSS Page with Price",
  locations = [
    { label: "CHICAGO", value: "chicago", href: "/chicago" },
    { label: "SUBURB", value: "suburb", href: "/suburb" }
  ]
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
      className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-xl p-6 mb-8"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div 
        className="mb-4 md:mb-0 md:mr-8"
        variants={itemVariants}
      >
        <motion.div 
          className="font-bold text-lg mb-2"
          variants={itemVariants}
        >
          {title}
        </motion.div>
        <motion.div
          variants={arrowVariants}
          animate="bounce"
        >
          <ArrowDown size={24} className="mx-auto" />
        </motion.div>
        <motion.div 
          className="flex justify-center gap-4 mt-2"
          variants={itemVariants}
        >
          {locations.map((location) => (
            <motion.a 
              key={location.value}
              href={location.href} 
              className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {location.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      {subtitle && (
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="text-lg font-bold text-gray-700 mb-2"
            variants={itemVariants}
          >
            {subtitle}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LocationDropdown;