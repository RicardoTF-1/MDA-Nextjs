"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchCourseCategories } from '/lib/api';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCourseCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading course categories:', err);
        setError('Could not load course categories');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  // Animation effect - simplified to ensure cards are always visible
  useEffect(() => {
    // Only run animation if categories have loaded
    if (categories.length > 0 && !isLoading) {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 150); // Stagger the animations
      });
    }
  }, [categories, isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        <p className="mt-2 text-gray-500">Loading services...</p>
      </div>;
    }

    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }

    if (categories.length === 0) {
      return <div className="text-center text-gray-500">No services available</div>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/courses/${category.slug}`}
            className="service-card block opacity-0 transform translate-y-8 transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 p-6 rounded-lg group bg-white"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon at the top */}
              <div className="text-gray-700 mb-4 w-12 h-12 flex items-center justify-center">
                <span dangerouslySetInnerHTML={{ __html: category.icon_svg }} />
              </div>
              
              {/* Green separator line */}
              <div className="w-16 h-1 bg-green-500 mb-4 transition-all duration-300 group-hover:w-20"></div>
              
              {/* Title */}
              <h3 className="text-gray-800 font-bold text-lg mb-2">{category.name}</h3>
              
              {/* Description (if available) */}
              {category.description && (
                <p className="text-gray-600 text-sm">{category.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of driving education services to bring your
            driving skills to life, from initial concept to final implementation and beyond.
          </p>
        </div>
        
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
      
      {/* CSS for the animation */}
      <style jsx global>{`
        .service-card.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}