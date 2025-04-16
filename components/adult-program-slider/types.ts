// components/adult-program-slider/types.ts
import { ReactNode, ReactElement } from 'react';
import { LucideIcon } from 'lucide-react';

// Tab types
export type ProgramTabType = 
  | 'adult-programs'
  | 'permit-prep'
  | 'teen-programs'
  | 'defensive-courses'
  | 'chauffeur-programs'
  | 'class-c-programs'
  | 'advanced-programs'
  | 'instructor-program';

export interface ProgramTabItem {
  id: ProgramTabType;
  label: string;
  icon: LucideIcon;
}

export interface ProgramTabsProps {
  activeTab: ProgramTabType;
  onTabChange: (tab: ProgramTabType) => void;
}

// Card types
export interface BaseCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactElement;
}

export interface ProgramCardProps extends BaseCardProps {
  description: string[] | string;
  extraInfo?: string;
  cta?: string;
}

export interface PermitPrepCardProps extends BaseCardProps {
  quote?: string;
  points: string[];
  buttonText?: string;
}

export interface TeenProgramCardProps extends BaseCardProps {
  subtitleColor?: string;
  bestSeller?: boolean;
  points: string[];
  buttonText?: string;
}

export interface DefensiveProgramCardProps extends BaseCardProps {
  price?: string;
  points: string[];
}

export interface AdvancedSkillsCardProps extends BaseCardProps {
  description: string[] | string;
  buttonText?: string;
}

export interface ClassCProgramCardProps extends BaseCardProps {
  price?: string;
  points: string[];
  bestSeller?: boolean;
}

export interface ChauffeurProgramCardProps extends BaseCardProps {
  price?: string;
  points: string[];
}

// Slide types
export interface SlideProps {
  title: string;
  content: ReactNode;
}

export interface SlideContainerProps {
  slides: SlideProps[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
}

// Common component types
export interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export interface BottomLinkProps {
  viewAllLink: string;
  linkText: string;
}

export interface TeenBottomSectionProps {
  redirectText?: string;
  redirectLink?: string;
  mainLinkText?: string;
  mainLink?: string;
}

// Main component type
export interface DrivingAcademyProps {
  // Add any props the main component might need
}