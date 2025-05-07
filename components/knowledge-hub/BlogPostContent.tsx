"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Define interface for blog post data
interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  published_date?: string;
  featured_image_url?: string;
  category_name?: string;
  category_slug?: string;
  reading_time?: string | number;
  // Add any other fields that might be used
}

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
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
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };
  // Debug outputs to help troubleshoot
  console.log("Post data received:", post);
  console.log("Content type:", typeof post.content);
  
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
              {post.category_name || "Uncategorized"}
            </span>
          </div>
          <div>{formattedDate}</div>
          {post.reading_time && (
            <div className="ml-4">
              {post.reading_time} min read
            </div>
          )}
        </div>
        
        <h1 className="text-3xl text-gray-700 md:text-4xl font-bold mb-6">{post.title}</h1>
        
        {/* Article Content */}
        <div className="prose prose-lg text-gray-700 max-w-none">
          {/* Check if content exists and is a string before rendering */}
          {post.content ? (
            <div dangerouslySetInnerHTML={createMarkup(post.content)} />
          ) : (
            <div className="text-gray-500">
              <p>Content unavailable. This article may be under construction.</p>
            </div>
          )}
        </div>
        
        {/* Tags or Categories */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Category:</span>
            <a 
              href={`/knowledge-hub?category=${post.category_slug || ""}`}
              className="text-sm bg-green-200 hover:bg-green-300 text-green-800 px-3 py-1 rounded-full"
            >
              {post.category_name || "Uncategorized"}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}



