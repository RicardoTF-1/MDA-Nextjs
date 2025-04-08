// app/courses/[slug]/page.js
import { fetchCourseBySlug } from '/lib/api'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const course = await fetchCourseBySlug(params.slug)
  
  return {
    title: `${course.title} | My Drive Academy`,
    description: course.description.substring(0, 160)
  }
}

export default async function CourseDetailPage({ params }) {
  const course = await fetchCourseBySlug(params.slug)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            {course.image ? (
              <Image
                src={`http://localhost:8000${course.image}`}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-full flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6">
            <div className="mb-4">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {course.category_name}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">Duración:</span>
                <span>{course.duration}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold mr-2">Precio:</span>
                {course.discounted_price ? (
                  <div className="flex items-center">
                    <span className="text-gray-400 line-through mr-2">${course.price}</span>
                    <span className="text-blue-600 font-bold">${course.discounted_price}</span>
                  </div>
                ) : (
                  <span className="font-bold">${course.price}</span>
                )}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                href="/contacto?subject=Inscripción+a+curso"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Inscribirme
              </Link>
              
              <Link
                href="/contacto?subject=Información+de+curso"
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
              >
                Solicitar información
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional sections like schedule, requirements, etc. */}
    </div>
  )
}