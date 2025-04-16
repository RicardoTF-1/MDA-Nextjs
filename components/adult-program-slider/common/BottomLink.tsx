// components/adult-program-slider/common/BottomLink.tsx
import React from 'react';
import { BottomLinkProps } from '../types';

/**
 * Bottom link component shared between Best Sellers and More Programs slides
 * Displays a link to view all programs with appropriate styling
 */
const BottomLink: React.FC<BottomLinkProps> = ({ 
  viewAllLink, 
  linkText 
}) => (
  <div className="text-center mb-8 bg-gray-50 rounded-xl p-6 shadow-sm">
    <div className="text-lg font-bold text-gray-700 mb-4">DSS Page with Price</div>
    <a 
      href={viewAllLink} 
      className="text-emerald-600 hover:text-emerald-700 font-medium underline"
    >
      {linkText}
    </a>
  </div>
);

export default BottomLink;