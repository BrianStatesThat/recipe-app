import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { RecipeDetail } from './pages/RecipeDetail';
import { NotFound } from './pages/NotFound';
import { Recipes } from './pages/Recipes'; // 👈 Added import

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        {/* Pages with header and footer */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        
        <Route path="/search" element={
          <>
            <Header />
            <SearchResults />
            <Footer />
          </>
        } />
        
        <Route path="/recipes" element={
          <>
            <Header />
            <Recipes /> {/* 👈 Replaced SearchResults with Recipes */}
            <Footer />
          </>
        } />
        
        {/* Recipe detail page has custom header */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        
        {/* 404 page */}
        <Route path="*" element={
          <>
            <Header />
            <NotFound />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
