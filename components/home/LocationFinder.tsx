'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchLocations } from '/lib/api';

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  image?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
  email?: string;
}

// Simple Location Card Component
const LocationCard = ({ location, isActive, onClick }: { 
  location: Location;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`
        flex-shrink-0 w-72 mx-3 bg-white rounded-lg border border-gray-200 overflow-hidden 
        shadow-sm hover:shadow-md
        ${isActive ? 'ring-2 ring-emerald-500' : ''}
      `}
      onClick={onClick}
    >
      {location.image_url && (
        <div className="p-4">
          <div 
            className="h-40 bg-center bg-cover rounded-md"
            style={{ backgroundImage: `url(${location.image_url})` }}
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm">{location.name}</h3>
        <address className="text-gray-600 text-xs mt-2 not-italic">
          <div>{location.address}</div>
          <div>{location.city}, {location.state} {location.zip_code}</div>
          <div className="mt-1">{location.phone}</div>
          {location.email && <div className="mt-1">{location.email}</div>}
        </address>
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${location.address}, ${location.city}, ${location.state} ${location.zip_code}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-1 px-3 rounded transition-colors"
        >
          Get directions
        </a>
      </div>
    </div>
  );
};

export default function LocationFinder(): JSX.Element {
  // State declarations
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [position, setPosition] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Refs
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Filter locations by search query
  const filteredLocations = locations.filter(location => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      location.name.toLowerCase().includes(searchLower) ||
      location.city.toLowerCase().includes(searchLower) ||
      location.state.toLowerCase().includes(searchLower) ||
      location.zip_code.toLowerCase().includes(searchLower)
    );
  });
  
  // Duplicate locations for slider effect (but only if more than one)
  const displayLocations = filteredLocations.length > 1 
    ? [...filteredLocations, ...filteredLocations] 
    : filteredLocations;
  
  // 1. Fetch locations from API
  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        const data = await fetchLocations();
        setLocations(data);
        if (data.length > 0) {
          setActiveLocation(data[0].id);
        }
      } catch (err) {
        console.error('Error loading locations:', err);
        setError('Could not load locations');
        // Sample data for fallback
        const sampleData: Location[] = [
          {
            id: 1,
            name: "Ashland Office",
            address: "1325 N Ashland Ave",
            city: "Chicago",
            state: "Illinois",
            zip_code: "60647",
            phone: "(630) 760-2255",
            email: "support@mydriveacademy.com",
            image_url: "/images/locations/ashland-office.jpg"
          },
          {
            id: 2,
            name: "Little Village",
            address: "3547 W 26th St",
            city: "Chicago",
            state: "Illinois",
            zip_code: "60623",
            phone: "(630) 760-2255",
            email: "support@mydriveacademy.com",
            image_url: "/images/locations/little-village.jpg"
          },
          {
            id: 3,
            name: "Naperville Office",
            address: "1320 N Route 59 #120",
            city: "Naperville",
            state: "Illinois",
            zip_code: "60563",
            phone: "(630) 760-2255",
            email: "support@mydriveacademy.com",
            image_url: "/images/locations/naperville.jpg"
          },
          {
            id: 4,
            name: "Worth Office",
            address: "11015 S. Harlem Ave., Unit G",
            city: "Worth",
            state: "Illinois",
            zip_code: "60482",
            phone: "(630) 760-2255",
            email: "support@mydriveacademy.com",
            image_url: "/images/locations/worth-office.jpg"
          },
          {
            id: 5,
            name: "Northside Classroom",
            address: "4020 W Glenlake Ave",
            city: "Chicago",
            state: "Illinois",
            zip_code: "60646",
            phone: "(630) 760-2255",
            email: "support@mydriveacademy.com",
            image_url: "/images/locations/northside-classroom.jpg"
          }
        ];
        setLocations(sampleData);
        if (sampleData.length > 0) {
          setActiveLocation(sampleData[0].id);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadLocations();
  }, []);

  // 2. Setup slider animation
  useEffect(() => {
    // Reset position and clear any existing interval when filtered results change
    setPosition(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Don't animate if paused or if only one result
    if (isPaused || filteredLocations.length <= 1) return;
    
    // Calculate the total width of all cards
    const cardWidth = 288; // card width (272) + margin (16)
    const totalWidth = filteredLocations.length * cardWidth;
    
    // Start the interval for smooth scrolling
    intervalRef.current = setInterval(() => {
      setPosition(prev => {
        // Move by small increments for smooth animation
        const newPos = prev + 1;
        
        // Reset when we reach the end of the first set of cards
        if (newPos >= totalWidth) {
          return 0;
        }
        return newPos;
      });
    }, 20); // Update every 20ms for smooth animation
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [filteredLocations.length, isPaused]);
  
  // 3. Handle hover events for pausing/resuming the slider
  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (!sliderElement) return;
    
    const handleMouseEnter = () => {
      setIsPaused(true);
    };
    
    const handleMouseLeave = () => {
      setIsPaused(false);
    };
    
    sliderElement.addEventListener('mouseenter', handleMouseEnter);
    sliderElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      sliderElement.removeEventListener('mouseenter', handleMouseEnter);
      sliderElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl text-gray-700 font-bold text-center mb-6">
          Find a location near you
        </h2>
        
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm">
            <p className="text-yellow-700">{error}</p>
            <p className="text-yellow-700">Showing sample data.</p>
          </div>
        )}
        
        {/* Search input */}
        <div className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search locations..."
              className="w-full px-4 py-2 text-emerald-600 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg 
                className="h-4 w-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Location cards slider */}
          {filteredLocations.length > 0 ? (
            <div className="relative overflow-hidden py-4">
              {/* Simplified slider container */}
              <div 
                ref={sliderRef}
                className="flex"
                style={{ transform: `translateX(-${position}px)` }}
              >
                {displayLocations.map((location, index) => (
                  <LocationCard
                    key={`${location.id}-${index}`}
                    location={location}
                    isActive={location.id === activeLocation}
                    onClick={() => setActiveLocation(location.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No locations found matching your search</p>
            </div>
          )}

          {/* Simplified Embedded Google Map (using iframe instead of JS API) */}
          <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            {activeLocation ? (
              <iframe
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodeURIComponent(
                  // Find the active location and build the address string
                  (() => {
                    const location = locations.find(loc => loc.id === activeLocation);
                    return location 
                      ? `${location.address}, ${location.city}, ${location.state} ${location.zip_code}`
                      : 'Chicago, IL';
                  })()
                )}`}
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                <div className="text-center p-6">
                  <p>Select a location to view on map</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}