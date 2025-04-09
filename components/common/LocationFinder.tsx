'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchLocations } from '/lib/api';

export default function LocationFinder() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchLocations();
        setLocations(data);
      } catch (err) {
        console.error('Error loading locations:', err);
        setError('Could not load locations');
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  return (
    <section className="py-12 bg-emerald-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Find a location near you</h2>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : locations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location) => (
              <div key={location.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-40">
                  {location.image_url ? (
                    <Image
                      src={location.image_url}
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full"></div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold text-center">
                      {location.name}
                      {location.city && <span className="block text-sm font-normal mt-1">{location.city}, {location.state}</span>}
                    </h3>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <Link 
                    href={`/locations/${location.id}`}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                  >
                    Go To Location
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No locations available</div>
        )}
      </div>
    </section>
  );
}