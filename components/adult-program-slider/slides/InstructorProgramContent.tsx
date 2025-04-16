"use client";

import React from 'react';
import { GraduationCap } from 'lucide-react';

interface InstructorProgramContentProps {
  // Add props for API integration if needed
}

const InstructorProgramContent: React.FC<InstructorProgramContentProps> = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 animate-fadeIn py-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Instructor Training Program</h1>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Become a certified driving instructor in Illinois and share your passion for safe driving!
        </p>
        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
          At My Drive Academy, our comprehensive Instructor Program equips you with the knowledge and skills 
          to educate and empower new drivers.
        </p>
        <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
          Join us in shaping the next generation of responsible motorists and build a rewarding career.
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg max-w-lg w-full">
          <div className="p-6 bg-gray-900 text-white text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <div className="flex justify-center mb-3">
              <GraduationCap size={48} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Instructor Certification Program</h2>
            <p className="text-emerald-400 font-semibold">Comprehensive Training & Certification</p>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Learn effective teaching methodologies for new drivers</span>
              </p>
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Master advanced driving techniques to demonstrate to students</span>
              </p>
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Understand Illinois traffic laws and regulations in depth</span>
              </p>
              <p className="flex items-start mb-3">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-800">Gain practical experience with supervised teaching sessions</span>
              </p>
            </div>
            <a 
              href="#register-now" 
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-center shadow-md hover:shadow-lg transition-all"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Program Requirements</h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          <ul className="text-left space-y-2">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Valid Illinois driver's license for at least 2 years</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Clean driving record (no major violations in the past 3 years)</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>High school diploma or equivalent</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Pass a background check</span>
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              <span>Complete all required coursework and examinations</span>
            </li>
          </ul>
        </div>
        
        <p className="mt-8 text-gray-700">
          Start your journey as a driving instructor today! For more information or to schedule a consultation, 
          please contact our instructor training department at <a href="mailto:instructors@mydriveacademy.com" className="text-emerald-600 hover:underline">instructors@mydriveacademy.com</a>.
        </p>
      </div>
    </div>
  );
};

export default InstructorProgramContent;