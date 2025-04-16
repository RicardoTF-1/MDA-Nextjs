// components/adult-program-slider/cards/TeenProgramCard.tsx
import React, { useState, ReactElement } from 'react';
import { ChevronDown } from 'lucide-react';
import { TeenProgramCardProps } from '../types';

const TeenProgramCard: React.FC<TeenProgramCardProps> = ({ 
  title, 
  subtitle, 
  subtitleColor = "emerald-400", 
  bestSeller = false, 
  points, 
  buttonText = "Select your Location", 
  icon 
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative">
      {bestSeller && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 font-bold py-1 px-3 transform rotate-45 translate-x-6 -translate-y-1 text-xs z-10">
          BEST SELLER
        </div>
      )}
      <div className="p-6 bg-gray-900 text-white text-center relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        {icon && (
          <div className="flex justify-center mb-3">
            {React.cloneElement(icon as ReactElement, { size: 36, className: "text-emerald-400" })}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className={`text-${subtitleColor} font-semibold mb-3`}>{subtitle}</p>
      </div>
      <div className="p-6 flex-grow">
        <div className="mb-6">
          {points.map((point, index) => (
            <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
              <span className="text-emerald-500 mr-2">✓</span>
              <span className="text-gray-800" dangerouslySetInnerHTML={{ __html: point }}></span>
            </p>
          ))}
        </div>
        <div className="mt-auto relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            aria-expanded={showDropdown}
            aria-haspopup="true"
          >
            {buttonText}
            <ChevronDown className="ml-2" size={18} />
          </button>
          
          {showDropdown && (
            <div 
              className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 overflow-hidden"
              role="menu"
              aria-orientation="vertical"
            >
              <a 
                href="/chicago" 
                className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                role="menuitem"
              >
                CHICAGO
              </a>
              <a 
                href="/suburb" 
                className="block w-full px-4 py-3 text-center text-gray-800 hover:bg-emerald-500 hover:text-white transition-colors"
                role="menuitem"
              >
                SUBURB
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeenProgramCard;