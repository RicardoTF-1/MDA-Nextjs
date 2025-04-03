"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchBanners } from '/lib/api';

export default function BannerSlider() {
  const [bannerSlides, setBannerSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const slideInterval = useRef(null);
  
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
  
  const goToSlide = (index) => {
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

  if (isLoading) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 w-full flex items-center justify-center">
        <div className="text-gray-500">Loading banners...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 w-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (bannerSlides.length === 0) {
    return (
      <div className="relative h-[300px] md:h-[400px] bg-gray-200 w-full flex items-center justify-center">
        <div className="text-gray-500">No banner images available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px]">
      {/* Slides */}
      {bannerSlides.map((slide, index) => {
        // Get the full image URL
        const imageUrl = slide.image_url || 
                        (slide.image && slide.image.startsWith('http') ? slide.image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000'}${slide.image}`);
        
        return (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out
              ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          >
            {/* Background image */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <img 
                src={imageUrl}
                alt={slide.title || `Slide ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            
            {/* Content overlay */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 2,
              display: 'flex',
              alignItems: 'center'
            }}>
              <div className="container mx-auto px-6 md:px-12">
                <div className="md:w-1/2 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                  <p className="mb-6 md:text-lg">{slide.description}</p>
                  {slide.button_text && slide.button_link && (
                    <Link 
                      href={slide.button_link} 
                      className={`inline-block px-6 py-3 rounded-full text-white transition ${slide.button_color || 'bg-green-500 hover:bg-green-600'}`}
                    >
                      {slide.button_text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full focus:outline-none"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slide indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all focus:outline-none
              ${index === currentSlide ? 'bg-green-500 w-6' : 'bg-white/50 hover:bg-white'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}