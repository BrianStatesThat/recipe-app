# Recipe Finder App

A modern, responsive web application for discovering and exploring delicious recipes from around the world. Built with **React** and powered by **TheMealDB API**.

---

## Features

* **Recipe Search:** Find recipes by name, ingredient, or category
* **Recipe Details:** View comprehensive recipe information including ingredients, instructions, and cooking videos
* **Filtering System:** Filter recipes by category, area, and ingredients
* **Responsive Design:** Optimized for all devices (desktop, tablet, mobile)
* **Fast Navigation:** Seamless browsing with **React Router**
* **Modern UI:** Clean, intuitive interface built with **Tailwind CSS**

---

## Tech Stack

* **Frontend Framework:** React
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **API:** TheMealDB API
* **Build Tool:** Vite

---
## Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd recipe-finder
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Open your browser**

    Navigate to `http://localhost:5173` (or the port shown in your terminal)

---

## Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run preview` - Preview production build
* `npm run lint` - Run ESLint

---

## Key Components

### Pages

* **Home:** Landing page with featured recipes and search
* **Recipes:** Browse all available recipes
* **RecipeDetail:** Detailed view of a single recipe
* **SearchResults:** Display search results
* **About:** Information about the application
* **NotFound:** 404 error page

### Components

* **RecipeCard:** Displays recipe preview with image and basic info
* **RecipeGrid:** Responsive grid layout for recipe cards
* **SearchBar:** Search input with real-time suggestions
* **FilterSidebar:** Advanced filtering options
* **LoadingIndicator:** Visual feedback during data loading
* **ErrorAlert:** Error message display

---

## Configuration

The app uses **TheMealDB API** as the data source. No API key is required as TheMealDB provides free access to their public API.

---

## Routing

| Path | Description |
| :--- | :--- |
| `/` | Homepage |
| `/recipes` | All recipes listing |
| `/recipes/:id` | Recipe details |
| `/search` | Search results |
| `/about` | About page |
| `*` | 404 page (catch-all) |

---

## Styling

This project uses **Tailwind CSS** for styling, providing:

* Consistent design system
* Responsive utility classes
* Dark mode support (if implemented)
* Custom component styles in `App.css`

---

## Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---
## Designs

* https://www.figma.com/board/0ejGuYVhcNxZJhqxvTI5KC/Recipe-FInder-App-Brian-Speelman?node-id=0-1&t=UVLceG20K2yKbgCx-1 

## Acknowledgments

* **TheMealDB** for providing the recipe data API
* **React community** for excellent documentation and resources
* **Tailwind CSS** for the utility-first CSS framework
---

## Project Structure

```text
recipe-finder/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   │   ├── Layout/         # Layout components
│   │   ├── ErrorAlert.jsx  # Error display component
│   │   ├── FilterSidebar.jsx # Recipe filtering sidebar
│   │   ├── LoadingIndicator.jsx # Loading spinner/indicator
│   │   ├── RecipeCard.jsx  # Individual recipe card
│   │   ├── RecipeGrid.jsx  # Grid layout for recipes
│   │   └── SearchBar.jsx   # Search input component
│   ├── pages/              # Application pages
│   │   ├── About.jsx       # About page
│   │   ├── Home.jsx        # Homepage
│   │   ├── NotFound.jsx    # 404 error page
│   │   ├── RecipeDetail.jsx # Single recipe details
│   │   ├── Recipes.jsx     # All recipes listing
│   │   └── SearchResults.jsx # Search results page
│   ├── services/           # API services and utilities
│   ├── App.jsx             # Main App component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
├── package.json
└── README.md
