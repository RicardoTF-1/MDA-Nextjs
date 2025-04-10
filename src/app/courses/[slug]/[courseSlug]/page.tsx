'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchCourse, checkBackendConnection } from '@/lib/api';

interface LocationDetails {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone?: string;
  email?: string;
}

interface LocationItem {
  id: number;
  location: number;
  location_details: LocationDetails;
  is_available: boolean;
  price?: number;
  discounted_price?: number;
  has_free_pickup?: boolean;
  instructor_note?: string;
  availability_note?: string;
  actual_price?: number;
}

interface Course {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  bullet_point_list?: string[];
  header_color?: string;
  is_featured?: boolean;
  has_free_pickup?: boolean;
  price?: number;
  duration?: string;
  age_range?: string;
  category_name?: string;
  subcategory_name?: string;
  locations?: LocationItem[];
}

export default function CourseDetailPage(): JSX.Element {
  const { slug, courseSlug } = useParams() as { slug: string; courseSlug: string };
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState<boolean>(true);

  // Check backend connection
  useEffect(() => {
    const checkConnection = async (): Promise<void> => {
      const isAvailable = await checkBackendConnection();
      setBackendAvailable(isAvailable);
    };
    checkConnection();
  }, []);

  useEffect(() => {
    const loadCourseData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        console.log(`Loading course details for: ${courseSlug}`);
        const data = await fetchCourse(courseSlug);
        setCourse(data);
        
        // Set first location as default if available
        if (data.locations && data.locations.length > 0) {
          setSelectedLocation(data.locations[0]);
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
  const handleLocationSelect = (locationId: number): void => {
    if (course && course.locations) {
      const location = course.locations.find(l => l.location === locationId);
      if (location) {
        setSelectedLocation(location);
      }
    }
  };

  // Display the effective price (location-specific or course default)
  const displayPrice = selectedLocation?.actual_price || selectedLocation?.price || course?.price;
  const displayDiscountedPrice = selectedLocation?.discounted_price;
  const showDiscount = displayDiscountedPrice && displayDiscountedPrice < (displayPrice || 0);
  
  // Determine if free pickup is available
  const hasFreePickup = selectedLocation?.has_free_pickup !== undefined 
    ? selectedLocation.has_free_pickup 
    : course?.has_free_pickup;

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors"
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
          <Link href={`/courses/${slug}`} className="text-emerald-600 hover:text-emerald-700 font-medium">
            Back to Category
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Backend Connection Warning */}
      {!backendAvailable && (
        <div className="bg-yellow-100 border-b border-yellow-200 p-2 text-center text-yellow-800 text-sm">
          <p>Running in offline mode with mock data. Some features may be limited.</p>
        </div>
      )}
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-gray-500">
            <Link href="/courses" className="hover:text-emerald-600">Courses</Link>
            <span className="mx-2">›</span>
            <Link href={`/courses/${slug}`} className="hover:text-emerald-600">
              {course.category_name || 'Category'}
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
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800 text-white'
            } p-6 relative`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                {course.subtitle && <p className="text-lg mt-2">{course.subtitle}</p>}
                {course.duration && <p className="mt-2 text-sm opacity-80">Duration: {course.duration}</p>}
                {hasFreePickup && (
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                    {course.header_color === 'warning' 
                      ? <span className="text-emerald-800">Free Pickup</span> 
                      : <span className="text-white">Free Pickup</span>}
                  </div>
                )}
              </div>
              
              {course.is_featured && (
                <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Price Display with Location-Specific Pricing */}
            {displayPrice !== undefined && (
              <div className="mt-4">
                {showDiscount ? (
                  <div>
                    <span className="text-2xl font-bold">${displayDiscountedPrice}</span>
                    <span className="ml-2 text-lg line-through opacity-70">${displayPrice}</span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold">${displayPrice}</span>
                )}
                
                {selectedLocation && selectedLocation.price !== course.price && (
                  <p className="text-sm mt-1 opacity-80">
                    Special pricing for this location
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Course Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Description */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Course Description</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>{course.description}</p>
                </div>
                
                {course.age_range && (
                  <div className="mt-6">
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {course.age_range === 'teen' ? 'For Teens' : 
                       course.age_range === 'adult' ? 'For Adults' : 
                       course.age_range === 'all' ? 'For All Ages' : course.age_range}
                    </span>
                  </div>
                )}
                
                <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">What You'll Learn</h2>
                <ul className="space-y-4">
                  {course.bullet_point_list && course.bullet_point_list.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-6 w-6 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                
                {/* Location-specific instructor note if available */}
                {selectedLocation && selectedLocation.instructor_note && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <h3 className="font-medium text-yellow-800 mb-1">Instructor Note:</h3>
                    <p className="text-yellow-800 text-sm">{selectedLocation.instructor_note}</p>
                  </div>
                )}
              </div>
              
              {/* Right Column - Location & Registration */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Choose a Location</h2>
                  
                  {course.locations && course.locations.length > 0 ? (
                    <>
                      <div className="space-y-3 mb-6">
                        {course.locations.map(location => (
                          <button
                            key={location.id}
                            onClick={() => handleLocationSelect(location.location)}
                            className={`block w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                              selectedLocation && selectedLocation.id === location.id
                                ? 'bg-emerald-50 border-emerald-500'
                                : 'border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="font-medium text-gray-800">
                              {location.location_details.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {location.location_details.city}, {location.location_details.state}
                            </div>
                            
                            {/* Show location-specific price */}
                            {location.price !== undefined && (
                              <div className="mt-1">
                                {location.discounted_price && location.discounted_price < location.price ? (
                                  <div className="flex items-center">
                                    <span className="text-emerald-600 font-medium">${location.discounted_price}</span>
                                    <span className="ml-2 text-sm text-gray-500 line-through">${location.price}</span>
                                  </div>
                                ) : (
                                  <span className="text-emerald-600 font-medium">${location.price}</span>
                                )}
                              </div>
                            )}
                            
                            {/* Show free pickup icon if available */}
                            {location.has_free_pickup && (
                              <div className="mt-1 text-xs text-emerald-600 flex items-center">
                                <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h-1a1 1 0 01-.994-.89l-.006-.11A1 1 0 0110 8V7h1a1 1 0 00.993-.883L12 6V5a1 1 0 00-1-1H3z" />
                                  <path d="M13 8V7h1a1 1 0 011 1v6h-1a1 1 0 00-1 1v1.5a2.5 2.5 0 104.95.5H18V8h-5z" />
                                </svg>
                                Free Pickup
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      
                      {/* Selected Location Details */}
                      {selectedLocation && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                          <h3 className="font-medium text-gray-800 mb-2">Selected Location:</h3>
                          <div className="text-sm text-gray-600">
                            <p>{selectedLocation.location_details.name}</p>
                            <p>{selectedLocation.location_details.address}</p>
                            <p>{selectedLocation.location_details.city}, {selectedLocation.location_details.state} {selectedLocation.location_details.zip_code}</p>
                            {selectedLocation.location_details.phone && <p className="mt-2">Phone: {selectedLocation.location_details.phone}</p>}
                          </div>
                          
                          {/* Special availability note if any */}
                          {selectedLocation.availability_note && (
                            <div className="mt-2 text-sm text-emerald-600 italic">
                              {selectedLocation.availability_note}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Register Button */}
                      <Link 
                        href={`/register?course=${course.id}&location=${selectedLocation?.location || ''}`}
                        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        Register Now
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 mb-4">No locations available for this course</p>
                      <Link 
                        href="/contact"
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors"
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