'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchCourseCategory } from '@/lib/api';
import Link from 'next/link';

// Interfaces
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

// Subcategory Tabs
interface SubcategoryTabsProps {
  subcategories: Subcategory[];
  activeSubcategoryId: number | undefined;
  onSubcategoryChange: (subcategory: Subcategory) => void;
}

const SubcategoryTabs: React.FC<SubcategoryTabsProps> = ({
  subcategories,
  activeSubcategoryId,
  onSubcategoryChange
}) => (
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

// Course Card
interface CourseCardProps {
  course: Course;
  delay: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, delay }) => (
  <div
    className="course-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 opacity-0 transform ease-out"
    style={{
      transitionDelay: `${delay * 100}ms`,
      animation: 'fadeInUp 0.6s ease-out forwards',
      animationDelay: `${delay * 100}ms`
    }}
  >
    <div
      className={`${
        course.header_color === 'warning'
          ? 'bg-yellow-500 text-gray-800'
          : course.header_color === 'primary'
          ? 'bg-blue-600 text-white'
          : course.header_color === 'success'
          ? 'bg-emerald-600 text-white'
          : 'bg-gray-800 text-white'
      } p-4 rounded-t-lg relative`}
    >
      <h3 className="text-lg font-bold">{course.title}</h3>
      {course.subtitle && <p className="text-xs mt-1 opacity-90">{course.subtitle}</p>}
      {course.has_free_pickup && (
        <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">
          <span className={course.header_color === 'warning' ? 'text-emerald-800' : 'text-white'}>
            Free Pickup
          </span>
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
    <div className="p-4">
      <ul className="space-y-2">
        {course.bullet_point_list?.map((point, idx) => (
          <li key={idx} className="flex items-start">
            <svg className="h-4 w-4 text-emerald-600 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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

// Subcategory Section
interface SubcategorySectionProps {
  subcategory: Subcategory;
}

const SubcategorySection: React.FC<SubcategorySectionProps> = ({ subcategory }) => (
  <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
    <div className="lg:w-1/3 px-4">
      <div className="sticky top-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{subcategory.name}</h2>
        {subcategory.description && <p className="text-gray-700 mb-6">{subcategory.description}</p>}
      </div>
    </div>
    <div className="lg:w-2/3 px-4">
      <div className="max-h-[700px] overflow-y-auto pr-4 custom-scrollbar rounded-lg">
        <div className="space-y-6">
          {subcategory.courses?.length ? (
            subcategory.courses.map((course, index) => (
              <CourseCard key={course.id} course={course} delay={index} />
            ))
          ) : (
            <p className="text-center py-12 text-gray-500">No courses available in this subcategory</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Main Page
export default function CourseCategoryPage(): React.ReactElement {
  const { slug } = useParams() as { slug: string };
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await fetchCourseCategory(slug);
        setBackendAvailable(true);
      } catch {
        setBackendAvailable(false);
      }
    };
    checkConnection();
  }, [slug]);

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCourseCategory(slug);
        setCategoryData(data);

        if (data.has_subcategories && data.subcategories.length > 0) {
          setActiveSubcategory(data.subcategories[0]);
          setCourses(data.subcategories[0].courses || []);
        } else {
          setCourses(data.direct_courses || []);
        }
      } catch {
        setError('Could not load category data');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) loadCategoryData();
  }, [slug]);

  const handleSubcategoryChange = (subcategory: Subcategory) => {
    setActiveSubcategory(subcategory);
    setCourses(subcategory.courses || []);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-emerald-600 rounded-full mb-4" />
          <p className="text-gray-600">Loading course information...</p>
        </div>
      </div>
    );
  }

  if (error && !categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-gray-600 mb-4">Course category not found</p>
        <Link href="/courses" className="text-emerald-600 hover:text-emerald-700 font-medium">
          View All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {!backendAvailable && (
        <div className="bg-yellow-100 border-b border-yellow-200 p-2 text-center text-yellow-800 text-sm">
          Running in offline mode with mock data. Some features may be limited.
        </div>
      )}

      <div
        className="relative py-16"
        style={{
          backgroundImage: activeSubcategory?.image_url
            ? `url(${activeSubcategory.image_url})`
            : 'linear-gradient(to right, #059669, #10b981)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-white text-center drop-shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold">{categoryData.name}</h1>
          {activeSubcategory && <h2 className="text-xl md:text-2xl font-semibold mt-2">{activeSubcategory.name}</h2>}
          {categoryData.description && <p className="mt-4 max-w-2xl mx-auto">{categoryData.description}</p>}
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {categoryData.has_subcategories ? (
            <>
              <SubcategoryTabs
                subcategories={categoryData.subcategories}
                activeSubcategoryId={activeSubcategory?.id}
                onSubcategoryChange={handleSubcategoryChange}
              />
              {activeSubcategory && <SubcategorySection subcategory={activeSubcategory} />}
            </>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
              <div className="lg:w-1/3 px-4 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{categoryData.name}</h2>
                {categoryData.description && <p className="text-gray-700 mb-6">{categoryData.description}</p>}
              </div>
              <div className="lg:w-2/3 px-4">
                <div className="max-h-[700px] overflow-y-auto pr-4 custom-scrollbar rounded-lg">
                  <div className="space-y-6">
                    {courses.length > 0 ? (
                      courses.map((course, index) => (
                        <CourseCard key={course.id} course={course} delay={index} />
                      ))
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        No courses available in this category
                        <Link href="/courses" className="block mt-4 text-emerald-600 hover:text-emerald-700 font-medium">
                          View All Courses
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!categoryData.has_subcategories && courses.length > 0 && (
            <div className="mt-12 text-center border-t border-gray-200 pt-8">
              <p className="text-gray-600 max-w-3xl mx-auto">
                Students enrolling in any of these packages must have a learner&apos;s permit and submit proof that
                they have successfully completed a Driver&apos;s Education class, either in high school or at a private
                driving school.
              </p>
            </div>
          )}
        </div>
      </section>

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
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
}

