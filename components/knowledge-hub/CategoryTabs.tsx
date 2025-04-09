"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function CategoryTabs({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  
  const handleCategoryChange = (categorySlug) => {
    const params = new URLSearchParams(searchParams);
    
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-md whitespace-nowrap ${
            currentCategory === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          All Posts
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              currentCategory === category.slug
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {category.name}
            {category.post_count > 0 && (
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-opacity-80 inline-block">
                {category.post_count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}