// components/home/Hero.js
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Aprende a conducir con los mejores
            </h1>
            <p className="text-xl mb-8">
              Ofrecemos cursos personalizados para conductores de todas las edades con instructores certificados y precios competitivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/cursos"
                className="px-6 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-100 transition text-center"
              >
                Ver cursos
              </Link>
              <Link 
                href="/contacto"
                className="px-6 py-3 border-2 border-white text-white font-bold rounded hover:bg-blue-700 transition text-center"
              >
                Contactar
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-blue-600 text-xl font-bold mb-4">
                Encuentra el curso perfecto para ti
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="age" className="block text-gray-700 mb-1">
                    Edad
                  </label>
                  <select 
                    id="age" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Seleccionar edad</option>
                    <option value="teen">15-17 años</option>
                    <option value="young-adult">18-25 años</option>
                    <option value="adult">Más de 25 años</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-gray-700 mb-1">
                    Experiencia de manejo
                  </label>
                  <select 
                    id="experience" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Seleccionar experiencia</option>
                    <option value="none">Sin experiencia</option>
                    <option value="beginner">Principiante</option>
                    <option value="intermediate">Intermedio</option>
                    <option value="advanced">Avanzado</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zipcode" className="block text-gray-700 mb-1">
                    Código postal
                  </label>
                  <input 
                    type="text" 
                    id="zipcode" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Ej. 60601"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Buscar cursos
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}