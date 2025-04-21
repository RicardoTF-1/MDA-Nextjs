'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchCourseCategory, fetchCoursesByCategorySlug } from '@/lib/api'; // Fixed import path with @/
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
  image?: string;
  image_url?: string;
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

interface SubcategoryTabsProps {
  subcategories: Subcategory[];
  activeSubcategoryId: number | undefined;
  onSubcategoryChange: (subcategory: Subcategory) => void;
}

// Helper Components
const SubcategoryTabs: React.FC<SubcategoryTabsProps> = ({ 
  subcategories,
  activeSubcategoryId,
  onSubcategoryChange
}) => {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {subcategories.map((subcategory) => (
        <button
          key={subcategory.id}
          onClick={() => onSubcategoryChange(subcategory)}
          className={`py-3 px-6 rounded-full text-center transition-colors ${
            subcategory.id === activeSubcategoryId
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {subcategory.name}
        </button>
      ))}
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  categorySlug: string;
  delay: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, categorySlug, delay }) => {
  return (
    <div 
      className="course-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 opacity-0 transform ease-out"
      style={{ 
        transitionDelay: `${delay * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        animationDelay: `${delay * 100}ms` 
      }}
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
      } p-4 rounded-t-lg relative`}>
        <h3 className="text-lg font-bold">{course.title}</h3>
        {course.subtitle && <p className="text-xs mt-1 opacity-90">{course.subtitle}</p>}
        {course.has_free_pickup && (
          <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">
            {course.header_color === 'warning' 
              ? <span className="text-emerald-800">Free Pickup</span> 
              : <span className="text-white">Free Pickup</span>}
          </div>
        )}
        {course.is_featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Card Body - Improved Readability */}
      <div className="p-4">
        <ul className="space-y-2">
          {course.bullet_point_list && course.bullet_point_list.map((point, idx) => (
            <li key={idx} className="flex items-start">
              <svg className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        
        {course.price !== undefined && (
          <div className="mt-4 flex justify-center">
            <span className="text-gray-900 font-bold text-xl">${course.price}</span>
          </div>
        )}
      </div>
      
      {/* Card Footer - Updated Button Style */}
      <div className="p-4 text-center border-t border-gray-100">
        <Link 
          href="/contact"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md transition-colors text-sm"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

interface SubcategorySectionProps {
  subcategory: Subcategory;
  categorySlug: string;
}

const SubcategorySection: React.FC<SubcategorySectionProps> = ({ subcategory, categorySlug }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
      {/* Left column with subcategory info */}
      <div className="lg:w-1/3 px-4">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{subcategory.name}</h2>
          {subcategory.description && (
            <div className="text-gray-700 mb-6">
              <p>{subcategory.description}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right column with scrollable courses */}
      <div className="lg:w-2/3 px-4">
        <div className="max-h-[700px] overflow-y-auto pr-4 custom-scrollbar rounded-lg">
          <div className="space-y-6">
            {subcategory.courses && subcategory.courses.length > 0 ? (
              subcategory.courses.map((course, index) => (
                <CourseCard 
                  key={course.id}
                  course={course}
                  categorySlug={categorySlug}
                  delay={index}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No courses available in this subcategory</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CourseCategoryPage(): React.ReactElement {
  const { slug } = useParams() as { slug: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState<boolean>(true);

  // Check backend connection
  useEffect(() => {
    const checkConnection = async (): Promise<void> => {
      try {
        // Use a simple API call to check if backend is available
        await fetchCourseCategory(slug);
        setBackendAvailable(true);
      } catch (error) {
        console.error('Backend connection check failed:', error);
        setBackendAvailable(false);
      }
    };
    checkConnection();
  }, [slug]);

  useEffect(() => {
    const loadCategoryData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        console.log(`Loading category data for slug: ${slug}`);
        const data = await fetchCourseCategory(slug);
        console.log("Category data loaded:", data);
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
      {/* Backend Connection Warning */}
      {!backendAvailable && (
        <div className="bg-yellow-100 border-b border-yellow-200 p-2 text-center text-yellow-800 text-sm">
          <p>Running in offline mode with mock data. Some features may be limited.</p>
        </div>
      )}
      
      {/* Banner/Header with subcategory image background if available */}
      <div 
        className="relative py-16"
        style={{
          backgroundImage: activeSubcategory?.image_url ? `url(${activeSubcategory.image_url})` : 'linear-gradient(to right, #059669, #10b981)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-md">{categoryData.name}</h1>
          {activeSubcategory && (
            <h2 className="text-xl md:text-2xl font-semibold text-white text-center mt-2 drop-shadow-md">
              {activeSubcategory.name}
            </h2>
          )}
          {categoryData.description && (
            <p className="text-white text-center mt-4 max-w-2xl mx-auto drop-shadow-md">
              {categoryData.description}
            </p>
          )}
        </div>
      </div>

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
            // Show direct courses if no subcategories - also using the new layout
            <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
              {/* Left column with category info */}
              <div className="lg:w-1/3 px-4">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{categoryData.name}</h2>
                  {categoryData.description && (
                    <div className="text-gray-700 mb-6">
                      <p>{categoryData.description}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right column with scrollable courses */}
              <div className="lg:w-2/3 px-4">
                <div className="max-h-[700px] overflow-y-auto pr-4 custom-scrollbar rounded-lg">
                  <div className="space-y-6">
                    {courses.length > 0 ? (
                      courses.map((course, index) => (
                        <CourseCard 
                          key={course.id}
                          course={course}
                          categorySlug={slug}
                          delay={index}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No courses available in this category</p>
                        <Link href="/courses" className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                          View All Courses
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Requirements Note (if courses are available) */}
          {!categoryData.has_subcategories && courses.length > 0 && (
            <div className="mt-12 text-center border-t border-gray-200 pt-8">
              <p className="text-gray-600 max-w-3xl mx-auto">
                Students enrolling in any of these packages must have a learner&apos;s permit and submit proof 
                that they have successfully completed a Driver&apos;s Education class, either in high school 
                or at a private driving school.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f3f4f6;
          border-radius: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 8px;
          border: 2px solid #f3f4f6;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }

        /* Rounded corner for scrollbar track */
        .custom-scrollbar::-webkit-scrollbar-corner {
          background-color: transparent;
        }
      `}</style>
    </div>
  );
}