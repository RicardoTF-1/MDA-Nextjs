// components/home/UpcomingClasses.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchLocations } from '/lib/api'  // Keep the same import path as Slider

export default function UpcomingClasses() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadLocations = async () => {
                // Inside the loadLocations function in UpcomingClasses.tsx
        try {
            setLoading(true);
            const data = await fetchLocations('with_schedules');
            console.log('API Response:', data);
            setLocations(data);
        } catch (err) {
            console.error('Error loading locations with schedules:', err);
            setError('No se pudieron cargar los horarios de clases');
        } finally {
            setLoading(false);
        }
    }
    
    loadLocations()
  }, [])
  
  if (loading) {
    return <div className="p-4 text-center">Cargando horarios...</div>
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }
  
  // Filter locations to only include those with schedules
  const locationsWithSchedules = locations.filter(loc => loc.schedules && loc.schedules.length > 0)
  
  if (locationsWithSchedules.length === 0) {
    return <div className="p-4 text-center">No hay horarios de clases disponibles actualmente.</div>
  }
  
  return (
    <div className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 30 Hours Header */}
        <div className="bg-green-400 text-white text-center p-6 rounded-lg mb-8">
          <h2 className="font-bold text-3xl md:text-4xl">
            30 HORAS DE EDUCACIÓN<br />
            PARA CONDUCTORES<br />
            ADOLESCENTES
          </h2>
        </div>
        
        {/* Course Description */}
        <div className="mb-8">
          <p className="text-xl font-bold text-center md:text-left">
            Curso todo en uno para que los nuevos conductores adolescentes cumplan con los requisitos estatales y obtengan la licencia.
          </p>
        </div>
        
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            HORARIOS DE CLASES PRÓXIMOS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Schedule List Column */}
            <div className="space-y-6">
              {locationsWithSchedules.map(location => (
                <div key={location.id}>
                  <div className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg uppercase">
                    {location.name}
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    {location.schedules.map(schedule => (
                      <div 
                        key={schedule.id} 
                        className="bg-gray-200 py-2 px-4 rounded-lg text-center"
                      >
                        {schedule.formatted_date}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Location Cards Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {locationsWithSchedules.map(location => (
                <div key={location.id} className="rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48">
                    <div
                      style={{
                        backgroundImage: `url(${location.image_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                      }}
                    ></div>
                    <div 
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <h3 className="text-white text-2xl font-bold">{location.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white text-center">
                    <Link
                      href="/contacto"
                      className="inline-block bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition"
                    >
                      Regístrate Ahora
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}