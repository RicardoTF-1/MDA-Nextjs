// app/ubicaciones/page.js
import { fetchLocations } from '/lib/api'
import Link from 'next/link'

export const metadata = {
  title: 'Ubicaciones | My Drive Academy',
  description: 'Encuentra nuestras ubicaciones en Chicago y sus alrededores para clases de manejo prácticas y teóricas.',
}

export default async function LocationsPage() {
  const locations = await fetchLocations()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestras Ubicaciones</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{location.name}</h2>
              
              <div className="space-y-3 mb-4">
                <p>
                  <span className="font-semibold">Dirección:</span><br />
                  {location.address}<br />
                  {location.city}, {location.state} {location.zip_code}
                </p>
                
                <p>
                  <span className="font-semibold">Teléfono:</span><br />
                  {location.phone}
                </p>
                
                {location.email && (
                  <p>
                    <span className="font-semibold">Email:</span><br />
                    {location.email}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Link
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${location.address}, ${location.city}, ${location.state} ${location.zip_code}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                >
                  Ver en el mapa
                </Link>
                
                <Link
                  href={`/contacto?subject=Consulta+sobre+ubicación+${location.name}`}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}