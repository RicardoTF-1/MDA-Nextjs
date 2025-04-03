// app/page.js
import Hero from '/components/home/Hero'
import CourseHighlights from '/components/home/CourseHighlights'
import Testimonials from '/components/home/Testimonials'
import LocationMap from '/components/home/LocationMap'
import Slider from '../../components/home/Slider'
import UpcomingClasses from '../../components/home/UpcomingClasses'
import LocationFinder from '../../components/home/LocationFinder'

export default function Home() {
  return (
    <>
      <Slider/>
      <UpcomingClasses />
      <Hero />
      <CourseHighlights />
      <LocationFinder />
      <Testimonials />
      <LocationMap />
    </>
  )
}