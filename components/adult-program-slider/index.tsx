"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { ProgramTabType, DrivingAcademyProps } from './types';
import ProgramTabs from './ProgramTabs';

// Import all slide components
import AdultProgramSlides from './slides/AdultProgramSlides';
import PermitPrepContent from './slides/PermitPrepContent';
import TeenProgramSlides from './slides/TeenProgramSlides';
import DefensiveDrivingSlides from './slides/DefensiveDrivingSlides';
import AdvancedDrivingSlides from './slides/AdvancedDrivingSlides';
import ClassCProgramSlides from './slides/ClassCProgramSlides';
import ChauffeurProgramSlides from './slides/ChauffeurProgramSlides';
import InstructorProgramContent from './slides/InstructorProgramContent';

// Animation variants
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const DrivingAcademy: React.FC<DrivingAcademyProps> = () => {
  const [activeTab, setActiveTab] = useState<ProgramTabType>('adult-programs');
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: ProgramTabType): void => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const currentRef = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const renderContent = (): React.ReactElement => {
    switch (activeTab) {
      case 'adult-programs':
        return <AdultProgramSlides />;
      case 'permit-prep':
        return <PermitPrepContent />;
      case 'teen-programs':
        return <TeenProgramSlides />;
      case 'defensive-courses':
        return <DefensiveDrivingSlides />;
      case 'advanced-programs':
        return <AdvancedDrivingSlides />;
      case 'class-c-programs':
        return <ClassCProgramSlides />;
      case 'chauffeur-programs':
        return <ChauffeurProgramSlides />;
      case 'instructor-program':
        return <InstructorProgramContent />;
      default:
        return <AdultProgramSlides />;
    }
  };

  return (
    <motion.div
      className="bg-white min-h-screen"
      ref={containerRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <ProgramTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DrivingAcademy;

