// components/adult-program-slider/common/LocationDropdown.tsx
import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

interface LocationOption {
  label: string;
  value: string;
  href: string;
}

interface LocationDropdownProps {
  title?: string;
  subtitle?: string;
  locations?: LocationOption[];
}

/**
 * Location dropdown component for selecting program locations
 * Can be used on program slides to select Chicago or Suburb locations
 */
const LocationDropdown: React.FC<LocationDropdownProps> = ({
  title = "Select your Location",
  subtitle = "DSS Page with Price",
  locations = [
    { label: "CHICAGO", value: "chicago", href: "/chicago" },
    { label: "SUBURB", value: "suburb", href: "/suburb" }
  ]
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 rounded-xl p-6 mb-8">
      <div className="mb-4 md:mb-0 md:mr-8">
        <div className="font-bold text-lg mb-2">{title}</div>
        <ArrowDown size={24} className="mx-auto" />
        <div className="flex justify-center gap-4 mt-2">
          {locations.map((location) => (
            <a 
              key={location.value}
              href={location.href} 
              className="bg-emerald-500 text-white rounded-lg px-6 py-2 font-medium shadow-md hover:bg-emerald-600 hover:shadow-lg transition-all"
            >
              {location.label}
            </a>
          ))}
        </div>
      </div>
      {subtitle && (
        <div className="text-center">
          <div className="text-lg font-bold text-gray-700 mb-2">{subtitle}</div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;