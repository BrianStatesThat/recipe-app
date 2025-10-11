import { RecipeCard } from './RecipeCard.jsx';

export function RecipeGrid({ recipes, onRecipeSelect, featured = false, title }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600">Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
      )}

      <div
        className={`grid gap-6 ${
          featured ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {recipes.map((recipe) => {
          const recipeId = recipe.id || recipe.idMeal; // fallback for API data
          return (
            <RecipeCard
              key={recipeId}
              recipe={recipe}
              onSelect={() => onRecipeSelect(recipeId)} // 👈 ensure click triggers navigation
              featured={featured}
            />
          );
        })}
      </div>
    </div>
  );
}