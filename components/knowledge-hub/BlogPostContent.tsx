"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function BlogPostContent({ post }) {
  const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    if (post.published_date) {
      const date = new Date(post.published_date);
      setFormattedDate(date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }));
    }
  }, [post.published_date]);
  
  // Function to create markup from HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };
  
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="relative h-96 w-full">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Article Header */}
      <div className="p-6 md:p-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="mr-4">
            <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1">
              {post.category_name}
            </span>
          </div>
          <div>{formattedDate}</div>
          {post.reading_time && (
            <div className="ml-4">
              {post.reading_time} min read
            </div>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
        
        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={createMarkup(post.content)} />
        </div>
        
        {/* Tags or Categories */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Category:</span>
            <a 
              href={`/knowledge-hub?category=${post.category_slug}`}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
            >
              {post.category_name}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}