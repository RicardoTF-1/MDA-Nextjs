"use client";

import React, { useState } from 'react';
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

/**
 * Main DrivingAcademy component that handles tab switching and content rendering
 * Each tab renders a different program type with its own slide navigation
 */
const DrivingAcademy: React.FC<DrivingAcademyProps> = () => {
  // Main state for active tab
  const [activeTab, setActiveTab] = useState<ProgramTabType>('adult-programs');

  // Handler for tab changes
  const handleTabChange = (tab: ProgramTabType): void => {
    setActiveTab(tab);
  };

  // Render the content based on the active tab
  const renderContent = (): JSX.Element => {
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
    <div className="bg-white min-h-screen">
      {/* Navigation tabs */}
      <ProgramTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content area */}
      {renderContent()}
    </div>
  );
};

export default DrivingAcademy;