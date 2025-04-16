'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedPageWrapperProps {
  children: React.ReactNode;
}

export default function AnimatedPageWrapper({ children }: AnimatedPageWrapperProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen pt-8 pb-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Articles
        </motion.h1>
        {children}
      </div>
    </motion.div>
  );
}