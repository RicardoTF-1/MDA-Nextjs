// components/home/Testimonials.js
'use client'

import { useState, useEffect } from 'react'
import { fetchTestimonials } from '/lib/api'
import Image from 'next/image'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true)
        const data = await fetchTestimonials(true) // get featured testimonials
        setTestimonials(data)
      } catch (error) {
        console.error('Error loading testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadTestimonials()
  }, [])
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros estudiantes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Historias de éxito de nuestros estudiantes que aprendieron a conducir con confianza.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center">Cargando testimonios...</div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-100 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  {testimonial.image ? (
                    <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                      <Image
                        src={`http://localhost:8000${testimonial.image}`}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    {testimonial.role && (
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      {i < testimonial.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700">{testimonial.content}</p>
                
                {testimonial.video_url && (
                  <div className="mt-4">
                    <a
                      href={testimonial.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                      Ver video testimonio
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No hay testimonios disponibles en este momento.</div>
        )}
      </div>
    </div>
  )
}