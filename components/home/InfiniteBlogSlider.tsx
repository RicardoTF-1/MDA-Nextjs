'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BlogCard = ({ post, index, isVisible }) => {
  return (
    <div 
      className={`flex-shrink-0 w-72 md:w-80 mx-3 transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`} 
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Link 
        href={`/knowledge-hub/blog/${post.slug}`} 
        className="block h-full transition-transform duration-300 ease-out hover:-translate-y-2.5"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <Image 
              src={post.featured_image_url || '/images/placeholder-article.jpg'} 
              alt={post.title}
              fill
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            {post.category_name && (
              <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                {post.category_name}
              </span>
            )}
          </div>
          
          <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt || ''}</p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xs text-gray-700">{post.author_name || 'My Drive Academy'}</span>
              <span className="text-xs text-gray-500">
                {post.published_date ? new Date(post.published_date).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const InfiniteBlogSlider = ({ posts = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const extendedPosts = [...posts, ...posts, ...posts];

  // Always call hooks at top level — no conditional returns before this
  useEffect(() => {
    const refCopy = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (refCopy) observer.observe(refCopy);
    return () => {
      if (refCopy) observer.unobserve(refCopy);
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!isVisible || !slider) return;

    let animationId: number;
    let lastTimestamp = 0;
    const speed = 0.05;

    const scrollSlider = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setScrollPosition((prev) => {
        const width = posts.length * (window.innerWidth > 768 ? 320 : 288);
        return prev + speed * elapsed >= width ? 0 : prev + speed * elapsed;
      });

      animationId = requestAnimationFrame(scrollSlider);
    };

    animationId = requestAnimationFrame(scrollSlider);

    const pauseScroll = () => cancelAnimationFrame(animationId);
    const resumeScroll = () => {
      lastTimestamp = 0;
      animationId = requestAnimationFrame(scrollSlider);
    };

    slider.addEventListener('mouseenter', pauseScroll);
    slider.addEventListener('mouseleave', resumeScroll);

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener('mouseenter', pauseScroll);
      slider.removeEventListener('mouseleave', resumeScroll);
    };
  }, [isVisible, posts.length]);

  return (
    <div className="w-full bg-gray-50 py-16 px-4" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold text-gray-800 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Knowledge Hub
          </h2>
          <p className={`text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Expert articles, tips and resources for new and experienced drivers
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex overflow-visible py-4"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {extendedPosts.map((post, index) => (
              <BlogCard 
                key={`${post.slug}-${index}`} 
                post={post} 
                index={index % posts.length} 
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/knowledge-hub" 
            className={`inline-flex items-center text-green-600 hover:text-gray-600 font-medium transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '50ms' }}
          >
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfiniteBlogSlider;

