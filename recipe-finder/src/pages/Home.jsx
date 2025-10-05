import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { RecipeGrid } from '../components/RecipeGrid';
import { themealdbApi } from '../utils/themealdbApi';

export function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load featured recipes on initial render
  useEffect(() => {
    loadFeaturedRecipes();
  }, []);

  const loadFeaturedRecipes = async () => {
    try {
      setLoading(true);
      const categories = ['Chicken', 'Dessert', 'Vegetarian', 'Pasta', 'Beef', 'Seafood'];
      const allRecipes = [];
      
      for (const category of categories.slice(0, 6)) {
        const recipes = await themealdbApi.getRecipesByCategory(category);
        if (recipes.length > 0) {
          allRecipes.push(recipes[0]);
        }
      }
      
      if (allRecipes.length === 0) {
        setFeaturedRecipes(themealdbApi.getDemoRecipes());
      } else {
        setFeaturedRecipes(allRecipes);
      }
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
          <RecipeGrid
            recipes={featuredRecipes}
            onRecipeSelect={handleRecipeSelect}
            featured={true}
            title="Featured Recipes"
          />
        </div>
      </section>
    </div>
  );
}