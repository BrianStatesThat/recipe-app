import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function SearchBar({ onSearch, isLoading, large = false, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const searchSuggestions = ['Pasta', 'Chicken', 'Chocolate', 'Salad', 'Cake', 'Beef', 'Fish'];

  if (large) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Next Culinary Adventure
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Search thousands of recipes by ingredient, cuisine, or keyword and find inspiration for every meal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
             <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search recipes by ingredient or keyword"
             className="pl-10 input-field w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl px-4 py-3 text-base sm:text-lg md:text-xl rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
             disabled={isLoading}
/>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="btn-primary px-8 text-lg"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3 text-center">Try searching for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(suggestion)}`)}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors border border-primary-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes by ingredient"
              className="input-field"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="btn-primary whitespace-nowrap"
          >
            {isLoading ? '...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
}