// app/page.js
import Hero from '/components/home/Hero'
import CourseHighlights from '/components/home/CourseHighlights'
import Testimonials from '/components/home/Testimonials'
import LocationMap from '/components/home/LocationMap'
import Slider from '../../components/home/Slider'
import UpcomingClasses from '../../components/home/UpcomingClasses'
import LocationFinder from '../../components/home/LocationFinder'
import BannerSlider from '../../components/home/BannerSlider'
import StatsSection from '../../components/home/StatsSection'
import CategorySection from '../../components/home/CategorySection'

export default function Home() {
  return (
    <>
      <Slider/>
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