// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '/components/common/Header'
import Footer from '/components/common/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Drive Academy - Professional Driving School',
  description: 'My Drive Academy offers professional driving lessons for teens and adults with certified instructors. Learn to drive safely and confidently.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}