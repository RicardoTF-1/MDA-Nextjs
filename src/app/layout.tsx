// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '/components/common/Header'
import Footer from '/components/common/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Drive Academy - Escuela de Manejo',
  description: 'Aprende a manejar con los mejores instructores certificados y obtén tu licencia de conducir rápidamente.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}