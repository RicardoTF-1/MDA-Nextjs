// components/adult-program-slider/common/SlideNavigation.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SlideNavigationProps } from '../types';

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onSelect
}) => {
  return (
    <>
      {/* Previous button */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={onPrevious}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
      </div>
      
      {/* Next button */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <button 
          onClick={onNext}
          className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 focus:outline-none hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>
      </div>
      
      {/* Slide indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
              index === currentSlide ? 'bg-emerald-500 w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </>
  );
};

export default SlideNavigation;