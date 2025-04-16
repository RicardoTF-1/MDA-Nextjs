// app/page.js
import Hero from '/components/home/Hero'
import CourseHighlights from '/components/home/CourseHighlights'
import Testimonials from '/components/home/Testimonials'
import LocationMap from '/components/home/LocationMap'
import UpcomingClasses from '../../components/home/UpcomingClasses'
import LocationFinder from '../../components/home/LocationFinder'
import BannerSlider from '../../components/home/BannerSlider'
import StatsSection from '../../components/home/StatsSection'
import CategorySection from '../../components/home/CategorySection'
import HeroSlider from '../../components/home/HeroSlider'
import CourseFinder from '../../components/courses/CourseFinder'
import HomeBlogSection from '../../components/home/HomeBlogSection'
import AdultProgramsSlider from '../../components/home/AdultProgramsSlider' // Add this import
import DrivingAcademy from '../../components/adult-program-slider' // Updated import for new modular component
import VoiceAssistant from '../../components/home/VoiceAssistant'

export default function Home() {
  return (
    <>
      <HeroSlider/> {/*Animated*/}
      <CourseFinder/> {/* Animated and Fixed*/}
      <DrivingAcademy/> {/* Renamed from AdultProgramsSlider to match our new component */}
      {/* <AdultProgramsSlider/>   This is the old code with 1k lines, keeping it just for emergency  */}
      <CategorySection/> {/* Animated */}
      <BannerSlider/> {/* Animated */}
      <CourseFinder/> {/* Animated and Fixed*/}
      {/* <CourseHighlights /> */}
      <UpcomingClasses /> {/* Animated */}
      <LocationFinder /> {/* Animated */}
      <HomeBlogSection/> {/* Animated */}
      <Testimonials /> {/* Animated */}
      {/* <LocationMap /> */}
      <VoiceAssistant /> {/* Animated */}
    </>
  )
}