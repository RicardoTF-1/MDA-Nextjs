// components/common/Navigation.js
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation({ mobile }) {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Centro de Conocimiento', href: '/centro-de-conocimiento' },
    { name: 'Ubicaciones', href: '/ubicaciones' },
    { name: 'Contacto', href: '/contacto' },
  ]
  
  const containerClass = mobile 
    ? 'flex flex-col space-y-2'
    : 'flex space-x-6'
    
  const linkClass = (href) => {
    const baseClass = 'py-2 transition hover:text-blue-600'
    const activeClass = pathname === href ? 'font-semibold text-blue-600' : ''
    return `${baseClass} ${activeClass}`
  }
  
  return (
    <nav className={containerClass}>
      {navItems.map((item) => (
        <Link 
          key={item.name}
          href={item.href}
          className={linkClass(item.href)}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}