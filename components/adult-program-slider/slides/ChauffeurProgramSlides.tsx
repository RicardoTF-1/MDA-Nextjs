"use client";

import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { SlideProps } from '../types';
import ChauffeurProgramCard from '../cards/ChauffeurProgramCard';
import SlideNavigation from '../common/SlideNavigation';

interface ChauffeurProgramSlidesProps {
  // Add props for API integration if needed
}

const ChauffeurProgramSlides: React.FC<ChauffeurProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === chauffeurSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? chauffeurSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Chauffeur Training Programs Slides content
  const chauffeurSlides: SlideProps[] = [
    {
      title: "Chauffeur Training Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Chauffeur Training Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Chauffeur Training at MyDrive Academy! At MyDrive Academy, we equip you with the knowledge and skills to 
              take charge of your career in the chauffeur industry. Whether you're pursuing a career as a limousine 
              chauffeur or taxicab driver, our programs cover everything you need—from rules and regulations to customer 
              service and city navigation.
            </p>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Our courses are approved by the BACP (Business Affairs and Consumer Protection) of the City of Chicago, 
              ensuring you receive the most up-to-date and relevant training.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <ChauffeurProgramCard 
              title="Become a Licensed Livery (Restricted) Chauffeur"
              subtitle="One-Day Program"
              price="120"
              points={[
                "For professional drivers in luxury transport services",
                "This license allows the licensee to drive limousines and Uber Black",
                "Covers customer service, safe driving techniques, navigation skills, and professional etiquette, providing you with the expertise to excel in private car, limo, and executive transportation services."
              ]}
              icon={<Car />}
            />
            
            <ChauffeurProgramCard 
              title="Become a Licensed Taxi Chauffeur"
              subtitle="Four-Day Program"
              price="250"
              points={[
                "This license allows the licensee to drive taxicabs, limousines, and Uber Black",
                "For Professional Taxi and Rideshare Drivers Our Licensed Taxi Chauffeur Training focuses on city navigation, passenger safety, traffic laws, and efficient route planning to ensure you deliver reliable, professional service.",
                "This course prepares you for a successful career in taxi or rideshare driving, meeting all regulatory requirements while equipping you with the skills to navigate busy city streets with confidence."
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-4">***Looking for driving with professional instructors? <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">Click here!</a></p>
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
        totalSlides={chauffeurSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {chauffeurSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default ChauffeurProgramSlides;