// components/adult-program-slider/cards/ClassCProgramCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ClassCProgramCardProps } from '../types';
import { 
  useAnimatedCard, 
  cardVariants, 
  headerVariants, 
  pointsVariants, 
  pointVariants, 
  buttonVariants,
  bestSellerVariants
} from '../../../hooks/useAnimatedCardProps';

// Define a proper interface for icon elements
interface IconElementProps {
  className?: string;
}

const ClassCProgramCard: React.FC<ClassCProgramCardProps> = ({ 
  title, 
  subtitle, 
  price, 
  points, 
  bestSeller = false, 
  icon,
  threshold,
  triggerOnce
}) => {
  const { ref, controls } = useAnimatedCard({
    threshold,
    triggerOnce
  });

  // Handle rendering the icon correctly
  const renderIcon = () => {
    if (!icon) return null;
    
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<IconElementProps>, { 
        className: "text-emerald-400"
      });
    }
    
    // It's a LucideIcon component (not an element)
    const IconComponent = icon as LucideIcon;
    return <IconComponent size={36} className="text-emerald-400" />;
  };

  return (
    <motion.div 
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      exit="exit"
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative"
    >
      {bestSeller && (
        <motion.div 
          variants={bestSellerVariants}
          className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold py-1 px-3 rounded-full text-xs z-10"
        >
          BEST SELLER
        </motion.div>
      )}
      <motion.div 
        variants={headerVariants}
        className="p-6 bg-gray-900 text-white text-center relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        {icon && (
          <div className="flex justify-center mb-3">
            {renderIcon()}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-emerald-400 font-semibold">{subtitle}</p>}
      </motion.div>
      <div className="p-6 flex-grow">
        <motion.div 
          variants={pointsVariants}
          className="mb-6"
        >
          {points.map((point, index) => (
            <motion.p 
              key={index} 
              variants={pointVariants}
              custom={index}
              className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}
            >
              <span className="text-emerald-500 mr-2">✓</span>
              <span className="text-gray-800">{point}</span>
            </motion.p>
          ))}
        </motion.div>
        {price && (
          <motion.div 
            variants={buttonVariants}
            className="text-center my-4"
          >
            <span className="text-3xl font-bold text-gray-900">${price}</span>
          </motion.div>
        )}
        <div className="mt-auto">
          <motion.a 
            href="#select-location" 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
          >
            Select Your Location
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassCProgramCard;


