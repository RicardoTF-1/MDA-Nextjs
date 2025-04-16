"use client";

import React, { useState } from 'react';
import { Car, BookOpen, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { SlideProps } from '../types';
import ProgramCard from '../cards/ProgramCard';
import BottomLink from '../common/BottomLink';
import FooterNotes from '../common/FooterNotes';
import SlideNavigation from '../common/SlideNavigation';

interface AdultProgramSlidesProps {
  // Any props needed for API connections can be added here
}

const AdultProgramSlides: React.FC<AdultProgramSlidesProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Function to navigate to the next slide
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to navigate to the previous slide
  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Function to navigate to a specific slide
  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  // Adult Programs Slides content
  const slides: SlideProps[] = [
    // Slide 0 - Original Adult Programs
    {
      title: "Adult Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Adult Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Whether you're a first-time driver or looking for a refresher, MyDrive Academy offers personalized adult driving programs tailored
              to your needs. Our expert instructors provide comprehensive training, including permit test preparation, defensive driving
              techniques, and road test readiness. We are committed to building safe, skilled, and confident drivers ready to navigate Illinois
              roads with ease!
            </p>
          </div>
          <div className="mt-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Here's how to get your driver's license:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <BookOpen size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Secure Your Learner's Permit.</h3>
                <p className="text-gray-700 mb-4">
                  Start your driving journey by obtaining your learner's permit.
                </p>
                <a href="/permit-prep" className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors">
                  Get Permit Help
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Car size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Learn How to Drive.</h3>
                <p className="text-gray-700 mb-4">
                  Professional driving lessons tailored to your skill level.
                </p>
                <a href="/adult-programs-best-sellers" className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors">
                  View Lessons
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500 transition-transform duration-300 hover:transform hover:scale-105">
                <div className="flex justify-center mb-4">
                  <Award size={48} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Pass your Road Test.</h3>
                <p className="text-gray-700 mb-4">
                  Comprehensive preparation to ensure you pass your driving test.
                </p>
                <a href="/adult-programs-slide-3" className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-2 px-4 rounded-md transition-colors">
                  Road Test Prep
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center space-x-6">
            <a
              href="/contact"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Contact Us
            </a>
            
            <a
              href="/courses"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-600 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View All Programs
            </a>
          </div>
        </div>
      )
    },
    // Slide 1 - Best Sellers Programs
    {
      title: "Adult Programs: Best Sellers",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Adult Programs: Best Sellers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <ProgramCard 
              title="Core Package" 
              subtitle="6 Hours Behind-the-Wheel + Road Test"
              description={[
                "Perfect for beginners looking for structured practice and essential skills to drive safely.",
                "This package covers fundamental driving techniques, basic maneuvers, and road test preparation to ensure you're fully ready for your test."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Essential Package" 
              subtitle="8 Hours Behind-the-Wheel + Road Test"
              description={[
                "Ideal for new drivers who want extra practice beyond the basics to build confidence.",
                "Provides more hands-on experience, improves driving skills, test readiness, and defensive abilities."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Essential Pro" 
              subtitle="12 Hours Behind-the-Wheel + Road Test"
              extraInfo="Parallel Parking & Highway Driving"
              description={[
                "Drivers seeking comprehensive training, including challenging maneuvers.",
                "Includes Parallel Parking and Highway Driving, building strong driving fundamentals."
              ]}
              icon={<Car />}
            />
          </div>

          <BottomLink 
            viewAllLink="/adult-programs" 
            linkText="View All Adult Programs" 
          />

          <FooterNotes />
        </div>
      )
    },
    // Slide 2 - More Adult Programs
    {
      title: "More Adult Programs",
      content: (
        <div className="max-w-6xl mx-auto px-4 animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">More Adult Programs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <ProgramCard 
              title="Express Drive Package" 
              subtitle="2 Hours Behind-the-Wheel + Road Test"
              description={[
                "Perfect for those needing a quick refresher before taking the road test.",
                "Covers fundamental driving techniques and road test preparation."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Quick Start Package" 
              subtitle="4 Hours Behind-the-Wheel + Road Test"
              description={[
                "Ideal for those needing a quick refresher before their road test.",
                "This package covers essential skills, corrects common mistakes, and builds confidence for the test."
              ]}
              icon={<Car />}
            />
            
            <ProgramCard 
              title="Expert Driver Package" 
              subtitle="Permit Prep + 2 Hours Behind-the-Wheel + Road Test"
              description={[
                "Designed for non-U.S. citizens without a Social Security Number.",
                "Includes permit exam preparation, state-mandated instruction, and a streamlined path to an Illinois driver's license.",
                "Available in English or Spanish"
              ]}
              cta="Register Now"
              icon={<Car />}
            />
          </div>

          <BottomLink 
            viewAllLink="/adult-programs" 
            linkText="Explore All Program Options" 
          />

          <FooterNotes />
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
        totalSlides={slides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {slides[currentSlide].content}
      </div>
    </div>
  );
};

export default AdultProgramSlides;