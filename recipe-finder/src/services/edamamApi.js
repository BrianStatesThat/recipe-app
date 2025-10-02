// Edamam API Configuration
const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID || 'demo-app-id';
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY || 'demo-app-key';
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const edamamApi = {
  async searchRecipes(query, options = {}) {
    try {
      const params = new URLSearchParams({
        type: 'public',
        q: query,
        app_id: APP_ID,
        app_key: APP_KEY,
        random: 'true'
      });

      // Add optional parameters
      if (options.mealType) params.append('mealType', options.mealType);
      if (options.diet) params.append('diet', options.diet);
      if (options.cuisineType) params.append('cuisineType', options.cuisineType);

      const response = await fetch(`${BASE_URL}?${params}`);

      if (!response.ok) {
        throw new ApiError(`API request failed with status ${response.status}`, response.status);
      }

      const data = await response.json();

      if (!data.hits || data.hits.length === 0) {
        return [];
      }

      // Transform the API response to our application format
      return data.hits.map(hit => ({
        id: hit.recipe.uri.split('#')[1], // Extract unique ID from URI
        title: hit.recipe.label,
        image: hit.recipe.image,
        source: hit.recipe.source,
        url: hit.recipe.url,
        calories: Math.round(hit.recipe.calories),
        servings: hit.recipe.yield,
        dietLabels: hit.recipe.dietLabels || [],
        healthLabels: hit.recipe.healthLabels || [],
        cautions: hit.recipe.cautions || [],
        ingredientLines: hit.recipe.ingredientLines,
        totalTime: hit.recipe.totalTime,
        mealType: hit.recipe.mealType || [],
        cuisineType: hit.recipe.cuisineType || [],
        dishType: hit.recipe.dishType || []
      }));

    } catch (error) {
      console.error('Error searching recipes:', error);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        error.message || 'Failed to search recipes. Please check your connection and try again.',
        'NETWORK_ERROR'
      );
    }
  },

  // Demo data for when API keys are not available
  getDemoRecipes() {
    return [
      {
        id: 'demo-1',
        title: 'Classic Chicken Curry',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
        source: 'Demo Recipes',
        url: '#',
        calories: 420,
        servings: 4,
        dietLabels: ['High-Protein'],
        healthLabels: ['Sugar-Conscious'],
        cautions: [],
        ingredientLines: [
          '2 chicken breasts, cubed',
          '1 onion, chopped',
          '2 cloves garlic, minced',
          '1 tbsp curry powder',
          '1 cup coconut milk',
          'Salt and pepper to taste'
        ],
        totalTime: 45,
        mealType: ['Lunch/Dinner'],
        cuisineType: ['Indian'],
        dishType: ['Main Course']
      },
      {
        id: 'demo-2',
        title: 'Fresh Garden Salad',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
        source: 'Demo Recipes',
        url: '#',
        calories: 180,
        servings: 2,
        dietLabels: ['Vegetarian'],
        healthLabels: ['Low-Fat', 'Sugar-Conscious'],
        cautions: [],
        ingredientLines: [
          'Mixed greens',
          'Cherry tomatoes',
          'Cucumber slices',
          'Red onion',
          'Balsamic vinaigrette'
        ],
        totalTime: 15,
        mealType: ['Lunch'],
        cuisineType: ['Mediterranean'],
        dishType: ['Salad']
      }
    ];
  }
};