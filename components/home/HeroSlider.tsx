'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchSliderImages } from '../../lib/api'
import StatsSection from './StatsSection'

export default function HeroSlider() {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSliderImages = async () => {
      try {
        setLoading(true)
        const data = await fetchSliderImages()
        setImages(data)
      } catch (err) {
        console.error('Error loading slider images:', err)
        setError('Could not load slider images')
        
      } finally {
        setLoading(false)
      }
    }

    loadSliderImages()
  }, [])

  useEffect(() => {
    if (images.length === 0) return

    // Auto-advance the slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
  }

  if (loading) {
    return (
      <div className="relative h-screen bg-gray-800 w-full flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error && images.length === 0) {
    return (
      <div className="relative h-screen bg-gray-800 w-full flex items-center justify-center">
        <div className="text-white">Error loading slider content</div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="relative h-screen bg-gray-800 w-full flex items-center justify-center">
        <div className="text-white">No slider images available</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen">
      {/* Slides */}
      {images.map((slide, index) => {
        // Get the full image URL
        const imageUrl = slide.image_url || 
                        (slide.image?.startsWith('http') ? slide.image : `http://localhost:8000${slide.image}`)
        
        return (
          <div
            key={slide.id || index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-1000">
              <img 
                src={imageUrl}
                alt={slide.title || `Slide ${index + 1}`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/40"></div>
            </div>
            
            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div 
                  className="max-w-3xl text-white"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    {slide.title || "Master the road. Drive with confidence."}
                  </h1>
                  <p className="text-xl md:text-2xl mb-12 text-gray-200">
                    {slide.subtitle || "We build drivers with an understanding of safety, a focus on skill development, and a commitment to lifelong road excellence."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={slide.button_link || "/contact"}
                      className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition"
                    >
                      {slide.button_text || "Get in Touch"}
                    </Link>
                    <Link
                      href="/courses"
                      className="px-8 py-3 bg-transparent text-white font-semibold rounded-full border border-white hover:bg-white/10 transition"
                    >
                      View Courses
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Stats Section */}
      <motion.div 
        className="absolute bottom-0 right-0 py-8 px-4 md:py-12 md:px-6 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <StatsSection />
      </motion.div>

      {/* Navigation dots */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center space-x-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>
    </div>
  )
}