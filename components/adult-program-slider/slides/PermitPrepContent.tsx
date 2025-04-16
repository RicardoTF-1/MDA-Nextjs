"use client";

import React from 'react';
import { BookOpen, Car } from 'lucide-react';
import PermitPrepCard from '../cards/PermitPrepCard';

interface PermitPrepContentProps {
  // Add props for API integration if needed
}

const PermitPrepContent: React.FC<PermitPrepContentProps> = () => {
  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-black mb-10">Permit Prep</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Expert Driver Package */}
          <PermitPrepCard 
            title="Expert Driver Package"
            subtitle="Permit Prep + 2 Hours Behind-the-Wheel + Road Test"
            points={[
              "Designed for individuals who are non-U.S. citizens, non-permanent residents, and do not have a Social Security Number.",
              "This package includes permit exam preparation, state-mandated behind-the-wheel instruction, and a streamlined path to obtaining a valid Illinois driver's license.",
              "Available in English or Spanish"
            ]}
            buttonText="Select your Location"
            icon={<BookOpen />}
          />

          {/* Permit Preparation */}
          <PermitPrepCard 
            title="Permit Preparation"
            quote="Pass your written test with ease—prepare, practice, succeed."
            points={[
              "Designed to help you master the rules of the road and pass your permit exam with confidence.",
              "Expert guidance on Illinois traffic laws and road signs",
              "Flexible Learning Options: In-person, or Online",
              "Available in English or Spanish"
            ]}
            buttonText="Select your Location"
            icon={<BookOpen />}
          />

          {/* Adult Driver's Education */}
          <PermitPrepCard 
            title="Adult Driver's Education"
            quote="Your road to a license starts here—learn the rules, drive with confidence."
            points={[
              "For adults (18-20) required to complete Driver's Education before getting a license.",
              "This course covers Illinois traffic laws, safe driving techniques, and road sign recognition to prepare you for responsible driving.",
              "Flexible learning: In-person or Online",
              "Available in English or Spanish"
            ]}
            buttonText="Select your Location"
            icon={<BookOpen />}
          />
        </div>

        <div className="flex justify-between items-start mt-14">
          <div className="text-sm text-gray-700 max-w-3xl">
            <p className="mb-2">***All packages include the use our modern, comfortable vehicle for your test.</p>
            <p>***For Road Test, students must meet the instructor at the designated DMV location.</p>
          </div>
          
          <div className="text-right">
            <p className="text-xl font-bold mb-2">See All Programs</p>
            <div className="flex justify-end">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mb-2">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="black"/>
              </svg>
            </div>
            <a href="/adult-programs" className="text-gray-800 text-lg font-medium hover:underline">Adult Programs</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermitPrepContent;