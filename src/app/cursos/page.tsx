// app/cursos/page.js
import CourseList from '/components/courses/CourseList'
import CourseFilter from '/components/courses/CourseFilter'
import Heading from '/components/ui/Heading'

export const metadata = {
  title: 'Cursos de Manejo | My Drive Academy',
  description: 'Explora nuestra variedad de cursos de manejo para principiantes y avanzados. Aprende con los mejores instructores certificados.',
}

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Heading level="h1" className="text-3xl font-bold mb-6">
        Nuestros Cursos de Manejo
      </Heading>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <CourseFilter />
        </div>
        <div className="w-full md:w-3/4">
          <CourseList />
        </div>
      </div>
    </div>
  )
}