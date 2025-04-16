"use client";

import React, { useState } from 'react';
import { BookOpen, Car, Award, Users } from 'lucide-react';
import { SlideProps } from '../types';
import TeenProgramCard from '../cards/TeenProgramCard';
import TeenBottomSection from '../common/TeenBottomSection';
import SlideNavigation from '../common/SlideNavigation';

interface TeenProgramSlidesProps {
  // Add props for API integration if needed
}

const TeenProgramSlides: React.FC<TeenProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Functions for slide navigation
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === teenSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? teenSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Teen Programs Slides content
  const teenSlides: SlideProps[] = [
    {
      title: "Teen Driver's Education Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Teen Driver's Education</h1>
          
          {/* Full Width Layout */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">License Process</h2>
            
            {/* Steps Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {/* Step 1 - Classroom */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">1</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <BookOpen size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">30 Hours Classroom</h3>
                <p className="text-gray-600 text-sm">Complete driver's ed course</p>
              </div>
              
              {/* Step 2 - Permit Test */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">2</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">Pass Permit Test</h3>
                <p className="text-gray-600 text-sm">At local DMV office</p>
              </div>
              
              {/* Step 3 - BTW Training */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">3</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Car size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">6 Hours BTW Training</h3>
                <p className="text-gray-600 text-sm">With certified instructor</p>
              </div>
              
              {/* Step 4 - Practice */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">4</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">50 Hours Practice</h3>
                <p className="text-gray-600 text-sm">With licensed adult</p>
              </div>
              
              {/* Step 5 - Road Test */}
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-2">5</div>
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Award size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-2">Road Test</h3>
                <p className="text-gray-600 text-sm">At age 16+ with 9mo permit</p>
              </div>
            </div>
          </div>
          
          {/* Requirements Footer */}
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-medium mb-2 text-center">Requirements:</p>
            <ul className="list-disc pl-5 space-y-1 max-w-lg mx-auto">
              <li>Must be 15-17 years old</li>
              <li>Parent/guardian consent required</li>
              <li>Valid learner's permit for behind-the-wheel training</li>
            </ul>
          </div>
        </div>
      )
    },
    // Slide 1 - Complete Program
    {
      title: "Teen Driving Programs: Complete Program",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Teen Driving Programs: Complete Program</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <TeenProgramCard 
              title="Partner Program"
              subtitle="30 Hours Driver's Education Classroom + 6 hrs Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "Partner required to register.",
                "Teens with or without prior driving experience who need basic training",
                "Includes 6 hours of behind-the-wheel training and 6 hours of partner observation."
              ]}
              icon={<Users />}
            />
            
            <TeenProgramCard 
              title="Solo Program"
              subtitle="30 Hours Driver's Education Classroom + 8 hrs Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "(For teens with or without prior driving experience)",
                "Covers core driving techniques, parking skills, and defensive driving strategies",
                "Includes 8 hours of one-on-one behind-the-wheel training."
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="Teens Driver's Education"
              subtitle="30 Hours Classroom ONLY"
              subtitleColor="emerald-400"
              points={[
                "State-mandatory classroom portion for all new teen drivers.",
                "Learn all road rules and road signs.",
                "Obtain your driver's permit during the second week of the course."
              ]}
              buttonText="Register Now"
              icon={<BookOpen />}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-xl p-6 mb-8">
            <div className="mb-4 md:mb-0 md:mr-8">
              <div className="font-bold text-lg mb-2">Select your Location</div>
              <div className="flex justify-center gap-4 mt-2">
                <a href="/chicago" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  CHICAGO
                </a>
                <a href="/suburb" className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all">
                  SUBURB
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-700 mb-2">DSS Page with Price</div>
              <div className="text-lg font-bold mb-2">Click Here for more Options!</div>
              <a href="/teen-programs" className="text-red-500 font-medium hover:underline">DSS Page For Teen Programs</a>
            </div>
          </div>
          
          <TeenBottomSection 
            redirectText="the Permit Prep Page"
          />
        </div>
      )
    },
    // Slide 2 - Behind-the-Wheel Training Options 1
    {
      title: "Teen Driving Programs: Behind-the-Wheel Training Options",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Teen Driving Programs: Behind-the-Wheel Training Options</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <TeenProgramCard 
              title="Partner Program"
              subtitle="6 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "Partner required to register.",
                "Teens with or without prior driving experience who need basic training",
                "Includes 6 hours of behind-the-wheel training and 6 hours of partner observation."
              ]}
              icon={<Users />}
            />
            
            <TeenProgramCard 
              title="Solo Program"
              subtitle="8 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "Fully meets the state's driving practice requirement for teens.",
                "Covers Core driving techniques, parking skills, and defensive driving strategies.",
                "Includes 8 hours of one-on-one behind-the-wheel training."
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="12-Hr Teen Package"
              subtitle="12 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "Designed for teens <strong>with or without prior driving experience</strong> who need <strong>**basic training</strong>",
                "Covers <strong>core driving techniques, parking skills, and defensive driving strategies</strong>",
                "Includes <strong>**12 hours of behind-the-wheel training**</strong>",
                "Increased hands-on practice, night driving basics and confidence-building"
              ]}
              icon={<Car />}
            />
          </div>
          
          <TeenBottomSection 
            redirectText="Teen Programs with DE"
            mainLinkText="DSS Page For Teen Programs"
            mainLink="/teen-programs"
          />
        </div>
      )
    },
    // Slide 3 - Behind-the-Wheel Training Options 2
    {
      title: "Teen Driving Programs: Behind-the-Wheel Training Options",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Teen Driving Programs: Behind-the-Wheel Training Options</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <TeenProgramCard 
              title="12-Hr Teen Package"
              subtitle="12 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              bestSeller={true}
              points={[
                "Teens looking for more in-depth training before taking their road test.",
                "Increased hands-on practice, night driving basics, and enhanced confidence-building.",
                "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="Extra Practice 1"
              subtitle="25 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "Teens seeking extensive training to master safe driving habits.",
                "Advanced maneuvering, highway driving, and real-world traffic experience.",
                "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
              ]}
              icon={<Car />}
            />
            
            <TeenProgramCard 
              title="Extra Practice 2"
              subtitle="50 Hours Behind-the-Wheel"
              subtitleColor="emerald-400"
              points={[
                "New drivers aiming for full proficiency and meeting state-supervised driving requirements.",
                "Comprehensive behind-the-wheel training, varied road conditions, and mastery of defensive driving techniques.",
                "Covers parallel parking and highway driving <span class='italic'>(subject to instructor evaluation for safety)</span>"
              ]}
              icon={<Car />}
            />
          </div>
          
          <TeenBottomSection 
            redirectText="Teen Programs with DE"
            mainLinkText="DSS Page For Teen Programs"
            mainLink="/teen-programs"
          />
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
        totalSlides={teenSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {teenSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default TeenProgramSlides;