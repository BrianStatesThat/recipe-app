import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">Recipe Finder</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/recipes" 
              className={`font-medium transition-colors ${
                location.pathname === '/recipes' ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              Recipes
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                location.pathname === '/about' ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              }`}
            >
              About
            </Link>
          </nav>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <Link to="/search" className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}