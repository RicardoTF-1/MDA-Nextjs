"use client";

import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { SlideProps } from '../types';
import DefensiveProgramCard from '../cards/DefensiveProgramCard';
import SlideNavigation from '../common/SlideNavigation';

interface DefensiveDrivingSlidesProps {
  // Add props for API integration if needed
}

const DefensiveDrivingSlides: React.FC<DefensiveDrivingSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === defensiveSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? defensiveSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Defensive Driving Slides content
  const defensiveSlides: SlideProps[] = [
    {
      title: "Defensive Driving Courses",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Defensive Driving Courses</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              NSC-Approved Remedial & Defensive Driving Courses
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              At MyDrive Academy, our National Safety Council (NSC)-approved programs—Remedial Driving Course, 
              Defensive Driving Course (DDC), and Alive at 25—are designed to help drivers meet legal requirements, 
              reduce violations, and develop better road awareness. Whether you need to reinstate your license, 
              dismiss a ticket, lower insurance rates, or enhance safe driving skills, we offer the education and 
              training necessary to become a more responsible driver.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <DefensiveProgramCard 
              title="Remedial Course"
              subtitle="License Reinstatement"
              price="100"
              points={[
                "In this 4-hour class, drivers with a suspended license due to traffic violations or court orders.",
                "Improve Your Driving, Reduce Risks, and Meet Legal Requirements."
              ]}
              icon={<Shield />}
            />
            
            <DefensiveProgramCard 
              title="Defensive Driving Course"
              subtitle="Dismiss Tickets, Lower Insurance, Drive Safe"
              price="95"
              points={[
                "In this 4-hour class, the Defensive Driving Course may qualify you for up to 10% discounts on car insurance, as well as workers' compensation discounts for companies with fleet vehicles.",
                "Prevent fines or points, improve driving skills, and qualify for insurance discounts."
              ]}
              icon={<Shield />}
            />
            
            <DefensiveProgramCard 
              title="Alive at 25"
              subtitle="Smart Choices for Young Drivers"
              price="45"
              points={[
                "For drivers aged 15-24 cited for traffic violations or required by courts, schools, or employers.",
                "The Alive at 25 may qualify you for up to 10% discounts on car insurance, as well as workers' compensation discounts for companies with fleet vehicles."
              ]}
              icon={<Shield />}
            />
          </div>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-center space-x-4 mb-4">
              <a 
                href="#select-location" 
                className="bg-emerald-500 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
              >
                Select Location
              </a>
              <div className="flex items-center text-gray-700">
                <span className="mr-2">→</span>
                <span>Schedule</span>
                <span className="mx-2">→</span>
                <span>Registration</span>
              </div>
            </div>
            
            <div className="text-center mt-8 text-gray-600">
              <p className="mb-2">***Looking for driving with professional instructors? <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">Click here!</a></p>
              <p className="text-red-500">Redirected to Adult Programs Best Sellers</p>
            </div>
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
        totalSlides={defensiveSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {defensiveSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default DefensiveDrivingSlides;