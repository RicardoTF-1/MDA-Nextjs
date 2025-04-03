"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchServiceCategories } from '/lib/api';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await fetchServiceCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading service categories:', err);
        setError('Could not load service categories');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Select category</h2>
            <p className="text-xl">&amp; begin the road</p>
          </div>
          <div className="flex justify-center">
            <div className="text-gray-500">Loading categories...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Select category</h2>
            <p className="text-xl">&amp; begin the road</p>
          </div>
          <div className="flex justify-center">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Select category</h2>
            <p className="text-xl">&amp; begin the road</p>
          </div>
          <div className="flex justify-center">
            <div className="text-gray-500">No categories available</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Select category</h2>
          <p className="text-xl">&amp; begin the road</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={category.link}
              className="flex items-center gap-4 bg-gray-200 hover:bg-gray-300 rounded-full py-4 px-6 transition-colors duration-300"
            >
              <span className="text-blue-800" dangerouslySetInnerHTML={{ __html: category.icon_svg }} />
              <div>
                <div className="font-bold text-blue-900">{category.title}</div>
                {category.subtitle && (
                  <div className="text-sm text-red-500">{category.subtitle}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}