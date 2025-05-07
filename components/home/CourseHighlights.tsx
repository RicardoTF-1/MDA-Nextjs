// components/home/CourseHighlights.tsx
'use client'

import { useState, useEffect } from 'react'
import { fetchCourse } from '@/lib/api'  // Fixed import path and function name
import CourseCard from '@/components/courses/CourseCard'  // Fixed import path
import Link from 'next/link'

// Define interfaces for course data
interface Course {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  category_name?: string;
  price: number;
  discounted_price?: number;
  slug: string;
}

export default function CourseHighlights() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadFeaturedCourses = async () => {
      try {
        setLoading(true)
        // Using fetchCourse which is available in your API
        const data = await fetchCourse({ featured: true })
        // Handle the possibility that data might be a single course or an array
        const courseArray = Array.isArray(data) ? data : [data].filter(Boolean)
        setFeaturedCourses(courseArray)
      } catch (error) {
        console.error('Error loading featured courses:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFeaturedCourses()
  }, [])
  
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nuestros Cursos Destacados</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Diseñados para desarrollar confianza y habilidades de manejo seguro en conductores de todas las edades.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center">Cargando cursos...</div>
        ) : featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center">No hay cursos destacados disponibles en este momento.</div>
        )}
        
        <div className="text-center mt-12">
          <Link
            href="/cursos"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            Ver todos los cursos
          </Link>
        </div>
      </div>
    </div>
  )
}



