import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar.jsx';
import { RecipeGrid } from '../components/RecipeGrid.jsx';
import { LoadingIndicator } from '../components/LoadingIndicator.jsx'; // 👈 Import it
import { themealdbApi } from '../utils/themealdbApi.js';

export function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedRecipes();
  }, []);

  const loadFeaturedRecipes = async () => {
    try {
      setLoading(true);
      const categories = ['Chicken', 'Dessert', 'Vegetarian', 'Pasta', 'Beef', 'Seafood', 'Breakfast', 'Soup'];
      const allRecipes = [];

      for (const category of categories.slice(0, 6)) {
        const recipes = await themealdbApi.getRecipesByCategory(category);
        if (recipes.length > 0) {
          allRecipes.push(recipes[0]);
        }
      }

      setFeaturedRecipes(
        allRecipes.length === 0 ? themealdbApi.getDemoRecipes() : allRecipes
      );
    } catch (error) {
      console.error('Error loading featured recipes:', error);
      setFeaturedRecipes(themealdbApi.getDemoRecipes());
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
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SearchBar onSearch={handleSearch} isLoading={loading} large={true} />
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingIndicator />
          ) : (
            <RecipeGrid
              recipes={featuredRecipes}
              onRecipeSelect={handleRecipeSelect}
              featured={true}
              title="Featured Recipes"
            />
          )}
        </div>
      </section>
    </div>
  );
}