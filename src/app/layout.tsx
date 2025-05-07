// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'My Drive Academy - Professional Driving School',
  description:
    'My Drive Academy offers professional driving lessons for teens and adults with certified instructors. Learn to drive safely and confidently.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

