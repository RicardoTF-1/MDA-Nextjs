// components/adult-program-slider/cards/PermitPrepCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { PermitPrepCardProps } from '../types';
import { 
  useAnimatedCard, 
  cardVariants, 
  headerVariants, 
  pointsVariants, 
  pointVariants, 
  buttonVariants,
  dropdownVariants
} from '../../../hooks/useAnimatedCardProps';

const PermitPrepCard: React.FC<PermitPrepCardProps> = ({ 
  title, 
  subtitle, 
  quote, 
  points, 
  buttonText = "Register Now", 
  icon,
  threshold,
  triggerOnce
}) => {
  const { ref, controls } = useAnimatedCard({
    threshold,
    triggerOnce
  });
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const hasLocationDropdown = buttonText.toLowerCase().includes("location");
  
  // Handle rendering the icon correctly
  const renderIcon = () => {
    if (!icon) return null;
    
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { 
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
        {subtitle && (
          <p className="text-emerald-400 font-semibold mb-3">{subtitle}</p>
        )}
        {quote && (
          <p className="text-emerald-400 italic text-sm mb-3">{quote}</p>
        )}
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
        <div className="mt-auto relative">
          <motion.button 
            onClick={() => hasLocationDropdown && setShowDropdown(!showDropdown)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            aria-expanded={hasLocationDropdown ? showDropdown : undefined}
            aria-haspopup={hasLocationDropdown ? "true" : undefined}
          >
            {buttonText}
            {hasLocationDropdown && <ChevronDown className="ml-2" size={18} />}
          </motion.button>
          
          <AnimatePresence>
            {hasLocationDropdown && showDropdown && (
              <motion.div 
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                role="menu"
                aria-orientation="vertical"
              >
                <motion.a 
                  href="/chicago" 
                  whileHover={{ backgroundColor: '#10b981', color: 'white' }}
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                  role="menuitem"
                >
                  CHICAGO
                </motion.a>
                <motion.a 
                  href="/suburb" 
                  whileHover={{ backgroundColor: '#10b981', color: 'white' }}
                  className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                  role="menuitem"
                >
                  SUBURB
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PermitPrepCard;