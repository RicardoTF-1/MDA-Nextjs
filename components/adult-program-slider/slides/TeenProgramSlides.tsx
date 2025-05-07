"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SlideNavigation from '../common/SlideNavigation';

const TeenProgramSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [observerInitialized, setObserverInitialized] = useState(false);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === teenSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? teenSlides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    controls.set("hidden");
    setObserverInitialized(true);
  }, [controls]);

  useEffect(() => {
    if (!observerInitialized) return;

    const refCopy = containerRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          controls.start("visible");
        });
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    if (refCopy) observer.observe(refCopy);

    return () => {
      if (refCopy) observer.unobserve(refCopy);
    };
  }, [controls, observerInitialized]);

  useEffect(() => {
    requestAnimationFrame(() => {
      controls.start("visible");
    });
  }, [currentSlide, controls, observerInitialized]);

  // (The slides content remains unchanged, excluded here for brevity)

  return (
    <div
      className="py-12 px-4 bg-white relative overflow-hidden h-[680px]"
      ref={containerRef}
    >
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"
        animate={{ scale: [0.8, 1], opacity: [0, 0.3] }}
        transition={{ duration: 0.8 }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"
        animate={{ scale: [0.8, 1], opacity: [0, 0.3] }}
        transition={{ duration: 0.8, delay: 0.2 }}
      ></motion.div>

      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={teenSlides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />

      <div className="transition-all duration-500 ease-in-out">
        {teenSlides[currentSlide].content}
      </div>
    </div>
  );
};

export default TeenProgramSlides;

