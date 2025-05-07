'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchLocations } from '@/lib/api';
import { motion, Variants } from 'framer-motion';

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

const LocationCard = ({
  location,
  isActive,
  onClick,
  variants,
  onMouseEnter,
  onMouseLeave
}: {
  location: Location;
  isActive: boolean;
  onClick: () => void;
  variants: Variants;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <motion.div
      className={`
        flex-shrink-0 w-72 mx-3 bg-white rounded-lg border border-gray-200 overflow-hidden 
        shadow-sm hover:shadow-md cursor-pointer
        ${isActive ? 'ring-2 ring-emerald-500' : ''}
      `}
      onClick={onClick}
      variants={variants}
      whileHover={{
        y: -5,
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
          <div>
            {location.city}, {location.state} {location.zip_code}
          </div>
          <div className="mt-1">{location.phone}</div>
          {location.email && <div className="mt-1">{location.email}</div>}
        </address>
        <motion.a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${location.address}, ${location.city}, ${location.state} ${location.zip_code}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-1 px-3 rounded transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get directions
        </motion.a>
      </div>
    </motion.div>
  );
};

export default function LocationFinder(): React.ReactElement {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [position, setPosition] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  const filteredLocations = locations.filter((location) => {
    if (!searchQuery) return true;
    const s = searchQuery.toLowerCase();
    return (
      location.name.toLowerCase().includes(s) ||
      location.city.toLowerCase().includes(s) ||
      location.state.toLowerCase().includes(s) ||
      location.zip_code.toLowerCase().includes(s)
    );
  });

  const displayLocations =
    filteredLocations.length > 1
      ? [...filteredLocations, ...filteredLocations]
      : filteredLocations;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchLocations();
        setLocations(data);
        if (data.length > 0) setActiveLocation(data[0].id);
      } catch (err) {
        console.error('Error fetching locations:', err); // ✅ ahora se usa
        setError('Could not load locations');
        const fallback: Location[] = [
          {
            id: 1,
            name: 'Ashland Office',
            address: '1325 N Ashland Ave',
            city: 'Chicago',
            state: 'Illinois',
            zip_code: '60647',
            phone: '(630) 760-2255',
            email: 'support@mydriveacademy.com',
            image_url: '/images/locations/ashland-office.jpg'
          },
          {
            id: 2,
            name: 'Little Village',
            address: '3547 W 26th St',
            city: 'Chicago',
            state: 'Illinois',
            zip_code: '60623',
            phone: '(630) 760-2255',
            email: 'support@mydriveacademy.com',
            image_url: '/images/locations/little-village.jpg'
          }
        ];
        setLocations(fallback);
        setActiveLocation(fallback[0].id);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPaused || filteredLocations.length <= 1) return;

    const cardWidth = 288;
    const totalWidth = filteredLocations.length * cardWidth;

    intervalRef.current = setInterval(() => {
      setPosition((prev) => {
        const next = prev + 1;
        return next >= totalWidth ? 0 : next;
      });
    }, 20);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [filteredLocations.length, isPaused]);

  useEffect(() => {
    setPosition(0);
  }, [filteredLocations.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const titleVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  const mapVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.5, ease: 'easeOut' }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center" ref={sectionRef}>
        <motion.div
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="text-2xl text-gray-700 font-bold text-center mb-6"
            variants={titleVariants}
          >
            Find a location near you
          </motion.h2>

          {error && (
            <motion.div
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-sm"
              variants={titleVariants}
            >
              <p className="text-yellow-700">{error}</p>
              <p className="text-yellow-700">Showing sample data.</p>
            </motion.div>
          )}

          <motion.div className="mb-6 max-w-md mx-auto" variants={titleVariants}>
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
          </motion.div>

          <div className="flex flex-col gap-6">
            {filteredLocations.length > 0 ? (
              <motion.div
                className="relative overflow-hidden py-4"
                variants={containerVariants}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
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
                      variants={cardVariants}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-6 bg-white rounded-lg border border-gray-200"
                variants={titleVariants}
              >
                <p className="text-gray-500">
                  No locations found matching your search
                </p>
              </motion.div>
            )}

            <motion.div
              className="h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
              variants={mapVariants}
            >
              <iframe
                src="https://www.google.com/maps/d/embed?mid=12s7xHe8F697wi2Wlm-dyIz9q9lpchY4&ehbc=2E312F"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

