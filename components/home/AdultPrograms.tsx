'use client';

import React from 'react';
import Link from 'next/link';

const AdultPrograms: React.FC = () => {
  return (
    <div className="py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Adult Programs</h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Whether you&apos;re a first-time driver or looking for a refresher, MyDrive Academy offers personalized adult driving programs tailored
            to your needs. Our expert instructors provide comprehensive training, including permit test preparation, defensive driving
            techniques, and road test readiness. We are committed to building safe, skilled, and confident drivers ready to navigate Illinois
            roads with ease!
          </p>
        </div>

        {/* License Process Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Here&apos;s how to get your driver&apos;s license:</h2>

          {/* Step 1 */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">1. Secure Your Learner&apos;s Permit.</h3>
            <p className="italic text-gray-700">
              <Link href="/permit-prep" className="text-emerald-600 hover:underline">
                Click here
              </Link>{' '}
              if you need help obtaining yours!
            </p>
          </div>

          {/* Step 2 */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">2. Learn How to Drive.</h3>
            <p className="italic text-gray-700">
              Want professional driving lessons?{' '}
              <Link href="/adult-programs-best-sellers" className="text-emerald-600 hover:underline">
                Click here!
              </Link>
            </p>
          </div>

          {/* Step 3 */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">3. Pass your Road Test.</h3>
            <p className="italic text-gray-700">
              Ready to pass your test?{' '}
              <Link href="/adult-programs-slide-3" className="text-emerald-600 hover:underline">
                Click here!
              </Link>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block bg-emerald-500 text-white hover:bg-emerald-700 font-medium py-2 px-6 rounded-md transition-colors mr-4"
          >
            Contact Us
          </Link>

          <Link
            href="/courses"
            className="inline-block bg-gray-100 text-gray-800 hover:bg-gray-200 font-medium py-2 px-6 rounded-md transition-colors"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdultPrograms;

