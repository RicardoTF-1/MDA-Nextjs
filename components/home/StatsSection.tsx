'use client'

import { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    value: 99,
    suffix: '%',
    label: 'Pass rate'
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years experience'
  },
  {
    value: 15,
    suffix: '+',
    label: 'Courses'
  },
  {
    value: 4,
    suffix: '+',
    label: 'Locations'
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6 rounded-lg">
      {statsData.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-white mb-1">
            <AnimatedCounter 
              value={stat.value}
              suffix={stat.suffix}
            />
          </div>
          <p className="text-sm text-gray-200">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}