'use client';

import { useState, useEffect } from 'react';
import { fetchCarLessons } from '/lib/api';
import LocationFinder from '/components/courses/LocationFinder';
import CategoryTabs from '/components/courses/CategoryTabs';
import SubcategoryTabs from '/components/courses/SubcategoryTabs';
import SubcategorySection from '/components/courses/SubcategorySection';

export default function InCarLessonsPage() {
  const [carLessonsData, setCarLessonsData] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
    
    // Scroll to content section
    const contentSection = document.getElementById('subcategory-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const PageContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      );
    }

    if (error || !carLessonsData) {
      return (
        <div className="text-center py-16">
          <div className="text-red-500 mb-4">{error || "No car lessons data available"}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <>
        <SubcategoryTabs 
          subcategories={carLessonsData.subcategories} 
          activeSubcategoryId={activeSubcategory?.id}
          onSubcategoryChange={handleSubcategoryChange}
        />

        <div id="subcategory-content">
          {activeSubcategory ? (
            <SubcategorySection subcategory={activeSubcategory} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Please select a category to view available courses</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Banner/Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">In-Car Lessons</h1>
        </div>
      </div>

      {/* Location Finder Section */}
      <LocationFinder />

      {/* Main Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Main Category Tabs */}
          <CategoryTabs activeCategory="in-car-lessons" />
          
          {/* Subcategory Content */}
          <PageContent />
        </div>
      </section>
    </div>
  );
}