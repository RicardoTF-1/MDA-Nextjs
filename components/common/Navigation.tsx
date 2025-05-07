// components/common/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  mobile: boolean;
}

export default function Navigation({ mobile }: NavigationProps) {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Knowledge Hub', href: '/knowledge-hub' },
    { name: 'Locations', href: '/locations' },
    { name: 'Contact', href: '/contact' },
  ]
  
  const containerClass = mobile 
    ? 'flex flex-col space-y-2'
    : 'flex space-x-6'
    
  const linkClass = (href: string): string => {
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



