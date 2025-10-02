export function RecipeCard({ recipe, onSelect, featured = false }) {
  const {
    id,
    title,
    image,
    category,
    area,
    ingredients
  } = recipe;

  if (featured) {
    return (
      <div className="card group cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {ingredients.slice(0, 3).map(item => item.ingredient).join(', ')}...
          </p>
          <button 
            onClick={() => onSelect(id)}
            className="btn-outline w-full text-center"
          >
            View Recipe
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card group cursor-pointer">
      <div className="flex">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-cover flex-shrink-0"
        />
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {ingredients.slice(0, 2).map(item => item.ingredient).join(', ')}...
          </p>
        </div>
      </div>
    </div>
  );
}