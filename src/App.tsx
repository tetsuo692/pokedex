import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonList } from './components/PokemonList';
import { FavoritesPage } from './pages/FavoritesPage';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="font-sans text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
