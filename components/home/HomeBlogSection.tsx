'use client';

import { useState, useEffect, useRef } from 'react';
import InfiniteBlogSlider from './InfiniteBlogSlider';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image_url?: string;
  published_date?: string;
  category_name?: string;
  author_name?: string;
}

const HomeBlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate animation when section is at least 10% visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset state when out of view to repeat animation on next scroll
          setIsVisible(false);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% visibility
      }
    );
    
    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        
        // Try to fetch featured posts first
        let posts: BlogPost[] = [];
        try {
          const featuredResponse = await axios.get(`${API_URL}/blog-posts/featured/`);
          posts = featuredResponse.data;
        } catch (error) {
          console.log('No featured posts available, trying recent posts');
          
          // If featured fails, try recent posts
          try {
            const recentResponse = await axios.get(`${API_URL}/blog-posts/recent/`);
            posts = recentResponse.data;
          } catch (error) {
            console.log('No recent posts available, trying all posts');
            
            // If recent fails, try all posts
            const allResponse = await axios.get(`${API_URL}/blog-posts/`);
            posts = allResponse.data;
          }
        }
        
        // If we have posts, use them
        if (posts && posts.length > 0) {
          setBlogPosts(posts.slice(0, 6)); // Limit to 6 posts for the slider
        } else {
          // Otherwise use placeholder posts (defined at the bottom of the file)
          setBlogPosts(placeholderPosts);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
        setBlogPosts(placeholderPosts); // Use placeholders on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-16 px-4 text-center" ref={sectionRef}>
        <motion.div 
          className="animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-8 bg-gray-200 max-w-md mx-auto rounded mb-4"></div>
          <div className="h-4 bg-gray-200 max-w-sm mx-auto rounded mb-12"></div>
          <div className="flex justify-center gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-72 h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <motion.div 
        className="w-full bg-gray-50 py-16 px-4 text-center text-red-500"
        ref={sectionRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        <InfiniteBlogSlider posts={blogPosts} />
      </motion.div>
    </div>
  );
};

// Placeholder posts in case the API fails
const placeholderPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Tips for Driving in Chicago",
    slug: "10-tips-for-driving-in-chicago",
    excerpt: "Essential tips for safely navigating Chicago streets and highways.",
    featured_image_url: "/images/placeholder-article.jpg",
    published_date: new Date().toISOString(),
    category_name: "Driving Tips",
    author_name: "My Drive Academy"
  },
  {
    id: 2,
    title: "How to Obtain Your Driver's License in 2024",
    slug: "how-to-obtain-drivers-license-2024",
    excerpt: "A complete guide to getting your license this year.",
    featured_image_url: "/images/placeholder-article.jpg",
    published_date: new Date().toISOString(),
    category_name: "Driver's Education",
    author_name: "My Drive Academy"
  },
  {
    id: 3,
    title: "Why is Driving School Important?",
    slug: "why-driving-school-important",
    excerpt: "Discover the benefits of professional driving instruction.",
    featured_image_url: "/images/placeholder-article.jpg",
    published_date: new Date().toISOString(),
    category_name: "Driver's Education",
    author_name: "My Drive Academy"
  },
  {
    id: 4,
    title: "International Drivers: Getting Licensed in Illinois",
    slug: "international-drivers-illinois-license",
    excerpt: "Your guide to obtaining a driver's license in Illinois as an international resident.",
    featured_image_url: "/images/placeholder-article.jpg",
    published_date: new Date().toISOString(),
    category_name: "International Drivers",
    author_name: "My Drive Academy"
  }
];

export default HomeBlogSection;