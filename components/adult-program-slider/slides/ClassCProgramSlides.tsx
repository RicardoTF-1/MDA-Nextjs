"use client";

import React, { useState } from 'react';
import { BookOpen, Car } from 'lucide-react';
import { SlideProps } from '../types';
import ClassCProgramCard from '../cards/ClassCProgramCard';
import SlideNavigation from '../common/SlideNavigation';
import LocationDropdown from '../common/LocationDropdown';

interface ClassCProgramSlidesProps {
  // Add props for API integration if needed
}

const ClassCProgramSlides: React.FC<ClassCProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === classCSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? classCSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Class C Programs Slides content
  const classCSlides: SlideProps[] = [
    {
      title: "Class C Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Class C Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Kickstart your career with MyDrive Academy's specialized Class C programs! In Illinois, a Class C license 
              is required for drivers who operate vehicles that transport 15 passengers (including the driver) with a gross 
              vehicle weight rating (GVWR) of less than 26,001 pounds. This license is essential for a wide range of passenger 
              or transport roles, including taxicabs, shuttle buses, and noncommercial vehicles. This expands your opportunities 
              to drive commercial vehicles for large enterprises like:
            </p>
            
            <div className="flex justify-center items-center space-x-8 mt-8">
              <img src="/api/placeholder/120/60" alt="Amazon Logistics" />
              <img src="/api/placeholder/80/60" alt="UPS" />
              <img src="/api/placeholder/80/60" alt="Postmates" />
              <img src="/api/placeholder/120/60" alt="DoorDash" />
              <img src="/api/placeholder/80/60" alt="Uber" />
              <img src="/api/placeholder/120/60" alt="FedEx" />
            </div>
            
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-8">
              Additionally, If you plan to transport passengers for hire, you will need to obtain a Passenger Endorsement. 
              This endorsement requires an additional exam and ensures that you meet all necessary safety and regulatory 
              standards for passenger transport.
            </p>
            
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Our expert instructors are dedicated to providing the training and support you need to pass your exams and 
              hit the road as a confident, professional driver. With hands-on training and comprehensive instruction, we 
              ensure you're fully prepared to meet Illinois state requirements and succeed in your new career.
            </p>
            
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              Discover the Gateway to Exciting Careers! License C type training can open the door to great employment 
              opportunities! Start your journey to obtaining a Class C License today at MyDrive Academy!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <ClassCProgramCard 
              title="Written Exam Prep for License C"
              subtitle=""
              price="130"
              points={[
                "A comprehensive preparation for the Illinois Class C CDL written exams",
                "Provides thorough understanding of CDL regulations, and a solid foundation for safe commercial driving."
              ]}
              icon={<BookOpen />}
            />
            
            <ClassCProgramCard 
              title="2 Hr Behind the Wheel + Road Test"
              subtitle=""
              price="410"
              bestSeller={true}
              points={[
                "Ideal for drivers with some experience who need a quick refresher before the test.",
                "2 hours of behind-the-wheel training with an instructor.",
                "Hands-on practice, expert guidance on road test maneuvers, and increased confidence in passing the skills assessment."
              ]}
              icon={<Car />}
            />
            
            <ClassCProgramCard 
              title="1 Hr Behind the Wheel + Written Exam Prep + Road Test"
              subtitle=""
              price="460"
              bestSeller={true}
              points={[
                "Ideal for those seeking a fast, comprehensive Class C CDL prep",
                "1-hour personalized driving session with an instructor.",
                "Efficiently covers both written and practical aspects of the CDL and provides a well-rounded learning experience."
              ]}
              icon={<Car />}
            />
          </div>
          
          <div className="text-center mb-8">
            <LocationDropdown 
              title="Select your Location"
              subtitle="DSS Page with Price"
              locations={[
                { label: "CHICAGO", value: "chicago", href: "/chicago" },
                { label: "SUBURB", value: "suburb", href: "/suburb" }
              ]}
            />
            
            <p className="text-sm text-gray-700 max-w-4xl mx-auto mt-6">
              ***Use our vehicles for your road test at the Secretary of State facility
            </p>
            <p className="text-sm text-gray-700 max-w-4xl mx-auto mt-2">
              ***Student enrolling in any of these packages MUST possess a valid, non-CDL Illinois driver's license. Need one?
              <span className="text-red-500 ml-2">Redirected to Adult Programs Best Sellers</span>
            </p>
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
        totalSlides={classCSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {classCSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default ClassCProgramSlides;