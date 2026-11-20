import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import Filters from './components/Filters.jsx';
import MovieGrid from './components/MovieGrid.jsx';
import MoviePlayerModal from './components/MoviePlayerModal.jsx';
import SearchModal from './components/SearchModal.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import { MOVIES_DATA } from './data/movies.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('uzb');
  const [currentLang, setCurrentLang] = useState('UZ');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters state
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [quickFilter, setQuickFilter] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('tvcom_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tvcom_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Toast auto-hide
  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      showToast("Sevimlilardan o'chirildi");
    } else {
      setFavorites([...favorites, id]);
      showToast("Sevimlilarga qo'shildi!");
    }
  };

  const isFavorite = (id) => favorites.includes(id);

  const handleShare = (movie) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `?movie=${movie.id}`);
      showToast("Film havolasi nusxalandi!");
    } else {
      showToast("Film: " + movie.name);
    }
  };

  // Keyboard shortcut for search (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute Facets (Genres, Countries, Years)
  const { allGenres, allCountries, allYears } = useMemo(() => {
    const genresSet = new Set();
    const countriesSet = new Set();
    const yearsSet = new Set();

    MOVIES_DATA.forEach(m => {
      if (m.genres) {
        m.genres.split(',').forEach(g => {
          const clean = g.trim();
          if (clean && clean !== "O'zbekcha" && clean !== "Filmlar" && clean !== "O'zbek tiliga tarjima qilingan") {
            genresSet.add(clean);
          }
        });
      }
      if (m.countries) {
        m.countries.split(',').forEach(c => {
          const clean = c.trim();
          if (clean) countriesSet.add(clean);
        });
      }
      if (m.year) yearsSet.add(m.year);
    });

    return {
      allGenres: Array.from(genresSet).sort(),
      allCountries: Array.from(countriesSet).sort(),
      allYears: Array.from(yearsSet).sort((a, b) => b - a)
    };
  }, []);

  // Filter & Sort Movies
  const filteredMovies = useMemo(() => {
    let result = [...MOVIES_DATA];

    // Tab check: if activeTab === 'favourites', only show favorites
    if (activeTab === 'favourites') {
      result = result.filter(m => favorites.includes(m.id));
    }

    // Genre filter
    if (selectedGenre) {
      result = result.filter(m => m.genres && m.genres.toLowerCase().includes(selectedGenre.toLowerCase()));
    }

    // Country filter
    if (selectedCountry) {
      result = result.filter(m => m.countries && m.countries.toLowerCase().includes(selectedCountry.toLowerCase()));
    }

    // Year filter
    if (selectedYear) {
      result = result.filter(m => m.year === parseInt(selectedYear, 10));
    }

    // Quick filter chips
    if (quickFilter === '4k') {
      result = result.filter(m => m.quality && m.quality.includes('4K'));
    } else if (quickFilter === 'top_rated') {
      result = result.filter(m => parseFloat(m.kinopoisk_rating || 0) >= 7.5 || parseFloat(m.imdb_rating || 0) >= 7.5);
    } else if (quickFilter === 'recent') {
      result = result.filter(m => m.year >= 2020);
    }

    // Sorting
    if (sortBy === 'year_desc') {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else if (sortBy === 'kinopoisk') {
      result.sort((a, b) => parseFloat(b.kinopoisk_rating || 0) - parseFloat(a.kinopoisk_rating || 0));
    } else if (sortBy === 'imdb') {
      result.sort((a, b) => parseFloat(b.imdb_rating || 0) - parseFloat(a.imdb_rating || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeTab, favorites, selectedGenre, selectedCountry, selectedYear, quickFilter, sortBy]);

  // Featured movies for Hero Banner (Top 5 premier movies)
  const featuredMovies = useMemo(() => {
    return MOVIES_DATA.slice(0, 6);
  }, []);

  const handleResetFilters = () => {
    setSelectedGenre('');
    setSelectedCountry('');
    setSelectedYear('');
    setSortBy('popularity');
    setQuickFilter('all');
    setCurrentPage(1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0c0c0e' }}>
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoritesCount={favorites.length}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <div className="container">
          
          {/* Hero Banner (Shown on Main / Uzbek tab) */}
          {activeTab === 'uzb' && (
            <HeroBanner
              featuredMovies={featuredMovies}
              onSelectMovie={(movie) => setSelectedMovie(movie)}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}

          {/* Page Heading & Breadcrumb */}
          <div style={{ margin: '24px 0 20px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '6px'
              }}
            >
              {activeTab === 'favourites' 
                ? "Sevimlilar ro'yxati" 
                : activeTab === 'tv' 
                ? "Telekanallar va Jonli efir" 
                : activeTab === 'radio'
                ? "Online Radio to'lqinlari"
                : "Kinolar o’zbek tilida"}
            </h1>
            <p style={{ fontSize: '15px', color: '#a1a1aa' }}>
              {activeTab === 'favourites'
                ? `Saqlangan kinolaringiz (${favorites.length} ta)`
                : "Tarjima kinolar, premyeralar va sara o'zbekcha filmlar onlayn tomosha qilish uchun"}
            </p>
          </div>

          {/* Filters (Janr, Mamlakat, Chiqqan yili, Saralash) */}
          <Filters
            genres={allGenres}
            countries={allCountries}
            years={allYears}
            selectedGenre={selectedGenre}
            setSelectedGenre={(g) => { setSelectedGenre(g); setCurrentPage(1); }}
            selectedCountry={selectedCountry}
            setSelectedCountry={(c) => { setSelectedCountry(c); setCurrentPage(1); }}
            selectedYear={selectedYear}
            setSelectedYear={(y) => { setSelectedYear(y); setCurrentPage(1); }}
            sortBy={sortBy}
            setSortBy={setSortBy}
            quickFilter={quickFilter}
            setQuickFilter={(q) => { setQuickFilter(q); setCurrentPage(1); }}
            onReset={handleResetFilters}
          />

          {/* Movies Grid */}
          <MovieGrid
            movies={filteredMovies}
            totalCount={filteredMovies.length}
            currentPage={currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Movie Video Player Modal */}
      {selectedMovie && (
        <MoviePlayerModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onShare={handleShare}
          allMovies={MOVIES_DATA}
          onSelectMovie={(m) => setSelectedMovie(m)}
        />
      )}

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        movies={MOVIES_DATA}
        onSelectMovie={(m) => setSelectedMovie(m)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} />
    </div>
  );
}
