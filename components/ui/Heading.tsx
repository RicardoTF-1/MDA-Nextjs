import React from 'react';

// Define the valid heading levels
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
  // Instead of using keyof JSX.IntrinsicElements, render the specific element based on level
  const baseStyles = "font-bold"; 
  const combinedClassName = `${baseStyles} ${className}`;
  
  // Render the appropriate heading level
  switch (level) {
    case 'h1':
      return <h1 className={combinedClassName}>{children}</h1>;
    case 'h2':
      return <h2 className={combinedClassName}>{children}</h2>;
    case 'h3':
      return <h3 className={combinedClassName}>{children}</h3>;
    case 'h4':
      return <h4 className={combinedClassName}>{children}</h4>;
    case 'h5':
      return <h5 className={combinedClassName}>{children}</h5>;
    case 'h6':
      return <h6 className={combinedClassName}>{children}</h6>;
    default:
      return <h2 className={combinedClassName}>{children}</h2>;
  }
};

export default Heading;
