// app/page.js
import Hero from '/components/home/Hero'
import CourseHighlights from '/components/home/CourseHighlights'
import Testimonials from '/components/home/Testimonials'
import LocationMap from '/components/home/LocationMap'

export default function Home() {
  return (
    <>
      <h1>Hola mundooooo</h1>
      <Hero />
      <CourseHighlights />
      <Testimonials />
      <LocationMap />
    </>
  )
}