// components/adult-program-slider/common/TeenBottomSection.tsx
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { TeenBottomSectionProps } from '../types';

/**
 * Bottom link component for Teen Programs slides
 * Includes redirects, notes, and main links
 */
const TeenBottomSection: React.FC<TeenBottomSectionProps> = ({ 
  redirectText, 
  redirectLink,
  mainLinkText = "DSS Page For Teen Programs", 
  mainLink = "/teen-programs" 
}) => (
  <div className="text-center mt-8">
    <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700">
      <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
      <p className="mb-2">
        ***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours?{' '}
        <a href="/permit-prep" className="text-emerald-600 hover:underline">Click here!</a>
      </p>
      {redirectText && (
        <p className="text-red-500 flex items-center justify-end">
          <span>Redirected to {redirectText}</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-1"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </p>
      )}
    </div>
    
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mb-2">
        {mainLinkText === "Click Here for more Options!" ? (
          <span>{mainLinkText}</span>
        ) : (
          <span>See all Programs</span>
        )}
      </div>
      <ArrowDown size={32} className="mb-2" />
      <a href={mainLink} className="text-red-500 text-lg font-medium hover:underline">{mainLinkText}</a>
    </div>
  </div>
);

export default TeenBottomSection;