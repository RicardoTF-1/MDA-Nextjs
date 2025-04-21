// components/home/Testimonials.js
'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchTestimonials } from '@/lib/api'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  video_url?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  
  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate animation when section is at least 10% visible
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset state when out of view to repeat animation on next scroll
          setIsVisible(false)
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% visibility
      }
    )
    
    const currentRef = sectionRef.current;
    
    if (currentRef) {
      observer.observe(currentRef)
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }
  
  return (
    <div className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            variants={titleVariants}
          >
            Lo que dicen nuestros estudiantes
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Historias de éxito de nuestros estudiantes que aprendieron a conducir con confianza.
          </motion.p>
        </motion.div>
        
        {loading ? (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-block rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <span>Cargando testimonios...</span>
          </motion.div>
        ) : testimonials.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                className="bg-gray-100 p-6 rounded-lg shadow"
                variants={cardVariants}
                custom={index}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="flex items-center mb-4">
                  {testimonial.image ? (
                    <motion.div 
                      className="w-16 h-16 relative rounded-full overflow-hidden mr-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Image
                        src={`http://localhost:8000${testimonial.image}`}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mr-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <span className="text-blue-600 font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </motion.div>
                  )}
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    {testimonial.role && (
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    )}
                  </div>
                </div>
                
                <motion.div 
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-yellow-400"
                      initial={{ opacity: 0, rotate: -30 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                    >
                      {i < testimonial.rating ? '★' : '☆'}
                    </motion.span>
                  ))}
                </motion.div>
                
                <p className="text-gray-700">{testimonial.content}</p>
                
                {testimonial.video_url && (
                  <div className="mt-4">
                    <motion.a
                      href={testimonial.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                      Ver video testimonio
                    </motion.a>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No hay testimonios disponibles en este momento.
          </motion.div>
        )}
      </div>
    </div>
  )
}