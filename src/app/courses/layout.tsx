// src/app/courses/layout.tsx
import React from 'react';

interface CoursesLayoutProps {
  children: React.ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <main>
      {children}
    </main>
  );
}



