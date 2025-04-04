'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchSiteSettings } from '../../lib/api'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [siteSettings, setSiteSettings] = useState({
    site_name: 'My Drive Academy',
    logo_url: null
  })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const data = await fetchSiteSettings()
        setSiteSettings(data)
      } catch (error) {
        console.error('Error loading site settings:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadSiteSettings()
  }, [])
  
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {siteSettings.logo_url ? (
              <div className="h-17">
                <img 
                  src={siteSettings.logo_url} 
                  alt={siteSettings.site_name} 
                  className="h-full w-auto"
                />
              </div>
            ) : (
              <span className="text-white text-2xl font-bold flex items-center">
                <svg className="w-8 h-8 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                </svg>
                {siteSettings.site_name}
              </span>
            )}
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6">
              <Link href="/" className="py-2 text-white hover:text-green-400 transition">
                COURSES
              </Link>
              <Link href="/locations" className="py-2 text-white hover:text-green-400 transition">
                LOCATIONS
              </Link>
              <Link href="/knowledge-hub" className="py-2 text-white hover:text-green-400 transition">
                KNOWLEDGE HUB
              </Link>
              <Link href="/about" className="py-2 text-white hover:text-green-400 transition">
                ABOUT
              </Link>
            </nav>
            
            <div className="flex space-x-2 items-center">
              <button className="text-white p-2 rounded-full hover:bg-white/10 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </button>
              <Link href="/contact" className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
                Contact Us
              </Link>
            </div>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 bg-opacity-90 rounded p-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="py-2 text-white hover:text-green-400 transition">
                COURSES
              </Link>
              <Link href="/locations" className="py-2 text-white hover:text-green-400 transition">
                LOCATIONS
              </Link>
              <Link href="/knowledge-hub" className="py-2 text-white hover:text-green-400 transition">
                KNOWLEDGE HUB
              </Link>
              <Link href="/about" className="py-2 text-white hover:text-green-400 transition">
                ABOUT
              </Link>
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <Link href="/contact" className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition text-center">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}