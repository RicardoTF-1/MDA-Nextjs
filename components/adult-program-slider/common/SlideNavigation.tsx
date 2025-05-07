import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

// Updated variant definitions with proper typing
const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 0, // Default value
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

// Define a separate function for computing x offset
const getXOffset = (index: number): number => {
  return index === 0 ? -20 : 20;
};

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onSelect,
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
            onClick={() => onSelect(index)}
            variants={buttonVariants}
            // Apply the x offset using custom prop instead of in the variants
            initial={{ 
              opacity: 0, 
              x: getXOffset(index)
            }}
            animate={{ 
              opacity: 1, 
              x: 0 
            }}
            whileHover="hover"
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <div className="flex space-x-4">
        <motion.button
          onClick={onPrevious}
          className="p-2 bg-gray-100 hover:bg-emerald-100 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </motion.button>
        <motion.button
          onClick={onNext}
          className="p-2 bg-gray-100 hover:bg-emerald-100 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} className="text-gray-700" />
        </motion.button>
      </div>
    </div>
  );
};

export default SlideNavigation;


