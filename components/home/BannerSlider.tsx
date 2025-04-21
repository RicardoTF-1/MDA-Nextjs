"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchBanners } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerSlide {
  id: number;
  title: string;
  description?: string;
  image?: string;
  image_url?: string;
  button_text?: string;
  button_link?: string;
  button_color?: string;
  order?: number;
}

export default function BannerSlider() {
  const [bannerSlides, setBannerSlides] = useState<BannerSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  
  // Fetch banner data from API
  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBanners();
        
        // Only update state if we actually got data back
        if (Array.isArray(data) && data.length > 0) {
          setBannerSlides(data);
        } else {
          // Handle empty array as an error case
          console.warn('No banner data returned from API');
          setError('No banner images available');
        }
      } catch (err) {
        console.error('Error loading banners:', err);
        setError('Could not load banner images');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBanners();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (bannerSlides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % bannerSlides.length);
    }, 6000); // Change slide every 6 seconds
    
    slideInterval.current = interval;
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [bannerSlides.length]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    
    // Reset interval timer when manually changing slides
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      const interval = setInterval(() => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % bannerSlides.length);
      }, 6000);
      slideInterval.current = interval;
    }
  };
  
  const goToNextSlide = () => {
    if (bannerSlides.length === 0) return;
    const nextSlide = (currentSlide + 1) % bannerSlides.length;
    goToSlide(nextSlide);
  };
  
  const goToPrevSlide = () => {
    if (bannerSlides.length === 0) return;
    const prevSlide = (currentSlide - 1 + bannerSlides.length) % bannerSlides.length;
    goToSlide(prevSlide);
  };

  // Animation variants for slide transitions
  const slideVariants = {
    enter: { opacity: 0, scale: 1.02 }, // Reduced scale factor to minimize overflow
    center: { 
      opacity: 1, 
      scale: 1,
      transition: {
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        opacity: { duration: 0.3 }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500"
        >
          Loading banners...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  if (bannerSlides.length === 0) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500"
        >
          No banner images available
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden" ref={sliderRef}>
      {/* Slides with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {bannerSlides.map((slide, index) => {
          // Get the full image URL
          const imageUrl = slide.image_url || 
                        (slide.image && slide.image.startsWith('http') ? slide.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000'}${slide.image}`);
          
          return index === currentSlide ? (
            <motion.div
              key={slide.id}
              className="absolute top-0 left-0 w-full h-full"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-1">
                <div className="relative h-full w-full">
                  <Image 
                    src={imageUrl}
                    alt={slide.title || `Slide ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="100vw"
                    priority={index === 0}
                  />
                </div>
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 z-2 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <motion.div 
                    className="md:w-1/2 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p 
                      className="mb-6 md:text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {slide.description}
                    </motion.p>
                    {slide.button_text && slide.button_link && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href={slide.button_link} 
                          className={`inline-block px-6 py-3 rounded-full text-white transition ${slide.button_color || 'bg-green-500 hover:bg-green-600'}`}
                        >
                          {slide.button_text}
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>
      
      {/* Navigation arrows */}
      <motion.button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      {/* Slide indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {bannerSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all focus:outline-none
              ${index === currentSlide ? 'bg-green-500 w-6' : 'bg-white/50 hover:bg-white'}
            `}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          ></motion.button>
        ))}
      </div>
    </div>
  );
}