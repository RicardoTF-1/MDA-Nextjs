// app/courses/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCourseCategories } from '@/lib/api';

// Define interfaces for our data types
interface CourseCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon_svg: string | null;
  icon_html: string | null;
  order: number;
}

interface CourseCategoryCardProps {
  title: string;
  description: string;
  link: string;
  iconSvg: string | null;
}

// CourseCard component with proper typing
const CourseCard: React.FC<CourseCategoryCardProps> = ({ 
  title, 
  description, 
  link, 
  iconSvg 
}) => {
  return (
    <Link href={link} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-emerald-600">
          {iconSvg ? (
            <div dangerouslySetInnerHTML={{ __html: iconSvg }} />
          ) : (
            // Fallback icon if no SVG is provided
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-emerald-500 font-medium">
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
};

// Loading component to show while fetching data
const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-12 w-2/3 mx-auto mb-12 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="w-12 h-12 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Error component to show if data fetching fails
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="text-center py-10">
      <div className="text-red-500 text-2xl mb-4">Error Loading Courses</div>
      <p className="text-gray-600">{message}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

// Main component
export default function CoursesPage(): JSX.Element {
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await fetchCourseCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Failed to load course categories. Please try again later.');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <ErrorDisplay message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl text-gray-700 font-bold text-center mb-12">Our Courses</h1>
        
        {categories.length === 0 ? (
          <p className="text-center text-gray-600">No course categories available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 text-gray-700 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <CourseCard
                key={category.id}
                title={category.name}
                description={category.description || 'Learn more about this course category.'}
                link={`/courses/${category.slug}`}
                iconSvg={category.icon_svg}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}