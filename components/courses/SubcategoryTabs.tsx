'use client';

const SubcategoryTabs = ({ subcategories, activeSubcategoryId, onSubcategoryChange }) => {
  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center mb-8">
      {subcategories.map((subcategory) => (
        <button
          key={subcategory.id}
          onClick={() => onSubcategoryChange(subcategory)}
          className={`m-2 px-6 py-2 rounded-full transition-colors ${
            activeSubcategoryId === subcategory.id
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {subcategory.name}
        </button>
      ))}
    </div>
  );
};

export default SubcategoryTabs;