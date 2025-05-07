"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const linkVariants: Variants = {
  hover: {
    color: "#10b981",
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const InstructorProgramContent: React.FC = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [observerInitialized, setObserverInitialized] = useState(false);

  useEffect(() => {
    controls.set("hidden");
    setObserverInitialized(true);
  }, [controls]);

  useEffect(() => {
    if (!observerInitialized) return;

    const refCopy = containerRef.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        requestAnimationFrame(() => controls.start("visible"));
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    if (refCopy) observer.observe(refCopy);

    return () => {
      if (refCopy) observer.unobserve(refCopy);
    };
  }, [controls, observerInitialized]);

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-12 h-[680px]"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <motion.h1 className="text-4xl font-bold text-gray-900 mb-4" variants={itemVariants}>
          Instructor Training Program
        </motion.h1>
        <motion.p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed" variants={itemVariants}>
          Become a certified driving instructor in Illinois and share your passion for safe driving!
        </motion.p>
        <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
          At My Drive Academy, our comprehensive Instructor Program equips you with the knowledge and skills to educate and empower new drivers.
        </motion.p>
        <motion.p className="text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4" variants={itemVariants}>
          Join us in shaping the next generation of responsible motorists and build a rewarding career.
        </motion.p>
      </motion.div>

      <motion.p className="mt-6 text-gray-700" variants={itemVariants}>
        Start your journey as a driving instructor today! For more information or to schedule a consultation,
        please contact our instructor training department at{' '}
        <motion.a
          href="mailto:instructors@mydriveacademy.com"
          className="text-emerald-600 hover:underline"
          variants={linkVariants}
          whileHover="hover"
        >
          instructors@mydriveacademy.com
        </motion.a>.
      </motion.p>
    </motion.div>
  );
};

export default InstructorProgramContent;

