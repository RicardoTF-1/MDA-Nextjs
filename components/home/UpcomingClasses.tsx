'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { fetchLocations, fetchCourseLocationsWithSchedules } from '/lib/api'
import { motion } from 'framer-motion'

// Interfaces basadas en los modelos actualizados
interface ClassSchedule {
  id: number;
  date: string;
  time: string;
  is_full: boolean;
  spots_left?: number;
}

interface Course {
  id: number;
  title: string;
  slug: string;
  category_name?: string;
  subcategory_name?: string;
}

interface Location {
  id: number;
  name: string;
  city: string;
  state: string;
  address: string;
  zip_code: string;
  phone: string;
}

interface CourseLocation {
  id: number;
  course_title: string;
  location_name: string;
  schedule_date?: string;
  schedule_time?: string;
  schedule_is_full?: boolean;
  schedule_spots_left?: number;
  is_available: boolean;
  price?: number;
  registration_link: string;
}

export default function UpcomingClasses(): JSX.Element {
  // Estados
  const [locations, setLocations] = useState<Location[]>([]);
  const [courseLocations, setCourseLocations] = useState<Map<number, CourseLocation[]>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
  const [debug, setDebug] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Activate animation when section is at least 10% visible
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset state when out of view to repeat animation on next scroll
          setIsVisible(false);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% visibility
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Cargar datos
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        setDebug('Iniciando carga de datos...');
        
        // Paso 1: Obtener todas las ubicaciones
        const locationsData = await fetchLocations();
        console.log('Locations Data:', locationsData);
        setDebug(prev => prev + '\nLocaciones cargadas: ' + locationsData.length);
        
        if (!Array.isArray(locationsData) || locationsData.length === 0) {
          setError('No se encontraron ubicaciones');
          setLoading(false);
          return;
        }
        
        // Guardar las ubicaciones y establecer la primera como activa
        setLocations(locationsData);
        if (locationsData.length > 0) {
          setActiveLocationId(locationsData[0].id);
        }
        
        // Paso 2: Cargar CourseLocations con sus Schedules para cada ubicación
        const courseLocationsMap = new Map<number, CourseLocation[]>();
        
        for (const location of locationsData) {
          try {
            // Obtener CourseLocations para esta ubicación con sus schedules
            const locationCourseLocations = await fetchCourseLocationsWithSchedules({
              locationId: location.id,
              withSchedule: true
            });
            
            console.log(`CourseLocations para ${location.name}:`, locationCourseLocations);
            setDebug(prev => prev + `\nCourseLocations para ${location.name}: ${locationCourseLocations.length}`);
            
            // Guardar en el mapa
            courseLocationsMap.set(location.id, locationCourseLocations);
          } catch (err) {
            console.error(`Error cargando CourseLocations para ${location.name}:`, err);
            setDebug(prev => prev + `\nError cargando CourseLocations para ${location.name}`);
            courseLocationsMap.set(location.id, []);
          }
        }
        
        setCourseLocations(courseLocationsMap);
        
      } catch (err) {
        console.error('Error general cargando datos:', err);
        setError('No se pudieron cargar los horarios de clases');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Cambiar ubicación activa
  const handleLocationChange = (locationId: number): void => {
    setActiveLocationId(locationId);
  };

  // Formatear fecha para mostrar
  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { 
        month: 'long',
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Formatear hora para mostrar en formato AM/PM
  const formatTime = (timeStr?: string): string => {
    if (!timeStr) return '';
    
    try {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes || '00'} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
  };

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
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="p-4 text-center" ref={sectionRef}>
        <motion.div 
          className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500 mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Cargando horarios...
        </motion.span>
      </div>
    );
  }
  
  // Estado de error
  if (error) {
    return (
      <motion.div 
        className="p-4 text-center text-red-500" 
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );
  }
  
  // No hay ubicaciones disponibles
  if (!Array.isArray(locations) || locations.length === 0) {
    return (
      <motion.div 
        className="p-4 text-center" 
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No hay horarios de clases disponibles actualmente.
      </motion.div>
    );
  }

  // Obtener la ubicación activa
  const activeLocation = locations.find(loc => loc.id === activeLocationId) || locations[0];
  const activeCourseLocations = courseLocations.get(activeLocation.id) || [];
  
  return (
    <div className="py-8 px-4 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Badge y título */}
        <motion.div 
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div 
            className="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-2"
            variants={titleVariants}
          >
            Class Schedule
          </motion.div>
          <motion.h2 
            className="text-3xl text-gray-700 font-bold"
            variants={titleVariants}
          >
            Upcoming Classes
          </motion.h2>
          <motion.p 
            className="mt-2 text-gray-600"
            variants={titleVariants}
          >
            Find classes at our locations across Chicago that fit your schedule.
          </motion.p>
        </motion.div>
        
        <motion.h3 
          className="text-xl font-bold text-gray-700 mb-4"
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          UPCOMING CLASS SCHEDULES
        </motion.h3>
        
        {/* Pestañas de ubicaciones */}
        <motion.div 
          className="mb-4"
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="flex rounded-lg overflow-hidden">
            {locations.map((location, index) => (
              <motion.button 
                key={location.id} 
                className={`py-2 px-6 text-center text-sm transition-colors duration-200 flex-1 ${
                  activeLocationId === location.id 
                    ? 'bg-emerald-500 text-white font-medium' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleLocationChange(location.id)}
                variants={titleVariants}
                custom={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {location.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Información de la ubicación */}
        <motion.div 
          className="bg-gray-100 rounded-lg p-4 mb-6"
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="flex items-center text-gray-700">
            <div className="text-emerald-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">
                {activeLocation.address}, {activeLocation.city}, {activeLocation.state} {activeLocation.zip_code}
              </p>
              <p className="text-gray-500">
                {activeLocation.phone}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Lista de clases */}
        {activeCourseLocations.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {activeCourseLocations.map((courseLocation, index) => (
              <motion.div 
                key={courseLocation.id} 
                className="border-b py-6"
                variants={cardVariants}
                custom={index}
                whileHover={{ y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">
                      {courseLocation.course_title}
                    </h4>
                    {courseLocation.schedule_date && courseLocation.schedule_time && (
                      <div className="flex items-center mt-1 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                        </svg>
                        <span className="mr-2">{formatDate(courseLocation.schedule_date)}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 ml-2 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatTime(courseLocation.schedule_time)} - 6:00 PM</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-3 sm:mt-0">
                    {courseLocation.schedule_spots_left !== undefined && (
                      <span className="text-gray-600 mr-4">
                        {courseLocation.schedule_spots_left} spots left
                      </span>
                    )}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={courseLocation.registration_link || "/contact"}
                        className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Register Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="p-8 text-center text-gray-500 bg-gray-50 rounded-lg"
            variants={titleVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            There are no classes scheduled for this location.
          </motion.div>
        )}
        
        {/* Botón para ver todas las clases */}
        <motion.div 
          className="mt-8 text-center"
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/courses"
              className="inline-block bg-emerald-500 text-white hover:bg-emerald-700 hover:text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              View All Classes
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Información de debugging - solo visible en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-xs">
          <h4 className="font-bold mb-2">Debug Info:</h4>
          <p>Active Location: {activeLocation?.name}</p>
          <p>Active CourseLocations: {activeCourseLocations.length}</p>
          <details>
            <summary className="cursor-pointer text-blue-500">Location Details</summary>
            <pre className="mt-2 p-2 bg-gray-200 overflow-auto max-h-40 rounded">
              {JSON.stringify(activeLocation, null, 2)}
            </pre>
          </details>
          <details>
            <summary className="cursor-pointer text-blue-500 mt-2">CourseLocation Details</summary>
            <pre className="mt-2 p-2 bg-gray-200 overflow-auto max-h-40 rounded">
              {JSON.stringify(activeCourseLocations, null, 2)}
            </pre>
          </details>
          <details>
            <summary className="cursor-pointer text-blue-500 mt-2">Debug Log</summary>
            <pre className="mt-2 p-2 bg-gray-200 overflow-auto max-h-40 rounded">
              {debug}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}