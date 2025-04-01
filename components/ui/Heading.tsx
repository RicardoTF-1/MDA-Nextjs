// components/ui/Heading.tsx
import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ 
  level = 'h2',
  children, 
  className = '' 
}) => {
  const Component = level as keyof JSX.IntrinsicElements;
  
  const baseStyles = "font-bold"; 
  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
};

export default Heading;