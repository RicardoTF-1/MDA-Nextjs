'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCarLessons } from '@/lib/api';

export default function CarLessonsPage() {
  const [carLessonsData, setCarLessonsData] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadCarLessons = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCarLessons();
        setCarLessonsData(data);
        
        // Set the first subcategory as active by default
        if (data && data.subcategories && data.subcategories.length > 0) {
          setActiveSubcategory(data.subcategories[0]);
        }
      } catch (err) {
        console.error('Error loading car lessons:', err);
        setError('Could not load car lessons data');
      } finally {
        setIsLoading(false);
      }
    };

    loadCarLessons();
  }, []);

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(subcategory);
  };

  if (isLoading) {
    return (
      <div className="py-16 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">In-Car Lessons</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !carLessonsData) {
    return (
      <div className="py-16 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">In-Car Lessons</h1>
          <div className="text-red-500">{error || "No car lessons data available"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Banner/Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">In-Car Lessons</h1>
        </div>
      </div>

      {/* Location Finder Section */}
      <section className="py-12 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Find a location near you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sample location cards - replace with actual location data */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-40 bg-gray-300">
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Bridgeview & Worth</h3>
                </div>
              </div>
              <div className="p-4 text-center">
                <Link 
                  href="/locations/bridgeview"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Go To Location
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-40 bg-gray-300">
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Chicago</h3>
                </div>
              </div>
              <div className="p-4 text-center">
                <Link 
                  href="/locations/chicago"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Go To Location
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-40 bg-gray-300">
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Naperville & Aurora</h3>
                </div>
              </div>
              <div className="p-4 text-center">
                <Link 
                  href="/locations/naperville"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Go To Location
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-40 bg-gray-300">
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">Little Village</h3>
                </div>
              </div>
              <div className="p-4 text-center">
                <Link 
                  href="/locations/little-village"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  Go To Location
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Main Category Tabs */}
          <div className="flex overflow-x-auto mb-6">
            <Link 
              href="/courses/teen-programs"
              className="whitespace-nowrap px-4 py-2 border-b-2 border-transparent hover:border-green-500 mr-4"
            >
              Teen Programs
            </Link>
            <Link 
              href="/courses/classroom-courses"
              className="whitespace-nowrap px-4 py-2 border-b-2 border-transparent hover:border-green-500 mr-4"
            >
              Classroom Courses
            </Link>
            <Link 
              href="/courses/in-car-lessons"
              className="whitespace-nowrap px-4 py-2 border-b-2 border-green-500 text-green-600 font-medium mr-4"
            >
              In-Car Lessons
            </Link>
            <Link 
              href="/courses/license-c"
              className="whitespace-nowrap px-4 py-2 border-b-2 border-transparent hover:border-green-500 mr-4"
            >
              License C
            </Link>
            <Link 
              href="/courses/foreign-drivers"
              className="whitespace-nowrap px-4 py-2 border-b-2 border-transparent hover:border-green-500 mr-4"
            >
              Foreign Drivers
            </Link>
            <Link 
              href="/courses/illinois-permit-prep"
              className="whitespace-nowrap px-4 py-2 border-b-2 border-transparent hover:border-green-500"
            >
              Illinois Permit Prep
            </Link>
          </div>

          {/* Subcategory Buttons */}
          <div className="flex flex-wrap justify-center mb-8">
            {carLessonsData.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => handleSubcategoryClick(subcategory)}
                className={`m-2 px-6 py-2 rounded-full transition-colors ${
                  activeSubcategory && activeSubcategory.id === subcategory.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {subcategory.title}
              </button>
            ))}
          </div>

          {/* Active Subcategory Content */}
          {activeSubcategory && (
            <div className="subcategory-content animate-fadeIn">
              {/* Top section with image and text */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-1">
                  {activeSubcategory.image_url ? (
                    <Image
                      src={activeSubcategory.image_url}
                      alt={activeSubcategory.title}
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
                    {activeSubcategory.description}
                  </p>
                </div>
              </div>

              {/* Course Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeSubcategory.courses && activeSubcategory.courses.length > 0 ? (
                  activeSubcategory.courses.map((course) => (
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