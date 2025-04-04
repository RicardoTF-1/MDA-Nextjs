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


export default function Home() {
  return (
    <>
      <HeroSlider/>
      <CourseFinder/>
      <UpcomingClasses />
      <Hero />
      <StatsSection/>
      <BannerSlider/>
      <CategorySection/>
      <CourseHighlights />
      <LocationFinder />
      <Testimonials />
      <LocationMap />
    </>
  )
}