import React from 'react';
import MovieCard from './MovieCard.jsx';
import { Film, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovieGrid({
  movies,
  totalCount,
  currentPage,
  pageSize,
  setCurrentPage,
  onSelectMovie,
  onToggleFavorite,
  isFavorite,
  isLoading,
  onResetFilters
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  // Calculate slice for current page (or infinite scroll accumulation)
  const displayedMovies = movies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <section style={{ marginBottom: '60px' }}>
      
      {/* Title & Count Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
            Kinolar katalogi
          </h2>
          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#a1a1aa',
              fontSize: '13px',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '20px'
            }}
          >
            {totalCount} ta kino
          </span>
        </div>

        <p style={{ fontSize: '13px', color: '#71717a' }}>
          Sahifa: <strong style={{ color: '#fff' }}>{currentPage}</strong> / {totalPages || 1}
        </p>
      </div>

      {/* Grid of movies */}
      {displayedMovies.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px 18px',
            rowGap: '32px'
          }}
          className="movie-grid"
        >
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: 'rgba(20, 20, 24, 0.5)',
            borderRadius: '20px',
            border: '1px dashed rgba(255, 255, 255, 0.1)'
          }}
        >
          <Film size={48} color="#71717a" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Hech qanday film topilmadi
          </h3>
          <p style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '20px' }}>
            Qidiruv so'rovingiz yoki belgilangan filtrlar bo'yicha ma'lumot topilmadi.
          </p>
          <button
            onClick={onResetFilters}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: '#e41a4b',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Filtrlarni qayta tiklash
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          {/* TVCOM Exact "Yana ko'rsatish" (Load more) button */}
          {currentPage < totalPages && (
            <button
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              style={{
                height: '50px',
                padding: '0 36px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e41a4b';
                e.currentTarget.style.borderColor = '#e41a4b';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(228, 26, 75, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <RefreshCw size={17} />
              <span>Yana ko’rsatish (Sahifa {currentPage + 1})</span>
            </button>
          )}

          {/* Numbered Page Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: currentPage === 1 ? '#555' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isCurrent = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: isCurrent ? '#e41a4b' : 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: isCurrent ? 800 : 600,
                    border: isCurrent ? '1px solid #e41a4b' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isCurrent ? '0 0 16px rgba(228, 26, 75, 0.5)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: currentPage === totalPages ? '#555' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 576px) {
          .movie-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
