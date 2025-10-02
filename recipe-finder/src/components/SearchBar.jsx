import { useState } from 'react';

export function SearchBar({ onSearch, isLoading, large = false }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

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
                className="input-field py-4 text-lg"
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