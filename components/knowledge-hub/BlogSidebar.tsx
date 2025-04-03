"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function BlogSidebar({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    const params = new URLSearchParams();
    params.set('search', searchValue);
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Search Articles</h3>
        <form onSubmit={handleSearch}>
          <div className="flex">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories?.map((category) => (
            <li key={category.id}>
              <Link
                href={`/knowledge-hub/blog?category=${category.slug}`}
                className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span>{category.name}</span>
                {category.post_count > 0 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {category.post_count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Subscribe Box */}
      <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4">
          Subscribe to our newsletter to receive the latest driving tips and resources.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}