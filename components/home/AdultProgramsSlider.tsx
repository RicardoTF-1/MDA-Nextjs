"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdultProgramsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 0 - Original Adult Programs
    {
      title: "Adult Programs",
      content: (
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Adult Programs</h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Whether you're a first-time driver or looking for a refresher, MyDrive Academy offers personalized adult driving programs tailored
              to your needs. Our expert instructors provide comprehensive training, including permit test preparation, defensive driving
              techniques, and road test readiness. We are committed to building safe, skilled, and confident drivers ready to navigate Illinois
              roads with ease!
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Here's how to get your driver's license:</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Secure Your Learner's Permit.</h3>
              <p className="italic text-gray-700">
                <a href="/permit-prep" className="text-emerald-600 hover:underline">
                  Click here
                </a> if you need help obtaining yours!
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Learn How to Drive.</h3>
              <p className="italic text-gray-700">
                Want professional driving lessons? <a href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">
                  Click here!
                </a>
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. Pass your Road Test.</h3>
              <p className="italic text-gray-700">
                Ready to pass your test? <a href="/adult-programs-slide-3" className="text-emerald-600 hover:underline">
                  Click here!
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <a
              href="/contact"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-700 font-medium py-2 px-6 rounded-md transition-colors mr-4"
            >
              Contact Us
            </a>
            
            <a
              href="/courses"
              className="inline-block bg-gray-100 text-gray-800 hover:bg-gray-200 font-medium py-2 px-6 rounded-md transition-colors"
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Adult Programs: Best Sellers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Core Package */}
            <div className="bg-navy-900 rounded-lg overflow-hidden border-2 border-yellow-400">
              <div className="p-4 bg-navy-900 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Core Package</h2>
                <p className="text-green-400 font-semibold">6 Hours Behind-the-Wheel + Road Test</p>
              </div>
              <div className="bg-white p-4">
                <div className="mb-4">
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Perfect for beginners looking for structured practice and essential skills to drive safely.</span>
                  </p>
                  <p className="mt-4">
                    This package covers fundamental driving techniques, basic maneuvers, and road test preparation to ensure you're fully ready for your test.
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Select your Location
                  </button>
                </div>
              </div>
            </div>

            {/* Essential Package */}
            <div className="bg-navy-900 rounded-lg overflow-hidden border-2 border-yellow-400">
              <div className="p-4 bg-navy-900 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Essential Package</h2>
                <p className="text-green-400 font-semibold">8 Hours Behind-the-Wheel + Road Test</p>
              </div>
              <div className="bg-white p-4">
                <div className="mb-4">
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Ideal for new drivers who want extra practice beyond the basics to build confidence.</span>
                  </p>
                  <p className="flex items-start mb-2 mt-4">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Provides more hands-on experience, improves driving skills, test readiness, and defensive abilities.</span>
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Select your Location
                  </button>
                </div>
              </div>
            </div>

            {/* Essential Pro */}
            <div className="bg-navy-900 rounded-lg overflow-hidden border-2 border-yellow-400">
              <div className="p-4 bg-navy-900 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Essential Pro</h2>
                <p className="text-green-400 font-semibold">12 Hours Behind-the-Wheel + Road Test</p>
                <p className="text-sm text-white">Parallel Parking & Highway Driving</p>
              </div>
              <div className="bg-white p-4">
                <div className="mb-4">
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Drivers seeking comprehensive training, including challenging maneuvers.</span>
                  </p>
                  <p className="flex items-start mb-2 mt-4">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Includes Parallel Parking and Highway Driving, building strong driving fundamentals.</span>
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Select your Location
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 mb-2">
              Select your Location
            </div>
            <div className="flex justify-center gap-2 mb-2">
              <div className="bg-green-500 text-white rounded-lg px-4 py-1">CHICAGO</div>
              <div className="bg-green-500 text-white rounded-lg px-4 py-1">SUBURB</div>
            </div>
            <div className="text-lg font-bold italic mb-6">DSS Page with Price</div>
            <div className="font-bold mb-1">Click here for more options</div>
            <a href="/adult-programs" className="text-red-500 hover:underline">DSS Page For Adult Programs</a>
          </div>

          <div className="text-sm text-gray-600 max-w-4xl mx-auto">
            <p className="mb-1">***All packages include the use of our modern, comfortable vehicle for your road test.</p>
            <p className="mb-1">***For Road Test, students must meet the instructor at the designated DMV location.</p>
            <p>***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours? <a href="/permit-prep" className="text-blue-500 hover:underline">Click here!</a></p>
          </div>
        </div>
      )
    },
    // Slide 2 - More Adult Programs
    {
      title: "Adult Programs",
      content: (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-10 text-center">Adult Programs</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Express Drive Package */}
            <div className="bg-navy-900 rounded-lg overflow-hidden border-2 border-yellow-400">
              <div className="p-4 bg-navy-900 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Express Drive Package</h2>
                <p className="text-green-400 font-semibold">2 Hours Behind-the-Wheel + Road Test</p>
              </div>
              <div className="bg-white p-4">
                <div className="mb-4">
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Perfect for those needing a quick refresher before taking the road test.</span>
                  </p>
                  <p className="flex items-start mb-2 mt-4">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Covers fundamental driving techniques, basic maneuvers, and road test preparation to ensure test readiness.</span>
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Select your Location
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Start Package */}
            <div className="bg-navy-900 rounded-lg overflow-hidden border-2 border-yellow-400">
              <div className="p-4 bg-navy-900 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Quick Start Package</h2>
                <p className="text-green-400 font-semibold">4 Hours Behind-the-Wheel + Road Test</p>
              </div>
              <div className="bg-white p-4">
                <div className="mb-4">
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Ideal for those needing a quick refresher before their road test. This package covers:</span>
                  </p>
                  <p className="mt-4">
                    This package covers essential skills, corrects common mistakes, and builds confidence for the test.
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Select your Location
                  </button>
                </div>
              </div>
            </div>

            {/* Expert Driver Package */}
            <div className="bg-navy-900 rounded-lg overflow-hidden border-2 border-yellow-400">
              <div className="p-4 bg-navy-900 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Expert Driver Package</h2>
                <p className="text-green-400 font-semibold">Permit Prep + 2 Hours Behind-the-Wheel + Road Test</p>
              </div>
              <div className="bg-white p-4">
                <div className="mb-4">
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Designed for individuals who are non-U.S. citizens, non-permanent residents, and do not have a Social Security Number.</span>
                  </p>
                  <p className="mt-2 mb-2">
                    This package includes permit exam preparation, state-mandated behind-the-wheel instruction, and a streamlined path to obtaining a valid Illinois driver's license.
                  </p>
                  <p className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Available in English or Spanish</span>
                  </p>
                </div>
                <div className="mt-2">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 mb-2">
              Select your Location
            </div>
            <div className="flex justify-center gap-2 mb-2">
              <div className="bg-green-500 text-white rounded-lg px-4 py-1">CHICAGO</div>
              <div className="bg-green-500 text-white rounded-lg px-4 py-1">SUBURB</div>
            </div>
            <div className="text-lg font-bold italic mb-6">DSS Page with Price</div>
            <div className="font-bold mb-1">See All Programs</div>
            <a href="/adult-programs" className="text-red-500 hover:underline">DSS Page For Adult Programs</a>
          </div>

          <div className="text-sm text-gray-600 max-w-4xl mx-auto">
            <p className="mb-1">***All packages include the use of our modern, comfortable vehicle for your road test.</p>
            <p className="mb-1">***For Road Test, students must meet the instructor at the designated DMV location.</p>
            <p>***A valid Learner's Permit is required to enroll in any of these packages. Need help obtaining yours? <a href="/permit-prep" className="text-blue-500 hover:underline">Click here!</a></p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="py-8 px-4 bg-white relative">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={prevSlide}
          className="bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 transition-colors focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="transition-opacity duration-500">
        {slides[currentSlide].content}
      </div>
      
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={nextSlide}
          className="bg-emerald-500 text-white p-2 rounded-full shadow-lg hover:bg-emerald-600 transition-colors focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors focus:outline-none ${
              index === currentSlide ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdultProgramsSlider;
