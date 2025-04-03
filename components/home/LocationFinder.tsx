// components/home/LocationFinder.jsx
'use client'

import { useState, useEffect } from 'react'
import { fetchLocations } from '/lib/api'

export default function LocationFinder() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch locations from API
  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true)
        const data = await fetchLocations()
        setLocations(data)
      } catch (err) {
        console.error('Error loading locations:', err)
        setError('No se pudieron cargar las ubicaciones')
        // Use sample data if API call fails
        setLocations([
          {
            id: 1,
            name: "Oficina de Ashland",
            address: "1325 N Ashland Ave",
            city: "Chicago",
            state: "Illinois",
            zip_code: "60647",
            phone: "(773) 555-1234"
          },
          {
            id: 2,
            name: "Pequeño pueblo",
            address: "3547 W 26th St",
            city: "Chicago",
            state: "Illinois",
            zip_code: "60623",
            phone: "(773) 555-5678"
          },
          {
            id: 3,
            name: "Oficina de Naperville",
            address: "1320 N Ruta 59 #120",
            city: "Naperville",
            state: "Illinois",
            zip_code: "60563",
            phone: "(630) 555-9012"
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    
    loadLocations()
  }, [])

  if (loading) {
    return <div className="text-center p-4">Cargando ubicaciones...</div>
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Encuentra una ubicación cerca de ti</h2>
        
        {error && (
          <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            <p>Nota: {error}</p>
            <p>Mostrando datos de ejemplo.</p>
          </div>
        )}

        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y">
              {locations.map((location) => (
                <div key={location.id} className="p-4">
                  <h3 className="font-bold text-lg">{location.name}</h3>
                  <p className="text-gray-600">{location.address}</p>
                  <p className="text-gray-600">{location.city}, {location.state} {location.zip_code}</p>
                  <p className="text-gray-600 mt-2">{location.phone}</p>
                  
                  <div className="mt-3">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${location.name} ${location.address}, ${location.city}, ${location.state} ${location.zip_code}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition inline-block"
                    >
                      Ir a la ubicación
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-lg">Mapa no disponible en este momento</p>
          <p className="text-gray-600">Por favor utiliza los enlaces "Ir a la ubicación" para ver la ubicación en Google Maps.</p>
        </div>
      </div>
    </div>
  )
}