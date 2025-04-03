// components/home/Slider.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchSliderImages } from '/lib/api'

export default function Slider() {
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
      <div className="relative h-96 bg-gray-200 w-full flex items-center justify-center">
        <div className="text-gray-500">Loading slider...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative h-96 bg-gray-200 w-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="relative h-96 bg-gray-200 w-full flex items-center justify-center">
        <div className="text-gray-500">No slider images available</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[500px]">
      {/* Slides */}
      {images.map((slide, index) => {
        // Get the full image URL
        const imageUrl = slide.image_url || 
                        (slide.image.startsWith('http') ? slide.image : `http://localhost:8000${slide.image}`)
        
        return (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full ${
              index === currentIndex ? 'block' : 'hidden'
            }`}
          >
            {/* Image */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <img 
                src={imageUrl}
                alt={slide.title || `Slide ${index + 1}`}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            
            {/* Overlay content */}
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                  {slide.subtitle && <p className="text-xl mb-8">{slide.subtitle}</p>}
                  {slide.button_text && slide.button_link && (
                    <Link
                      href={slide.button_link}
                      className="px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition inline-block"
                    >
                      {slide.button_text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 focus:outline-none z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 focus:outline-none z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}