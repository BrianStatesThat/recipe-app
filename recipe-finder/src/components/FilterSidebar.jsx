import { useState } from 'react';

export function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    cuisine: [],
    dietary: [],
    difficulty: '',
    cookingTime: [10, 100]
  });

  const cuisines = ['Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean', 'American'];
  const dietary = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb'];

  const handleCuisineToggle = (cuisine) => {
    const updated = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...filters.cuisine, cuisine];
    
    const newFilters = { ...filters, cuisine: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDietaryToggle = (diet) => {
    const updated = filters.dietary.includes(diet)
      ? filters.dietary.filter(d => d !== diet)
      : [...filters.dietary, diet];
    
    const newFilters = { ...filters, dietary: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Filter Recipes</h3>
      
      {/* Cuisine */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Cuisine</h4>
        <div className="space-y-2">
          {cuisines.map(cuisine => (
            <label key={cuisine} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.cuisine.includes(cuisine)}
                onChange={() => handleCuisineToggle(cuisine)}
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-gray-600">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Restrictions */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Dietary Restrictions</h4>
        <div className="space-y-2">
          {dietary.map(diet => (
            <label key={diet} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.dietary.includes(diet)}
                onChange={() => handleDietaryToggle(diet)}
                className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-gray-600">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Difficulty</h4>
        <select 
          className="input-field w-full"
          value={filters.difficulty}
          onChange={(e) => {
            const newFilters = { ...filters, difficulty: e.target.value };
            setFilters(newFilters);
            onFilterChange(newFilters);
          }}
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Cooking Time */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Estimated Cooking Time (min)</h4>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>10 min</span>
          <input
            type="range"
            min="10"
            max="100"
            value={filters.cookingTime[1]}
            onChange={(e) => {
              const newFilters = { ...filters, cookingTime: [10, parseInt(e.target.value)] };
              setFilters(newFilters);
              onFilterChange(newFilters);
            }}
            className="flex-1"
          />
          <span>{filters.cookingTime[1]} min</span>
        </div>
      </div>
    </div>
  );
}