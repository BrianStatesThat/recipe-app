import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { RecipeDetail } from './pages/RecipeDetail';
import { NotFound } from './pages/NotFound';
import { Recipes } from './pages/Recipes';
import { About } from './pages/About';
import LiquidButton from './components/Layout/LiquidButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        {/* Pages with header and footer */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <div className="rounded-full fixed bottom-[20px] right-[20px] md:right-[80px] z-80">
              <LiquidButton />
            </div>
            <Footer />
          </>
        } />
        
        <Route path="/search" element={
          <>
            <Header />
            <SearchResults />
            <div className="rounded-full fixed bottom-[20px] right-[20px] md:right-[80px] z-80">
              <LiquidButton />
            </div>
            <Footer />
          </>
        } />

        <Route path="/about" element={
          <>
            <Header />
            <About />
            <Footer />
          </>
        } />
        
        <Route path="/recipes" element={
          <>
            <Header />
            <Recipes />
            <div className="rounded-full fixed bottom-[20px] right-[20px] md:right-[80px] z-80">
              <LiquidButton />
            </div>
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