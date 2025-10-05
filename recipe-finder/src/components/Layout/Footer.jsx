import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">Recipe Finder</span>
            </div>
            <p className="text-gray-600 text-sm">
              Easily search for recipes by ingredient or keyword.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
              <li><Link to="/recipes" className="hover:text-primary-500 transition-colors">Recipes</Link></li>
              <li><Link to="/about" className="hover:text-primary-500 transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">
              © 2024 Recipe Finder. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Made with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}