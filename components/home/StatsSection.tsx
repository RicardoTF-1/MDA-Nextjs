"use client"

// components/home/StatsSection.js
import { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    value: 99,
    suffix: '%',
    text: 'Pass rate for our students on their road test'
  },
  {
    value: 15,
    suffix: '+',
    text: 'Years of experience from our instructors'
  },
  {
    value: 15,
    suffix: '+',
    text: 'Courses for all ages, both in the classroom and in the car'
  },
  {
    value: 4,
    suffix: '+',
    text: 'Locations'
  }
];

const AnimatedCounter = ({ value, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(countRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrameId;

    const startCount = 0;
    const endCount = value;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (endCount - startCount) + startCount));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, isVisible]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

export default function StatsSection() {
  return (
    <div className="bg-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-blue-600 mb-3">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                />
              </div>
              <p className="text-gray-700">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}