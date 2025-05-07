// components/courses/CourseList.tsx
'use client'
import { useState, useEffect } from 'react'
import { fetchCourse } from '@/lib/api'
import CourseCard from './CourseCard'

// Define the interface for a course
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

// Define the interface for component props
interface CourseListProps {
  categorySlug?: string;
}

export default function CourseList({ categorySlug }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true)
        const params = categorySlug ? { category: categorySlug } : {}
        
        // Based on the error messages, you only have fetchCourse available
        // If it returns a list when no specific course is requested:
        const data = await fetchCourse(params)
        
        // Handle the case where data might be a single course or an array
        const courseArray = Array.isArray(data) ? data : [data].filter(Boolean)
        setCourses(courseArray)
      } catch (err) {
        setError('Error cargando los cursos. Por favor intente nuevamente.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    loadCourses()
  }, [categorySlug])
  
  if (loading) {
    return <div className="text-center py-8">Cargando cursos...</div>
  }
  
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>
  }
  
  if (courses.length === 0) {
    return <div className="text-center py-8">No se encontraron cursos.</div>
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
