// components/adult-program-slider/common/SlideContainer.tsx
import React from 'react';
import { SlideContainerProps } from '../types';
import SlideNavigation from './SlideNavigation';

/**
 * Wrapper component that handles the slide container and navigation
 * for all program types
 */
const SlideContainer: React.FC<SlideContainerProps> = ({
  slides,
  currentSlide,
  setCurrentSlide
}) => {
  const nextSlide = (): void => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = (): void => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="py-12 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-50 rounded-full opacity-30"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-50 rounded-full opacity-30"></div>
      
      {/* Slide navigation buttons and indicators */}
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onSelect={goToSlide}
      />
      
      {/* Current slide content */}
      <div className="transition-all duration-500 ease-in-out">
        {slides[currentSlide].content}
      </div>
    </div>
  );
};

export default SlideContainer;