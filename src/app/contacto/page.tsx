// app/contacto/page.js
import ContactForm from '/components/contact/ContactForm'

export const metadata = {
  title: 'Contacto | My Drive Academy',
  description: 'Contáctanos para obtener más información sobre nuestros cursos de manejo o para inscribirte en clases.',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Contacto</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 text-white p-6">
              <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Teléfono:</p>
                  <p>(123) 456-7890</p>
                </div>
                
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>info@mydriveacademy.com</p>
                </div>
                
                <div>
                  <p className="font-semibold">Horario de atención:</p>
                  <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
                
                <div>
                  <p className="font-semibold">Dirección principal:</p>
                  <p>123 Main Street, Chicago, IL 60601</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-6">
              <h2 className="text-xl font-bold mb-4">Envíanos un mensaje</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}