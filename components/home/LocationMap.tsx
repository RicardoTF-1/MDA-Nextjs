// components/home/LocationMap.tsx
'use client'
import { useState, useEffect } from 'react'
import { fetchLocations } from '@/lib/api'  // Fixed import path
import Link from 'next/link'

// Define interface for location data
interface Location {
  id: number | string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
}

export default function LocationMap() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true)
        const data = await fetchLocations()
        setLocations(data)
      } catch (error) {
        console.error('Error loading locations:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadLocations()
  }, [])
  
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestras Ubicaciones</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos presentes en múltiples ubicaciones en Chicago y sus alrededores para tu comodidad.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center">Cargando ubicaciones...</div>
        ) : locations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.slice(0, 3).map((location) => (
              <div key={location.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-gray-600 mb-4">
                  {location.address}<br />
                  {location.city}, {location.state} {location.zip_code}
                </p>
                <p className="mb-4">
                  <span className="font-medium">Teléfono:</span> {location.phone}
                </p>
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${location.address}, ${location.city}, ${location.state} ${location.zip_code}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Ver en el mapa →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No hay ubicaciones disponibles en este momento.</div>
        )}
        
        {locations.length > 3 && (
          <div className="text-center mt-8">
            <Link
              href="/ubicaciones"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
            >
              Ver todas las ubicaciones
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}



