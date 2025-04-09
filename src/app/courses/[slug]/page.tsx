'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { fetchCourseCategory, fetchCoursesByCategorySlug } from '/lib/api';
import LocationFinder from '/components/common/LocationFinder';
import SubcategoryTabs from '/components/courses/SubcategoryTabs';
import SubcategorySection from '/components/courses/SubcategorySection';
import Link from 'next/link';

// Define interfaces for TypeScript
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
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  courses?: Course[];
}

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description?: string;
  has_subcategories: boolean;
  subcategories: Subcategory[];
  direct_courses: Course[];
}

export default function CourseCategoryPage(): JSX.Element {
  const { slug } = useParams() as { slug: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const courseCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategoryData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await fetchCourseCategory(slug);
        setCategoryData(data);
        
        // If there are subcategories, set the first one as active
        if (data.has_subcategories && data.subcategories.length > 0) {
          setActiveSubcategory(data.subcategories[0]);
          setCourses(data.subcategories[0].courses || []);
        } else {
          // No subcategories, show direct courses
          setCourses(data.direct_courses || []);
        }
      } catch (err) {
        console.error('Error loading category data:', err);
        setError('Could not load category data');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadCategoryData();
    }
  }, [slug]);

  // Set up intersection observer for fade-in animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all course cards
    if (courseCardsRef.current) {
      const cards = courseCardsRef.current.querySelectorAll('.course-card');
      cards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => {
      if (courseCardsRef.current) {
        const cards = courseCardsRef.current.querySelectorAll('.course-card');
        cards.forEach((card) => {
          observer.unobserve(card);
        });
      }
    };
  }, [courses, activeSubcategory]);

  const handleSubcategoryChange = async (subcategory: Subcategory): Promise<void> => {
    try {
      setActiveSubcategory(subcategory);
      setCourses(subcategory.courses || []);
    } catch (err) {
      console.error(`Error loading courses for subcategory ${subcategory.slug}:`, err);
      setError(`Could not load courses for ${subcategory.name}`);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-gray-600">Loading course information...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !categoryData) {
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

  // If no category data was found
  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Course category not found</p>
          <Link href="/courses" className="text-emerald-600 hover:text-emerald-700 font-medium">
            View All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Banner/Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">{categoryData.name}</h1>
          {categoryData.description && (
            <p className="text-white text-center mt-4 max-w-3xl mx-auto">
              {categoryData.description}
            </p>
          )}
        </div>
      </div>

      {/* Location Finder Section */}
      {/* <LocationFinder /> */}

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Subcategory Tabs (if available) */}
          {categoryData.has_subcategories && (
            <SubcategoryTabs
              subcategories={categoryData.subcategories}
              activeSubcategoryId={activeSubcategory?.id}
              onSubcategoryChange={handleSubcategoryChange}
            />
          )}

          {/* Content Section */}
          {categoryData.has_subcategories ? (
            // Show the subcategory content if there are subcategories
            activeSubcategory && (
              <SubcategorySection
                subcategory={activeSubcategory}
                categorySlug={slug}
              />
            )
          ) : (
            // Show direct courses if no subcategories
            <div ref={courseCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div 
                    key={course.id} 
                    className="course-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 opacity-0 translate-y-10 transform ease-out"
                  >
                    {/* Card Header - Modern, Minimalist Design */}
                    <div className={`${
                      course.header_color === 'warning' 
                        ? 'bg-yellow-500 text-gray-800' 
                        : course.header_color === 'primary' 
                          ? 'bg-blue-600 text-white'
                          : course.header_color === 'success'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-800 text-white'
                    } p-6 rounded-t-lg relative`}>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      {course.subtitle && <p className="text-sm mt-2 opacity-90">{course.subtitle}</p>}
                      {course.has_free_pickup && (
                        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                          {course.header_color === 'warning' 
                            ? <span className="text-emerald-800">Free Pickup</span> 
                            : <span className="text-white">Free Pickup</span>}
                        </div>
                      )}
                      {course.is_featured && (
                        <div className="absolute top-4 right-4 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Card Body - Improved Readability */}
                    <div className="p-6">
                      <ul className="space-y-4">
                        {course.bullet_point_list && course.bullet_point_list.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {course.price !== undefined && (
                        <div className="mt-6 flex justify-center">
                          <span className="text-gray-900 font-bold text-2xl">${course.price}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Card Footer - Updated Button Style */}
                    <div className="p-6 text-center border-t border-gray-100">
                      <Link 
                        href={`/courses/${slug}/${course.slug}`}
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No courses available in this category</p>
                  <Link href="/courses" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                    View All Courses
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Requirements Note (if courses are available) */}
          {!categoryData.has_subcategories && courses.length > 0 && (
            <div className="mt-12 text-center border-t border-gray-200 pt-8">
              <p className="text-gray-600 max-w-3xl mx-auto">
                Students enrolling in any of these packages must have a learner's permit and submit proof 
                that they have successfully completed a Driver's Education class, either in high school 
                or at a private driving school.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CSS for animation - only applied on client side */}
      <style jsx global>{`
        .course-card {
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}