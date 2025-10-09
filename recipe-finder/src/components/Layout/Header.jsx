import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'text-gray-700' : 'text-white hover:text-gray-500';

  return (
    <header className="bg-[#FF5C00]/90 border-b border-gray-200 sticky top-0 z-40">
      <div className="container  text-white  mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
            <span className="text-xl font-bold text-white">Recipe Finder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 pr-4">
            <Link to="/" className={`font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/recipes" className={`font-medium transition-colors ${isActive('/recipes')}`}>Recipes</Link>
            <Link to="/about" className={`font-medium transition-colors ${isActive('/about')}`}>About</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className=" rounded-full md:hidden bg-[#FF5C00]/90 text-white p-2 hover:text-primary-500 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="rounded-xl mb-4 text-[#eb5C00]/90 bg-white text-center md:hidden flex flex-col gap-4 py-4">
            <Link to="/" className={`font-medium px-4 ${isActive('/')}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <hr />
            <Link to="/recipes" className={`font-medium px-4 ${isActive('/recipes')}`} onClick={() => setMenuOpen(false)}>Recipes</Link>
            <hr />
            <Link to="/about" className={`font-medium px-4 ${isActive('/about')}`} onClick={() => setMenuOpen(false)}>About</Link>
          </nav>
        )}
      </div>
    </header>
  );
}