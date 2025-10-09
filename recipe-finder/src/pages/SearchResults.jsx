import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar.jsx';
import { RecipeGrid } from '../components/RecipeGrid.jsx';
import { FilterSidebar } from '../components/FilterSidebar.jsx';
import { LoadingIndicator } from '../components/LoadingIndicator.jsx';
import { ErrorAlert } from '../components/ErrorAlert.jsx';
import { themealdbApi } from '../utils/themealdbApi.js';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const results = await themealdbApi.searchRecipes(searchQuery);
      setRecipes(results);
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handleRecipeSelect = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleFilterChange = (filters) => {
    // Implement filter logic here
    console.log('Filters changed:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="container mx-auto px-4 mb-8">
          <SearchBar onSearch={handleSearch} isLoading={loading} initialValue={query} />
        </div>

        {error && (
          <ErrorAlert message={error} onRetry={() => performSearch(query)} />
        )}

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {query ? `Results for "${query}"` : 'All Recipes'}
                  </h1>
                  <p className="text-gray-600">
                    Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <RecipeGrid
                  recipes={recipes}
                  onRecipeSelect={handleRecipeSelect}
                />

                {/* Load More Button */}
                {recipes.length > 0 && (
                  <div className="text-center mt-8">
                    <button className="bg-[#FF5C00]/90 text-white  rounded-full btn-outline py-2 px-8">
                      Load More Recipes
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}