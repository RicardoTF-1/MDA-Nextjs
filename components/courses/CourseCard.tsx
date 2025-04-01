// components/courses/CourseCard.js
import Link from 'next/link'
import Image from 'next/image'

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 relative">
        {course.image ? (
          <Image
            src={`http://localhost:8000${course.image}`}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 h-full flex items-center justify-center">
            <span className="text-gray-500">No hay imagen disponible</span>
          </div>
        )}
        
        {course.category_name && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {course.category_name}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            {course.discounted_price ? (
              <div className="flex items-center">
                <span className="text-gray-400 line-through text-sm mr-1">${course.price}</span>
                <span className="text-blue-600 font-bold">${course.discounted_price}</span>
              </div>
            ) : (
              <span className="font-bold">${course.price}</span>
            )}
          </div>
          
          <Link 
            href={`/cursos/${course.slug}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
}