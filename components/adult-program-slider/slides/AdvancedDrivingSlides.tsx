"use client";

import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { SlideProps } from '../types';
import AdvancedSkillsCard from '../cards/AdvancedSkillsCard';
import SlideNavigation from '../common/SlideNavigation';

interface AdvancedDrivingSlidesProps {
  // Add props for API integration if needed
}

const AdvancedDrivingSlides: React.FC<AdvancedDrivingSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === advancedSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? advancedSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Advanced Driving Skills Slides content
  const advancedSlides: SlideProps[] = [
    {
      title: "Advanced Driving Skills",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Advanced Driving Skills</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Advanced Driving Skills at MyDrive Academy! At MyDrive Academy, we go beyond the basics to help you master 
              advanced driving techniques that are essential for safe, confident driving in Illinois. Our expert 
              instructors provide hands-on training in:
            </p>
            <ul className="text-left max-w-md mx-auto mt-4 space-y-2">
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Stick Shift Driving</span>
              </li>
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Parallel Parking & Highway Driving</span>
              </li>
              <li className="flex items-center">
                <span className="text-emerald-500 mr-2">•</span>
                <span>Winter Driving</span>
              </li>
            </ul>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Whether you're looking to refine your skills or prepare for real-world driving challenges, our 
              advanced courses ensure you're equipped for the road ahead.
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Take your driving to the next level—learn to drive smarter, safer, and with total confidence. 
              Sign up today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <AdvancedSkillsCard 
              title="Stick Shift Lessons"
              subtitle="One-Day Program"
              description={[
                "Drivers who want to learn manual transmission for personal or professional reasons.",
                "Improves vehicle control, saves on maintenance costs, and opens up opportunities to drive a wider range of vehicles.",
                "Available in 2 hours or 4 hours lesson"
              ]}
              icon={<Car />}
            />
            
            <AdvancedSkillsCard 
              title="Parallel Parking & Highway Driving"
              subtitle="2 hours Behind-the-Wheel"
              description={[
                "City drivers, new or nervous drivers, and those needing help with parking or highway travel.",
                "Boosts confidence, reduces stress, and ensures legal parking.",
                "Covers merging, lane discipline, defensive driving, and speed control."
              ]}
              icon={<Car />}
            />
            
            <AdvancedSkillsCard 
              title="Winter Driving"
              subtitle="2 hours Behind-the-Wheel"
              description={[
                "Illinois drivers navigating snow, ice, slippery roads, and freezing conditions.",
                "Improves control on icy surfaces, teaches safe braking and skid recovery, and enhances confidence in harsh weather."
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="text-center">
            <p className="text-xl mb-2">DSS Page Price for 2hrs and 4 hrs</p>
            <p className="text-gray-700 mb-4">***Enrolling to these programs must already have a Driver's License. <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">Click here if you need one!</a></p>
            <p className="text-red-500">Redirected to Adult Programs Best Sellers</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Slide navigation */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={advancedSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {advancedSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default AdvancedDrivingSlides;