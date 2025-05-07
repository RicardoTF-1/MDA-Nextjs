"use client";

import React, { useRef, useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
import PermitPrepCard from '../cards/PermitPrepCard';

// Animation variants
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
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, when: "afterChildren" }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: {
    opacity: 0, y: -10,
    transition: { duration: 0.3 }
  }
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const PermitPrepContent: React.FC = () => {
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
      className="py-12 px-4 bg-white h-[680px]"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div className="max-w-6xl mx-auto" variants={containerVariants}>
        <motion.h1 className="text-4xl font-bold text-black mb-8" variants={itemVariants}>
          Permit Prep
        </motion.h1>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={cardsContainerVariants}>
          <motion.div variants={cardVariants}>
            <PermitPrepCard
              title="Expert Driver Package"
              subtitle="Permit Prep + 2 Hours Behind-the-Wheel + Road Test"
              points={[
                "Designed for individuals who are non-U.S. citizens, non-permanent residents, and do not have a Social Security Number.",
                "This package includes permit exam preparation, state-mandated behind-the-wheel instruction, and a streamlined path to obtaining a valid Illinois driver's license.",
                "Available in English or Spanish"
              ]}
              buttonText="Select your Location"
              icon={<BookOpen />}
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <PermitPrepCard
              title="Permit Preparation"
              quote="Pass your written test with ease—prepare, practice, succeed."
              points={[
                "Designed to help you master the rules of the road and pass your permit exam with confidence.",
                "Expert guidance on Illinois traffic laws and road signs",
                "Flexible Learning Options: In-person, or Online",
                "Available in English or Spanish"
              ]}
              buttonText="Select your Location"
              icon={<BookOpen />}
            />
          </motion.div>

          <motion.div variants={cardVariants}>
            <PermitPrepCard
              title="Adult Driver's Education"
              quote="Your road to a license starts here—learn the rules, drive with confidence."
              points={[
                "For adults (18-20) required to complete Driver's Education before getting a license.",
                "This course covers Illinois traffic laws, safe driving techniques, and road sign recognition to prepare you for responsible driving.",
                "Flexible learning: In-person or Online",
                "Available in English or Spanish"
              ]}
              buttonText="Select your Location"
              icon={<BookOpen />}
            />
          </motion.div>
        </motion.div>

        <motion.div className="flex justify-between items-start mt-8" variants={itemVariants}>
          <motion.div className="text-sm text-gray-700 max-w-3xl" variants={itemVariants}>
            <motion.p className="mb-2" variants={itemVariants}>
              ***All packages include the use of our modern, comfortable vehicle for your test.
            </motion.p>
            <motion.p variants={itemVariants}>
              ***For Road Test, students must meet the instructor at the designated DMV location.
            </motion.p>
          </motion.div>

          <motion.div className="text-right" variants={itemVariants}>
            <motion.p className="text-xl font-bold mb-2" variants={itemVariants}>
              See All Programs
            </motion.p>
            <motion.div className="flex justify-end" variants={itemVariants}>
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="mb-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5
                }}
              >
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="black" />
              </motion.svg>
            </motion.div>
            <motion.a
              href="/adult-programs"
              className="text-gray-800 text-lg font-medium hover:underline"
              whileHover={{ scale: 1.05, color: "#10b981" }}
              transition={{ duration: 0.2 }}
            >
              Adult Programs
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PermitPrepContent;

