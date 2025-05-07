"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SlideNavigation from '../common/SlideNavigation';
import TeenProgramCard from '../cards/TeenProgramCard';
import { Car, Shield, Award } from 'lucide-react';

// Define the slides data structure
interface Slide {
  content: React.ReactNode;
}

// Define the teen program slides
const teenSlides: Slide[] = [
  {
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeenProgramCard
          title="Standard Teen Course"
          subtitle="Perfect for new drivers"
          points={[
            "6 hours of classroom instruction",
            "6 hours of behind-the-wheel training",
            "Certificate of completion",
            "Convenient scheduling options"
          ]}
          icon={<Car />}
          threshold={0.1}
          triggerOnce={false}
        />
        <TeenProgramCard
          title="Premium Teen Course"
          subtitle="Our most comprehensive package"
          bestSeller={true}
          points={[
            "10 hours of classroom instruction",
            "8 hours of behind-the-wheel training",
            "Defensive driving techniques",
            "Free road test preparation",
            "Certificate of completion"
          ]}
          icon={<Award />}
          threshold={0.1}
          triggerOnce={false}
        />
        <TeenProgramCard
          title="Defensive Driving Course"
          subtitle="Focus on safety skills"
          points={[
            "4 hours of specialized instruction",
            "Hazard recognition training",
            "Emergency maneuver practice",
            "Reduces insurance premiums",
            "Perfect complement to standard training"
          ]}
          icon={<Shield />}
          threshold={0.1}
          triggerOnce={false}
        />
      </div>
    )
  },
  {
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeenProgramCard
          title="Road Test Preparation"
          subtitle="Get ready for test day"
          points={[
            "4 hours of focused training",
            "Practice on actual test routes",
            "Common mistakes prevention",
            "Mock road test evaluation",
            "Confidence building exercises"
          ]}
          icon={<Car />}
          threshold={0.1}
          triggerOnce={false}
        />
        <TeenProgramCard
          title="Permit Prep Course"
          subtitle="Pass your permit test"
          points={[
            "3 hours of classroom instruction",
            "Practice tests and materials",
            "Rules of the road review",
            "Traffic sign recognition",
            "High success rate"
          ]}
          icon={<Shield />}
          threshold={0.1}
          triggerOnce={false}
        />
        <TeenProgramCard
          title="Parent-Teen Workshop"
          subtitle="Learn together for better results"
          points={[
            "2-hour interactive session",
            "Communication strategies",
            "Supervised practice guidelines",
            "Risk management techniques",
            "Creates a supportive learning environment"
          ]}
          icon={<Award />}
          threshold={0.1}
          triggerOnce={false}
        />
      </div>
    )
  }
];

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
