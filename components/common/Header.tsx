'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="font-bold text-xl text-blue-600">My Drive Academy</div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6">
              <Link href="/" className="py-2 transition hover:text-blue-600">
                Inicio
              </Link>
              <Link href="/cursos" className="py-2 transition hover:text-blue-600">
                Cursos
              </Link>
              <Link href="/knowledge-hub" className="py-2 transition hover:text-blue-600">
                Centro de Conocimiento
              </Link>
              <Link href="/ubicaciones" className="py-2 transition hover:text-blue-600">
                Ubicaciones
              </Link>
              <Link href="/contacto" className="py-2 transition hover:text-blue-600">
                Contacto
              </Link>
            </nav>
            
            <div className="flex space-x-2">
              <Link href="/login" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
                Iniciar Sesión
              </Link>
              <Link href="/contacto" className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
                Contacto
              </Link>
            </div>
          </div>
          
          <button 
            className="md:hidden"
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
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="py-2 transition hover:text-blue-600">
                Inicio
              </Link>
              <Link href="/cursos" className="py-2 transition hover:text-blue-600">
                Cursos
              </Link>
              <Link href="/centro-de-conocimiento" className="py-2 transition hover:text-blue-600">
                Centro de Conocimiento
              </Link>
              <Link href="/ubicaciones" className="py-2 transition hover:text-blue-600">
                Ubicaciones
              </Link>
              <Link href="/contacto" className="py-2 transition hover:text-blue-600">
                Contacto
              </Link>
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <Link href="/login" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-center">
                Iniciar Sesión
              </Link>
              <Link href="/contacto" className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition text-center">
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}