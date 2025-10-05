export function RecipeCard({ recipe, onSelect, featured = false }) {
  const {
    idMeal,
    id = idMeal,
    title = recipe.strMeal,
    image = recipe.strMealThumb,
    strInstructions,
    ingredients = []
  } = recipe;

  const getShortDescription = () => {
    if (typeof strInstructions === 'string' && strInstructions.trim()) {
      return strInstructions.length > 100
        ? strInstructions.slice(0, 100).trim() + '...'
        : strInstructions;
    }
    const preview = ingredients.slice(0, 3).map(item => item.ingredient).join(', ');
    return ingredients.length > 3 ? preview + '...' : preview;
  };

  const handleClick = () => onSelect(id);

  if (featured) {
    return (
      <div
        className="card group cursor-pointer flex flex-col h-full"
        onClick={handleClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <button
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{getShortDescription()}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="btn-outline w-full text-center mt-auto"
          >
            View Recipe
          </button>
        </div>
      </div>
    );
  }

  // Responsive Compact Version (non-featured)
  return (
    <div
      className="card group cursor-pointer flex flex-col sm:flex-row w-full max-w-sm sm:max-w-md md:max-w-lg"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full sm:w-28 h-48 sm:h-28 object-cover flex-shrink-0 rounded-t sm:rounded-l sm:rounded-t-none"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 text-base sm:text-lg line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
            {getShortDescription()}
          </p>
        </div>
      </div>
    </div>
  );
}