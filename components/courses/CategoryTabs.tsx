'use client';

import Link from 'next/link';

const COURSE_CATEGORIES = [
  { id: 'teen-programs', name: 'Teen Programs', path: '/courses/teen-programs' },
  { id: 'classroom-courses', name: 'Classroom Courses', path: '/courses/classroom-courses' },
  { id: 'in-car-lessons', name: 'In-Car Lessons', path: '/courses/in-car-lessons' },
  { id: 'license-c', name: 'License C', path: '/courses/license-c' },
  { id: 'foreign-drivers', name: 'Foreign Drivers', path: '/courses/foreign-drivers' },
  { id: 'illinois-permit-prep', name: 'Illinois Permit Prep', path: '/courses/illinois-permit-prep' },
];

const CategoryTabs = ({ activeCategory }) => {
  return (
    <div className="overflow-x-auto flex border-b border-gray-200 mb-6">
      <div className="flex min-w-full">
        {COURSE_CATEGORIES.map((category) => (
          <Link 
            key={category.id}
            href={category.path}
            className={`whitespace-nowrap px-4 py-2 border-b-2 transition-colors ${
              activeCategory === category.id
                ? 'border-green-500 text-green-600 font-medium'
                : 'border-transparent hover:border-green-300 text-gray-600 hover:text-gray-900'
            } mr-4`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;