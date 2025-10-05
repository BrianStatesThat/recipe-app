import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar.jsx';
import { RecipeGrid } from '../components/RecipeGrid.jsx';
import { LoadingIndicator } from '../components/LoadingIndicator.jsx';
import { themealdbApi } from '../utils/themealdbApi.js';

export function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllRecipes();
  }, []);

  const loadAllRecipes = async () => {
    try {
      setLoading(true);
      const categories = ['Chicken', 'Dessert', 'Vegetarian', 'Pasta', 'Beef', 'Seafood'];
      const allRecipes = [];

      for (const category of categories) {
        const categoryRecipes = await themealdbApi.getRecipesByCategory(category);
        allRecipes.push(...categoryRecipes.slice(0, 2)); // Load top 2 per category
      }

      setRecipes(allRecipes.length > 0 ? allRecipes : themealdbApi.getDemoRecipes());
    } catch (error) {
      console.error('Error loading recipes:', error);
      setRecipes(themealdbApi.getDemoRecipes());
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleRecipeSelect = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} isLoading={loading} large={true} />
        </div>
      </section>

      {/* All Recipes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingIndicator />
          ) : (
            <RecipeGrid
              recipes={recipes}
              onRecipeSelect={handleRecipeSelect}
              title="All Recipes"
            />
          )}
        </div>
      </section>
    </div>
  );
}