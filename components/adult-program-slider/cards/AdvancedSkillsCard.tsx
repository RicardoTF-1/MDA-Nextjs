// components/adult-program-slider/cards/AdvancedSkillsCard.tsx
import React, { ReactElement } from 'react';
import { AdvancedSkillsCardProps } from '../types';

const AdvancedSkillsCard: React.FC<AdvancedSkillsCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  buttonText = "Register Now", 
  icon 
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="p-6 bg-gray-900 text-white text-center relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
        {icon && (
          <div className="flex justify-center mb-3">
            {React.cloneElement(icon as ReactElement, { size: 36, className: "text-emerald-400" })}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-emerald-400 font-semibold">{subtitle}</p>
      </div>
      <div className="p-6 flex-grow">
        <div className="mb-6">
          {Array.isArray(description) ? (
            description.map((item, index) => (
              <p key={index} className={`flex items-start ${index > 0 ? 'mt-4' : ''} mb-3`}>
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">{item}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-800 mt-2">{description}</p>
          )}
        </div>
        <div className="mt-auto">
          <a 
            href="#register" 
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSkillsCard;