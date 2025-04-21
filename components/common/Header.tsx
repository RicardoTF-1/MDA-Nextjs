'use client'

import { useState, useEffect, MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { fetchSiteSettings } from '../../lib/api'

// Define interfaces for our data types
interface SiteSettings {
  site_name: string;
  logo_url: string | null;
}

const Header = (): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    site_name: 'My Drive Academy',
    logo_url: null
  })
  const [loading, setLoading] = useState<boolean>(true)
  const pathname = usePathname()
  const router = useRouter()
  
  // Effect to load site settings
  useEffect(() => {
    const loadSiteSettings = async (): Promise<void> => {
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

  // Effect for handling scroll
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Effect to close menu when pathname changes (page navigation)
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])
  
  // Determine if we're on the home page
  const isHomePage = pathname === '/'
  
  // Determine if we're on the knowledge-hub page
  const isKnowledgeHub = pathname === '/knowledge-hub'
  
  // Dynamic header classes
  const headerClass = `${isHomePage ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 transition-all ${
    isScrolled || isKnowledgeHub ? 'bg-black/30 backdrop-blur-s' : 'bg-transparent'
  }`
  
  // Apply global style to adjust top margin only on home page
  useEffect(() => {
    // Only affects elements within main layout, not the header
    if (isHomePage) {
      document.body.style.paddingTop = '0px';
    } else {
      document.body.style.paddingTop = '0px'; // Reset padding on other pages
    }
    
    return () => {
      document.body.style.paddingTop = '0px'; // Clean up on unmount
    }
  }, [isHomePage]);
  
  // Handler for scrolling to a section
  const scrollToSection = (sectionId: string) => (e: MouseEvent<HTMLAnchorElement>): void => {
    // Only handle this specially on home page
    if (isHomePage) {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If section not found yet (might still be loading), scroll after a small delay
        setTimeout(() => {
          const delayedSection = document.getElementById(sectionId);
          if (delayedSection) {
            delayedSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
    // On other pages, let the link work normally
  };
  
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle menu links with closure
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4">
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
                <svg className="w-8 h-8 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                </svg>
                {siteSettings.site_name}
              </span>
            )}
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6">
              {/* Changed: Link now scrolls to adult-programs-section on homepage */}
              <a 
                href={isHomePage ? "#adult-programs-section" : "/courses"} 
                onClick={scrollToSection("adult-programs-section")}
                className="py-2 text-white hover:text-emerald-600 transition cursor-pointer"
              >
                COURSES
              </a>
              <Link href="/locations" className="py-2 text-white hover:text-emerald-600 transition">
                LOCATIONS
              </Link>
              <Link href="/knowledge-hub" className="py-2 text-white hover:text-emerald-600 transition">
                KNOWLEDGE HUB
              </Link>
              <Link href="/about" className="py-2 text-white hover:text-emerald-600 transition">
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
              <Link href="/contact" className="px-6 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-800 transition">
                Contact Us
              </Link>
            </div>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
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
              {/* Mobile menu link also updated */}
              <a 
                href={isHomePage ? "#adult-programs-section" : "/courses"} 
                onClick={(e) => {
                  scrollToSection("adult-programs-section")(e);
                  setIsMenuOpen(false); // Close menu after clicking
                }}
                className="py-2 text-white hover:text-emerald-600 transition"
               onClick={handleNavLinkClick}>
                COURSES
              </a>
              <Link href="/locations" className="py-2 text-white hover:text-emerald-600 transition" onClick={handleNavLinkClick}>
                LOCATIONS
              </Link>
              <Link href="/knowledge-hub" className="py-2 text-white hover:text-emerald-600 transition" onClick={handleNavLinkClick}>
                KNOWLEDGE HUB
              </Link>
              <Link href="/about" className="py-2 text-white hover:text-emerald-600 transition" onClick={handleNavLinkClick}>
                ABOUT
              </Link>
            </nav>
            <div className="flex flex-col space-y-2 mt-4">
              <Link href="/contact" className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition text-center" onClick={handleNavLinkClick}>
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header;
