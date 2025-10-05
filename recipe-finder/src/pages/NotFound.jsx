import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. The recipe might have been removed or you entered an invalid URL.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/recipes" className="btn-outline">
            Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}