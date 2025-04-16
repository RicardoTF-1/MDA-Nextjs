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
import { ProgramTabsProps, ProgramTabItem, ProgramTabType } from './types';

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
  const handleTabClick = (tab: ProgramTabType): void => {
    onTabChange(tab);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-start">
          {programTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-4 px-3 md:px-4 font-medium text-sm md:text-lg border-b-2 transition-colors flex items-center ${
                  activeTab === tab.id 
                    ? 'border-emerald-500 text-emerald-400' 
                    : 'border-transparent hover:text-emerald-400'
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <Icon size={18} className="mr-1 hidden md:inline" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default ProgramTabs;