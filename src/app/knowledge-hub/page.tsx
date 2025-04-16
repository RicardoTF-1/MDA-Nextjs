'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

// Add TypeScript interfaces
interface Category {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  category_name: string | null;
  author_name: string | null;
  published_date: string | null;
  featured_image_url: string | null;
  is_featured?: boolean;
}

interface CategoryChipProps {
  name: string;
  isActive: boolean;
  onClick: (name: string) => void;
}

interface FeaturedPostProps {
  post: BlogPost | null;
}

interface BlogPostCardProps {
  post: BlogPost;
}

// Category chip component
const CategoryChip: React.FC<CategoryChipProps> = ({ name, isActive, onClick }) => {
  return (
    <motion.button
      onClick={() => onClick(name)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 mr-2 mb-2 ${
        isActive 
          ? 'bg-emerald-600 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-200'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {name}
    </motion.button>
  );
};

// Featured post component
const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  if (!post) return null;
  
  return (
    <motion.div 
      ref={ref}
      className="relative bg-blue-800 rounded-xl overflow-hidden mb-12"
      variants={fadeInVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="absolute inset-0 opacity-80">
        <div className="relative w-full h-full">
          <Image
            src={post.featured_image_url || '/images/placeholder-article.jpg'}
            alt={post.title}
            className="object-cover"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col items-start">
        <motion.span 
          className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {post.category_name || 'Featured'}
        </motion.span>
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {post.title}
        </motion.h1>
        <motion.p 
          className="text-white/80 text-lg mb-6 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {post.excerpt || ''}
        </motion.p>
        <div className="flex items-center mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-white/70 text-sm">
              {post.published_date ? new Date(post.published_date).toLocaleDateString() : ''}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link 
            href={`/knowledge-hub/blog/${post.slug}`}
            className="bg-emerald-600 text-gray-100 hover:bg-emerald-800 hover:text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300"
          >
            <motion.span 
              whileHover={{ x: 5 }} 
              className="inline-block"
            >
              Read Article
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Blog post card component
const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-52 overflow-hidden">
        <div className="relative w-full h-full">
          <Image 
            src={post.featured_image_url || '/images/placeholder-article.jpg'} 
            alt={post.title}
            className="object-cover transition-transform duration-500 hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {post.category_name && (
          <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
            {post.category_name}
          </span>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt || ''}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {post.published_date ? new Date(post.published_date).toLocaleDateString() : ''}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Newsletter subscription component
const NewsletterSubscribe: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  return (
    <motion.div 
      ref={ref}
      className="bg-gray-800 rounded-lg p-8 mt-12"
      variants={fadeInVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h3 
        className="text-2xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ delay: 0.2 }}
      >
        Stay Updated
      </motion.h3>
      <motion.p 
        className="text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        Get the latest driving tips and resources delivered to your inbox.
      </motion.p>
      
      <motion.form 
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4 }}
      >
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <motion.button 
          type="submit" 
          className="bg-emerald-600 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-bold transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Subscribe
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

// Main blog page component
export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Reference for blog posts grid for scroll animations
  const [postsRef, postsInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Fetch posts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await axios.get(`${API_URL}/blog-categories/`);
        const categoriesData = categoriesResponse.data;
        setCategories([{ id: 0, name: 'All', slug: 'all' }, ...categoriesData]);
        
        // Fetch posts
        const postsResponse = await axios.get(`${API_URL}/blog-posts/`);
        const postsData = postsResponse.data;
        setPosts(postsData);
        
        // Default to showing all posts
        setFilteredPosts(postsData);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter posts by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category_name === selectedCategory);
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  // Get featured post (first post or first featured post)
  const featuredPost = posts.find(post => post.is_featured) || posts[0];
  
  // Remove featured post from filtered posts for All category
  const displayPosts = selectedCategory === 'All' && featuredPost
    ? filteredPosts.filter(post => post.id !== featuredPost.id)
    : filteredPosts;

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pb-16 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-80 bg-gray-200 rounded-xl mb-12 animate-pulse"></div>
          <div className="h-8 bg-gray-200 w-64 rounded mb-4 animate-pulse"></div>
          <div className="flex flex-wrap gap-2 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p>{error}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero section with featured post */}
      <div className="bg-gray-50 pt-8 px-4">
        <div className="max-w-7xl mx-auto">
          {featuredPost && <FeaturedPost post={featuredPost} />}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Category filters */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex flex-wrap">
            {categories.map(category => (
              <CategoryChip 
                key={category.id} 
                name={category.name} 
                isActive={selectedCategory === category.name}
                onClick={setSelectedCategory}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Blog posts grid */}
        <div ref={postsRef}>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={postsInView ? "visible" : "hidden"}
          >
            {displayPosts.map(post => (
              <Link href={`/knowledge-hub/blog/${post.slug}`} key={post.id} className="block h-full">
                <BlogPostCard post={post} />
              </Link>
            ))}
          </motion.div>
        </div>
        
        {/* Empty state */}
        {displayPosts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium text-gray-800 mb-2">No posts found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </motion.div>
        )}
        
        {/* Newsletter subscription */}
        <NewsletterSubscribe />
      </div>
    </div>
  );
}