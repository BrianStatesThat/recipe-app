const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const themealdbApi = {
    async getAllRecipes() {
    const categories = ['Chicken', 'Dessert', 'Vegetarian', 'Pasta', 'Beef', 'Seafood'];
    const allRecipes = [];

    for (const category of categories) {
      const res = await fetch(`${BASE_URL}/filter.php?c=${category}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        allRecipes.push(data.meals[0]); // or push more if you want
      }
    }

    return allRecipes;
  },
  
  async searchRecipes(query) {
    try {
      const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      
      if (!data.meals) {
        return [];
      }
      
      return data.meals.map(meal => this.transformMealData(meal));
    } catch (error) {
      console.error('Error searching recipes:', error);
      throw new ApiError(
        error.message || 'Failed to search recipes. Please try again.',
        error.status
      );
    }
  },

  async getRecipeById(id) {
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      
      if (!data.meals || data.meals.length === 0) {
        throw new ApiError('Recipe not found', 404);
      }
      
      return this.transformMealData(data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw new ApiError(
        error.message || 'Failed to fetch recipe details. Please try again.',
        error.status
      );
    }
  },

  async getRandomRecipe() {
    try {
      const response = await fetch(`${BASE_URL}/random.php`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      
      if (!data.meals || data.meals.length === 0) {
        throw new ApiError('No random recipe found', 404);
      }
      
      return this.transformMealData(data.meals[0]);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
      throw new ApiError(
        error.message || 'Failed to fetch random recipe. Please try again.',
        error.status
      );
    }
  },

  async getCategories() {
    try {
      const response = await fetch(`${BASE_URL}/categories.php`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async getRecipesByCategory(category) {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      return data.meals ? data.meals.map(meal => this.transformMealData(meal)) : [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  },

  async getRecipesByArea(area) {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      return data.meals ? data.meals.map(meal => this.transformMealData(meal)) : [];
    } catch (error) {
      console.error('Error fetching recipes by area:', error);
      return [];
    }
  },

  async getRecipesByIngredient(ingredient) {
    try {
      const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      return data.meals ? data.meals.map(meal => this.transformMealData(meal)) : [];
    } catch (error) {
      console.error('Error fetching recipes by ingredient:', error);
      return [];
    }
  },

  async getAreas() {
    try {
      const response = await fetch(`${BASE_URL}/list.php?a=list`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching areas:', error);
      return [];
    }
  },

  async getIngredients() {
    try {
      const response = await fetch(`${BASE_URL}/list.php?i=list`);
      
      if (!response.ok) {
        throw new ApiError('Network response was not ok', response.status);
      }
      
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      return [];
    }
  },

  transformMealData(meal) {
    // Extract ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }

    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      youtube: meal.strYoutube,
      source: meal.strSource,
      tags: meal.strTags ? meal.strTags.split(',') : [],
      ingredients,
      thumbnail: meal.strMealThumb ? `${meal.strMealThumb}/preview` : null
    };
  },

  // Demo data for fallback when API is unavailable
  getDemoRecipes() {
    return [
      {
        id: '52772',
        title: 'Teriyaki Chicken Casserole',
        image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
        category: 'Chicken',
        area: 'Japanese',
        instructions: 'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray. Combine soy sauce, water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling. Meanwhile, stir together the corn starch and water in a separate dish until smooth. Once sauce is boiling, add mixture and whisk to combine. Cook until the sauce starts to thicken then remove from heat. Place the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Bake chicken for 30 minutes. Remove from oven and shred chicken in the dish using two forks. Meanwhile, steam or cook the vegetables according to package directions. Add the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Top with cheese and bake for 15 minutes, until cheese is melted and bubbly. Serve with a drizzle of the remaining sauce.',
        youtube: 'https://www.youtube.com/watch?v=4aZr5hZXP_s',
        source: 'https://therecipecritic.com/2016/07/teriyaki-chicken-casserole/',
        tags: ['Meat', 'Casserole'],
        ingredients: [
          { ingredient: 'soy sauce', measure: '3/4 cup' },
          { ingredient: 'water', measure: '1/2 cup' },
          { ingredient: 'brown sugar', measure: '1/4 cup' },
          { ingredient: 'ground ginger', measure: '1/2 teaspoon' },
          { ingredient: 'minced garlic', measure: '1/2 teaspoon' },
          { ingredient: 'cornstarch', measure: '4 Tablespoons' },
          { ingredient: 'chicken breasts', measure: '2' }
        ]
      },
      {
        id: '52893',
        title: 'Apple & Blackberry Crumble',
        image: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
        category: 'Dessert',
        area: 'British',
        instructions: 'Heat oven to 190C/170C fan/gas 5. Tip the flour and sugar into a large bowl. Add the butter, then rub into the flour using your fingertips to make a light breadcrumb texture. Do not overwork it or the crumble will become heavy. Sprinkle the mixture evenly over a baking sheet and bake for 15 mins or until lightly coloured. Meanwhile, for the compote, peel, core and cut the apples into 2cm dice. Put the butter and sugar in a medium saucepan and melt together over a medium heat. Cook for 3 mins until the mixture turns to a light caramel. Stir in the apples and cook for 3 mins. Add the blackberries and cinnamon, and cook for 3 mins more. Cover, remove from the heat, then leave for 2-3 mins to continue cooking in the warmth of the pan. To serve, spoon the warm fruit into an ovenproof gratin dish, top with the crumble mix, then reheat in the oven for 5-10 mins. Serve with vanilla ice cream.',
        youtube: 'https://www.youtube.com/watch?v=4vhcOwVBDO4',
        source: 'https://www.bbcgoodfood.com/recipes/778642/apple-and-blackberry-crumble',
        tags: ['Dessert', 'Pudding'],
        ingredients: [
          { ingredient: 'Plain Flour', measure: '100g' },
          { ingredient: 'Caster Sugar', measure: '50g' },
          { ingredient: 'Butter', measure: '100g' },
          { ingredient: 'Braeburn Apples', measure: '4 peeled' },
          { ingredient: 'Butter', measure: '50g' },
          { ingredient: 'Caster Sugar', measure: '50g' },
          { ingredient: 'Blackberrys', measure: '120g' },
          { ingredient: 'Cinnamon', measure: '¼ teaspoon' },
          { ingredient: 'Ice Cream', measure: 'to serve' }
        ]
      },
      {
        id: '52771',
        title: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        category: 'Vegetarian',
        area: 'Italian',
        instructions: 'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
        youtube: 'https://www.youtube.com/watch?v=1IszT_guI08',
        source: 'https://www.foodnetwork.com/recipes/food-network-kitchen/arrabbiata-sauce',
        tags: ['Pasta', 'Curry'],
        ingredients: [
          { ingredient: 'penne rigate', measure: '1 pound' },
          { ingredient: 'olive oil', measure: '1/4 cup' },
          { ingredient: 'garlic', measure: '3 cloves' },
          { ingredient: 'chopped tomatoes', measure: '1 tin' },
          { ingredient: 'red chile flakes', measure: '1/2 teaspoon' },
          { ingredient: 'italian seasoning', measure: '1/2 teaspoon' },
          { ingredient: 'basil', measure: '6 leaves' },
          { ingredient: 'Parmigiano-Reggiano', measure: 'spinkling' }
        ]
      },
      {
        id: '52929',
        title: 'Timbits',
        image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
        category: 'Dessert',
        area: 'Canadian',
        instructions: 'Sift together dry ingredients. Mix together wet ingredients and incorporate into dry. Stir until smooth. Drop by teaspoonfuls(no bigger) into hot oil (365 degrees, no hotter), turning after a few moments until golden brown on all sides. Remove and drain. Roll in cinnamon sugar while still warm and serve.',
        youtube: 'https://www.youtube.com/watch?v=fFLn1h80AGQ',
        source: 'https://www.geniuskitchen.com/recipe/timbits-133275',
        tags: ['Snack', 'Treat'],
        ingredients: [
          { ingredient: 'Flour', measure: '2 cups' },
          { ingredient: 'Sugar', measure: '1/3 cup' },
          { ingredient: 'Baking Powder', measure: '3 teaspoons' },
          { ingredient: 'Salt', measure: '1/2 teaspoon' },
          { ingredient: 'Egg', measure: '1 beaten' },
          { ingredient: 'Milk', measure: '3/4 cup' },
          { ingredient: 'Vegetable Oil', measure: '2 tablespoons' },
          { ingredient: 'Oil', measure: 'for frying' },
          { ingredient: 'Icing Sugar', measure: 'garnish' }
        ]
      },
      {
        id: '52844',
        title: 'Poutine',
        image: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
        category: 'Miscellaneous',
        area: 'Canadian',
        instructions: 'Heat oil in a deep fryer or deep heavy skillet to 365°F (185°C). Warm gravy in saucepan or microwave. Place the fries into the hot oil, and cook until light brown, about 5 minutes. Remove to a paper towel lined plate to drain. Place the fries on a serving platter, and sprinkle the cheese over them. Ladle gravy over the fries and cheese, and serve immediately.',
        youtube: 'https://www.youtube.com/watch?v=UVAMAoA2_WU',
        source: 'https://www.food.com/recipe/real-canadian-poutine-113388',
        tags: ['UnHealthy', 'Speciality'],
        ingredients: [
          { ingredient: 'Vegetable Oil', measure: '1L' },
          { ingredient: 'Beef Gravy', measure: '1 Can' },
          { ingredient: 'Frozen French Fries', measure: '5 cups' },
          { ingredient: 'Cheese Curds', measure: '2 cups' }
        ]
      },
      {
        id: '52928',
        title: 'BeaverTails',
        image: 'https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg',
        category: 'Dessert',
        area: 'Canadian',
        instructions: 'In the bowl of a stand mixer, add warm water, a big pinch of sugar and yeast. Allow to sit until frothy. Into the same bowl, add 1/2 cup sugar, warm milk, melted butter, eggs and salt, and whisk until combined. Place a dough hook on the mixer, add the flour with the machine on, until a smooth but slightly sticky dough forms. Place dough in a bowl, cover with plastic wrap, and allow to proof for 1 1/2 hours. Divide dough into 16 pieces, and roll each piece into an oval shape, to resemble a beaver s tail. In a large, deep pot, heat oil to 350 degrees. Gently place beavertail dough into hot oil and cook for 30 to 45 seconds on each side, until golden brown. Drain on paper towels, and garnish as desired. Toss in cinnamon sugar, in white sugar with a squeeze of lemon, or with a generous slathering of Nutella and a handful of toasted almonds. Enjoy!',
        youtube: 'https://www.youtube.com/watch?v=2G07UOqU2e8',
        source: 'https://www.narcity.com/ca/on/toronto/dining/11-spots-to-get-delicious-deep-fried-beavertails-in-and-around-toronto',
        tags: ['Treat', 'Snack'],
        ingredients: [
          { ingredient: 'Warm Water', measure: '1/2 cup' },
          { ingredient: 'Sugar', measure: '1 pinch' },
          { ingredient: 'Yeast', measure: '2 1/4-ounce packages' },
          { ingredient: 'Sugar', measure: '1/2 cup' },
          { ingredient: 'Milk', measure: '1 cup' },
          { ingredient: 'Butter', measure: '1/4 cup' },
          { ingredient: 'Eggs', measure: '2' },
          { ingredient: 'Salt', measure: '1 teaspoon' },
          { ingredient: 'Flour', measure: '4 cups' },
          { ingredient: 'Oil', measure: 'for frying' }
        ]
      }
    ];
  }
};