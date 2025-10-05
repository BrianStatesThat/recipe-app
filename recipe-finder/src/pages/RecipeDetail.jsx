import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { themealdbApi } from '../utils/themealdbApi.js';
import { LoadingIndicator } from '../components/LoadingIndicator.jsx';
import { ErrorAlert } from '../components/ErrorAlert.jsx';
import { Header } from '../components/Layout/Header.jsx'; // ✅ Using the shared Header

export function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const recipeData = await themealdbApi.getRecipeById(id);
      setRecipe(recipeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-16">
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <ErrorAlert 
            message={error || "Recipe not found"} 
            onRetry={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            {recipe.category && (
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                {recipe.category}
              </span>
            )}
            {recipe.area && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {recipe.area}
              </span>
            )}
            {recipe.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recipe Image */}
        <div className="mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover rounded-xl shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
            <div className="space-y-3">
              {recipe.ingredients.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-medium">{item.measure}</strong> {item.ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions.split('\n').map((step, index) => (
                step.trim() && (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full text-sm flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed flex-1">{step}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-12">
          {recipe.youtube && (
            <a
              href={recipe.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Watch Video
            </a>
          )}
          {recipe.source && (
            <a
              href={recipe.source}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              View Full Recipe
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
