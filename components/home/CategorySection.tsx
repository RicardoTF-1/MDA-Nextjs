"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchCourseCategories } from '@/lib/api';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon_svg?: string;
  order?: number;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  
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

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <motion.div 
            className="inline-block rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.p 
            className="mt-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading services...
          </motion.p>
        </div>
      );
    }

    if (error) {
      return (
        <motion.div 
          className="text-center text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      );
    }

    if (categories.length === 0) {
      return (
        <motion.div 
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No services available
        </motion.div>
      );
    }

    return (
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 m-15"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={cardVariants}
            custom={index}
            whileHover={{ 
              y: -8, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="overflow-hidden"
          >
            <Link
              href={`/courses/${category.slug}`}
              className="block h-full p-6 rounded-lg bg-white"
            >
              <div className="flex flex-col h-full">
                {/* Icon at the top */}
                <motion.div 
                  className="text-gray-700 mb-4 w-12 h-12 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span dangerouslySetInnerHTML={{ __html: category.icon_svg || '' }} />
                </motion.div>
                
                {/* Green separator line */}
                <motion.div 
                  className="w-16 h-1 bg-emerald-500 mb-4"
                  whileHover={{ width: 80 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Title */}
                <motion.h3 
                  className="text-gray-800 font-bold text-lg mb-2"
                  whileHover={{ color: "#10b981" }} // emerald-500
                >
                  {category.name}
                </motion.h3>
                
                {/* Description (if available) */}
                {category.description && (
                  <motion.p 
                    className="text-gray-600 text-sm mt-auto"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {category.description}
                  </motion.p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-2"
            variants={titleVariants}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            We offer a comprehensive range of driving education services to bring your
            driving skills to life, from initial concept to final implementation and beyond.
          </motion.p>
        </motion.div>
        
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}