// components/courses/CourseList.js
'use client'

import { useState, useEffect } from 'react'
import { fetchCourses } from '/lib/api'
import CourseCard from './CourseCard'

export default function CourseList({ categorySlug }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true)
        const params = categorySlug ? { category: categorySlug } : {}
        const data = await fetchCourses(params)
        setCourses(data)
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