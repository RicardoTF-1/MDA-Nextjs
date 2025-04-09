'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchCourse } from '/lib/api';

export default function CourseDetailPage() {
  const { slug, courseSlug } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCourse(courseSlug);
        setCourse(data);
        
        // Set first location as default if available
        if (data.locations && data.locations.length > 0) {
          setSelectedLocation(data.locations[0].location_details);
        }
      } catch (err) {
        console.error(`Error loading course details for ${courseSlug}:`, err);
        setError('Could not load course details');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseSlug) {
      loadCourseData();
    }
  }, [courseSlug]);

  // Handle location selection
  const handleLocationSelect = (locationId) => {
    if (course && course.locations) {
      const location = course.locations.find(l => l.location === locationId);
      if (location) {
        setSelectedLocation(location.location_details);
      }
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no course data was found
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Course not found</p>
          <Link href={`/courses/${slug}`} className="text-green-500 hover:text-green-600 font-medium">
            Back to Category
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-500">
            <Link href="/courses" className="hover:text-green-500">Courses</Link>
            <span className="mx-2">›</span>
            <Link href={`/courses/${slug}`} className="hover:text-green-500">
              {course.category_name}
            </Link>
            {course.subcategory_name && (
              <>
                <span className="mx-2">›</span>
                <span>{course.subcategory_name}</span>
              </>
            )}
            <span className="mx-2">›</span>
            <span className="text-gray-700">{course.title}</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Course Header */}
          <div 
            className={`${
              course.header_color === 'warning' 
                ? 'bg-yellow-500 text-gray-800' 
                : course.header_color === 'primary' 
                  ? 'bg-blue-600 text-white'
                  : course.header_color === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-white'
            } p-6 relative`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                {course.subtitle && <p className="text-lg mt-2">{course.subtitle}</p>}
                {course.has_free_pickup && (
                  <p className="mt-2 text-lg font-medium">
                    {course.header_color === 'warning' 
                      ? <span className="text-green-800">Free Pickup</span> 
                      : <span className="text-green-300">Free Pickup</span>}
                  </p>
                )}
              </div>
              
              {course.is_featured && (
                <div className="bg-yellow-500 rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>
            
            {course.price && (
              <div className="mt-4">
                <span className="text-2xl font-bold">${course.price}</span>
              </div>
            )}
          </div>
          
          {/* Course Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Course Description</h2>
                <div className="prose prose-sm max-w-none text-gray-600">
                  <p>{course.description}</p>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">What You'll Learn</h2>
                <ul className="space-y-4">
                  {course.bullet_point_list && course.bullet_point_list.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Requirements Note */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> Students enrolling in this course must have a learner's permit and 
                    submit proof that they have successfully completed a Driver's Education class, either in 
                    high school or at a private driving school.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Location & Registration */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Choose a Location</h2>
                  
                  {course.locations && course.locations.length > 0 ? (
                    <>
                      <div className="space-y-3 mb-6">
                        {course.locations.map(locationItem => (
                          <button
                            key={locationItem.location}
                            onClick={() => handleLocationSelect(locationItem.location)}
                            className={`block w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                              selectedLocation && selectedLocation.id === locationItem.location_details.id
                                ? 'bg-green-50 border-green-500'
                                : 'border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="font-medium text-gray-800">
                              {locationItem.location_details.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {locationItem.location_details.city}, {locationItem.location_details.state}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      {selectedLocation && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                          <h3 className="font-medium text-gray-800 mb-2">Selected Location:</h3>
                          <div className="text-sm text-gray-600">
                            <p>{selectedLocation.name}</p>
                            <p>{selectedLocation.address}</p>
                            <p>{selectedLocation.city}, {selectedLocation.state} {selectedLocation.zip_code}</p>
                            {selectedLocation.phone && <p className="mt-2">Phone: {selectedLocation.phone}</p>}
                          </div>
                        </div>
                      )}
                      
                      <Link 
                        href={`/register?course=${course.id}&location=${selectedLocation?.id || ''}`}
                        className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        Register Now
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-4">No locations available for this course</p>
                      <Link 
                        href="/contact"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                      >
                        Contact Us
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}