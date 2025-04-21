// components/adult-program-slider/ProgramTabs.tsx
import React from 'react';
import { 
  Car,
  BookOpen,
  UserPlus,
  Shield,
  Users,
  Truck,
  Award,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

// Define allowed tab types
export type ProgramTabType = 
  | 'adult-programs'
  | 'permit-prep'
  | 'teen-programs'
  | 'defensive-courses'
  | 'chauffeur-programs'
  | 'class-c-programs'
  | 'advanced-programs'
  | 'instructor-program';

// Define individual tab item structure
export interface ProgramTabItem {
  id: ProgramTabType;
  label: string;
  icon: React.ElementType;
}

// Define props for the ProgramTabs component
export interface ProgramTabsProps {
  activeTab: ProgramTabType;
  onTabChange: (tabId: ProgramTabType) => void;
}

const programTabs: ProgramTabItem[] = [
  {
    id: 'adult-programs',
    label: 'Adult Programs',
    icon: Car
  },
  {
    id: 'permit-prep',
    label: 'Permit Prep',
    icon: BookOpen
  },
  {
    id: 'teen-programs',
    label: 'Teen Programs',
    icon: UserPlus
  },
  {
    id: 'defensive-courses',
    label: 'Defensive Courses',
    icon: Shield
  },
  {
    id: 'chauffeur-programs',
    label: 'Chauffeur Programs',
    icon: Users
  },
  {
    id: 'class-c-programs',
    label: 'Class C Programs',
    icon: Truck
  },
  {
    id: 'advanced-programs',
    label: 'Advanced Programs',
    icon: Award
  },
  {
    id: 'instructor-program',
    label: 'Instructor Program',
    icon: GraduationCap
  }
];

const ProgramTabs: React.FC<ProgramTabsProps> = ({ activeTab, onTabChange }) => {
  // Handle tab click
  const handleTabClick = (tab: ProgramTabType): void => {
    onTabChange(tab);
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Centered tabs container */}
        <div 
          className="flex flex-wrap justify-center"
          role="tablist"
          aria-label="Program categories"
        >
          {programTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                id={`tab-${tab.id}`}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-4 px-4 lg:px-5 text-sm lg:text-base transition-colors focus:outline-none relative ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-gray-300 hover:text-emerald-300'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                aria-selected={isActive}
                role="tab"
              >
                <div className="flex items-center justify-center">
                  <Icon 
                    size={18} 
                    className={`${isActive ? 'text-emerald-400' : 'text-gray-400'} mr-2`} 
                  />
                  <span>{tab.label}</span>
                </div>
                
                {/* Active indicator - underline */}
                {isActive && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500"
                    layoutId="active-indicator"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgramTabs;