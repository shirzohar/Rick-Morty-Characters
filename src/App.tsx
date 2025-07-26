import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchBar from './components/SearchBar';
import FavoritesListDrawer from './components/FavoritesListDrawer';
import './App.css';
import EpisodesPage from './components/EpisodesPage';
import AboutPage from './components/AboutPage';
import styles from './styles/SearchBar.module.css';

const SEARCH_KEY = 'rickmorty_search';
const SEARCH_HISTORY_KEY = 'rickmorty_search_history';

const SPECIES_OPTIONS = [
  '', 'Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological', 'Unknown', 'Animal', 'Robot', 'Cronenberg', 'Disease', 'Parasite'
];

const App: React.FC = () => {
  const [search, setSearch] = React.useState(() => {
    return localStorage.getItem(SEARCH_KEY) || '';
  });
  const [searchHistory, setSearchHistory] = React.useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('dark_mode') === 'true';
  });
  const [species, setSpecies] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem(SEARCH_KEY, search);
  }, [search]);

  React.useEffect(() => {
    localStorage.setItem('dark_mode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value && !searchHistory.includes(value)) {
      const newHistory = [value, ...searchHistory].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    }
  };

  const handleHistorySelect = (value: string) => {
    setSearch(value);
  };

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className={darkMode ? 'clean-app-bg dark' : 'clean-app-bg'}>
          <div className="header-flex header-center">
            <div className="header impressive-header">Rick & Morty Characters</div>
          </div>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/episodes" className="nav-link">Episodes</Link>
            <Link to="/about" className="nav-link">About</Link>
            <button className="nav-link" style={{ cursor: 'pointer' }} onClick={() => setDarkMode((d) => !d)}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
          <div className="main-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={
                  <>
                    <div className="search-fav-row" style={{ gap: 12 }}>
                      <SearchBar
                        value={search}
                        onChange={handleSearchChange}
                        className="no-margin-bottom"
                        history={searchHistory}
                        onHistorySelect={handleHistorySelect}
                      />
                      <select
                        className={styles.select + (darkMode ? ' dark' : '')}
                        value={species}
                        onChange={e => setSpecies(e.target.value)}
                        aria-label="Filter by species"
                      >
                        <option value="">All Species</option>
                        {SPECIES_OPTIONS.filter(opt => opt).map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <FavoritesListDrawer />
                    </div>
                    <CharacterList search={search} species={species} />
                  </>
                } />
                <Route path="/episodes" element={<EpisodesPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
};

export default App; 