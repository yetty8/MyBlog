// src/App.jsx
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { trackEvent } from './utils/analytics';
import SearchResults from './pages/SearchResults';


// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Post = lazy(() => import('./pages/Post'));

// Track page views
const PageViewTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    trackEvent({
      action: 'page_view',
      category: 'Navigation',
      label: location.pathname + location.search
    });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner fullPage />}>
                <PageViewTracker />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/create-post" element={<CreatePost />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                  <Route path="/category/:category/:slug" element={<Post />} />
                  <Route path="/search" element={<SearchResults />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;