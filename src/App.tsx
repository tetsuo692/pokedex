import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonList } from './components/PokemonList';
import { FavoritesPage } from './pages/FavoritesPage';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import './index.css'
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="font-sans text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
