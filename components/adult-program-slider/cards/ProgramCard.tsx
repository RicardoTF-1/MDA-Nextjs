// components/adult-program-slider/cards/ProgramCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ProgramCardProps } from '../types';
import { 
  useAnimatedCard, 
  cardVariants, 
  headerVariants, 
  buttonVariants 
} from '../../../hooks/useAnimatedCardProps';

// Define a proper interface for icon elements
interface IconElementProps {
  className?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ 
  title, 
  subtitle, 
  description,
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
    
    // It's a LucideIcon component
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
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
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
        <p className="text-emerald-400 font-semibold">{subtitle}</p>
      </motion.div>
      <div className="p-6 flex-grow">
        {description && (
          <div className="mb-6">
            <p className="text-gray-800">{description}</p>
          </div>
        )}
        <div className="mt-auto">
          <motion.a 
            href="#register" 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
          >
            Register Now
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
