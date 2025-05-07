'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import the BlogPost interface or define it here
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image_url?: string;
  published_date?: string;
  category_name?: string;
  author_name?: string;
}

// Define props interface for the component
interface InfiniteBlogSliderProps {
  posts: BlogPost[];
}

const InfiniteBlogSlider: React.FC<InfiniteBlogSliderProps> = ({ posts }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId: number;
    let lastTime = 0;
    const speed = 0.5; // pixels per millisecond

    const scroll = (timestamp: number) => {
      if (!scrollElement) return;
      
      if (!isHovered && scrollElement) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        scrollElement.scrollLeft += speed * deltaTime;
        
        // Reset scroll position when end is reached to create infinite effect
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
        }
      }
      
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  // Duplicate posts to create infinite scrolling effect
  const extendedPosts = [...posts, ...posts];

  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Tips, stories, and insights to help you become a safer and more confident driver
          </motion.p>
        </div>
        
        <div 
          className="overflow-x-hidden" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            ref={scrollRef}
            className="flex gap-6 pb-4 overflow-x-auto scrollbar-hide"
            style={{ overflowX: 'auto', scrollBehavior: 'smooth' }}
          >
            {extendedPosts.map((post, index) => (
              <div 
                key={`${post.id}-${index}`} 
                className="min-w-[320px] max-w-[320px] bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <div className="relative h-48">
                  {post.featured_image_url ? (
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 h-full flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  {post.category_name && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {post.category_name}
                    </div>
                  )}
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                </div>
                <div className="px-4 pb-4 mt-auto">
                  <Link
                    href={`/knowledge-hub/blog/${post.slug}`}
                    className="text-green-600 font-medium hover:text-green-700 transition-colors inline-flex items-center"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/knowledge-hub/blog"
            className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-medium rounded-full transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfiniteBlogSlider;
