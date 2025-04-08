'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SubcategorySection = ({ subcategory }) => {
  if (!subcategory) {
    return <div className="text-center py-8">No subcategory data available</div>;
  }

  return (
    <div className="subcategory-content animate-fadeIn">
      {/* Top section with image and text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          {subcategory.image_url ? (
            <Image
              src={subcategory.image_url}
              alt={subcategory.title}
              width={500}
              height={350}
              className="rounded-xl w-full h-auto object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-700 leading-relaxed mb-4">
            {subcategory.description}
          </p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subcategory.courses && subcategory.courses.length > 0 ? (
          subcategory.courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              {/* Card Header */}
              <div className={`bg-${course.header_color === 'warning' ? 'yellow-500' : course.header_color === 'primary' ? 'blue-700' : 'gray-800'} p-4 relative ${course.header_color === 'warning' ? 'text-gray-800' : 'text-white'}`}>
                <h3 className="font-bold text-lg">{course.title}</h3>
                {course.subtitle && <p className="text-sm">{course.subtitle}</p>}
                {course.has_free_pickup && (
                  <p className="text-green-300 text-sm font-medium">Free Pickup</p>
                )}
                {course.is_featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center border-2 border-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Card Body */}
              <div className="p-4">
                <ul className="space-y-2">
                  {course.bullet_point_list && course.bullet_point_list.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Card Footer */}
              <div className="p-4 bg-gray-50 text-center">
                <LocationDropdown locations={course.locations} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No courses available for this category
          </div>
        )}
      </div>
      
      {/* Requirements Note */}
      <div className="mt-8 text-center text-gray-600 max-w-3xl mx-auto border-t pt-6">
        <p>
          Students enrolling in any of these packages must have a learner's permit and submit proof that they have 
          successfully completed a Driver's Education class, either in high school or at a private driving school.
        </p>
      </div>
    </div>
  );
};

// Location Dropdown Component
const LocationDropdown = ({ locations }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!locations || locations.length === 0) {
    return (
      <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full">
        Contact Us
      </button>
    );
  }

  return (
    <div className="relative inline-block">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full flex items-center"
      >
        Choose A Location
        <svg className={`w-4 h-4 ml-2 transform ${isOpen ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
          <ul className="py-1">
            {locations.map(location => (
              <li key={location.id}>
                <Link 
                  href={`/locations/${location.location_id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {location.location_name}, {location.location_city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubcategorySection;