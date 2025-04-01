'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CourseFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    price: searchParams.get('price') || '',
    duration: searchParams.get('duration') || '',
    experience: searchParams.get('experience') || '',
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Build query string from non-empty filters
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })
    
    // Navigate to the same page with updated query parameters
    router.push(`/cursos?${params.toString()}`)
  }
  
  const handleReset = () => {
    setFilters({
      category: '',
      price: '',
      duration: '',
      experience: '',
    })
    
    router.push('/cursos')
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Filtrar Cursos</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Todas las categorías</option>
            <option value="teen">Programa para Adolescentes</option>
            <option value="adult">Programa para Adultos</option>
            <option value="chauffeur">Clases para Choferes</option>
            <option value="exam">Preparación para Examen</option>
            <option value="seminar">Seminarios</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <select
            id="price"
            name="price"
            value={filters.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Cualquier precio</option>
            <option value="free">Gratis</option>
            <option value="under100">Menos de $100</option>
            <option value="100-300">$100 - $300</option>
            <option value="over300">Más de $300</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Duración
          </label>
          <select
            id="duration"
            name="duration"
            value={filters.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Cualquier duración</option>
            <option value="short">Menos de 1 semana</option>
            <option value="medium">1-4 semanas</option>
            <option value="long">Más de 1 mes</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Nivel de experiencia
          </label>
          <select
            id="experience"
            name="experience"
            value={filters.experience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos los niveles</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        
        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Aplicar filtros
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition"
          >
            Restablecer
          </button>
        </div>
      </form>
    </div>
  )
}