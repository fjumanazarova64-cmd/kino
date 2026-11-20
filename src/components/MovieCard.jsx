import React from 'react';
import { Play, Heart } from 'lucide-react';

export default function MovieCard({ movie, onSelect, onToggleFavorite, isFavorite }) {
  const favorited = isFavorite(movie.id);

  // Parse first 2 genres
  const displayGenres = (movie.genres || '')
    .split(',')
    .map(g => g.trim())
    .filter(g => g && g !== "O'zbekcha" && g !== "Filmlar" && g !== "O'zbek tiliga tarjima qilingan")
    .slice(0, 1)
    .join('');

  return (
    <div
      className="movie-card-container"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onClick={() => onSelect(movie)}
    >
      {/* Poster Frame */}
      <div
        className="movie-poster-frame"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '214 / 316',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#1b1b22',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease'
        }}
      >
        {/* Poster Image */}
        <img
          src={movie.poster}
          alt={movie.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.35s ease'
          }}
          className="movie-poster-img"
          onError={(e) => {
            // Fallback placeholder
            e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80';
          }}
        />

        {/* Age Rating Badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            zIndex: 2
          }}
        >
          {movie.rating}
        </div>

        {/* 4K or Quality Badge */}
        {movie.quality && movie.quality.includes('4K') && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#e41a4b',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '5px',
              zIndex: 2,
              letterSpacing: '0.04em'
            }}
          >
            4K
          </div>
        )}

        {/* Favorite Button (Quick action) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            color: favorited ? '#e41a4b' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            border: favorited ? '1px solid #e41a4b' : '1px solid rgba(255, 255, 255, 0.15)',
            transition: 'all 0.2s ease',
            opacity: favorited ? 1 : 0
          }}
          className="movie-fav-btn"
          title={favorited ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
        >
          <Heart size={16} fill={favorited ? '#e41a4b' : 'none'} />
        </button>

        {/* Hover Center Play Button */}
        <div
          className="movie-hover-play"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            zIndex: 3
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#e41a4b',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(228, 26, 75, 0.8)',
              transform: 'scale(0.85)',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="play-pulse-circle"
          >
            <Play size={24} fill="#fff" style={{ marginLeft: '3px' }} />
          </div>
        </div>

        {/* Bottom Metadata Gradient Strip */}
        <div
          className="movie-strip"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '12px',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            zIndex: 2
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#ffffff',
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%'
            }}
          >
            <span>{movie.year}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>, </span>
            <span>{(movie.countries || '').split(',')[0]}</span>
            {displayGenres && (
              <>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>, </span>
                <span>{displayGenres}</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Title & Ratings Beneath Card */}
      <div style={{ marginTop: '10px' }}>
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.25,
            whiteHeight: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginBottom: '6px'
          }}
          title={movie.name}
        >
          {movie.name}
        </h3>

        {/* Ratings Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: 600 }}>
          {/* Kinopoisk */}
          {movie.kinopoisk_rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ff6600' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="11" fill="#ff6600" />
                <path d="M7 6h3.2v4.8L14.4 6H18l-5.1 6.2L18 18h-3.6l-4.2-4.8V18H7V6z" fill="#ffffff" />
              </svg>
              <span style={{ color: '#e5e5e5' }}>{movie.kinopoisk_rating}</span>
            </div>
          )}

          {/* IMDb */}
          {movie.imdb_rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  backgroundColor: '#f5c518',
                  color: '#000000',
                  fontSize: '10px',
                  fontWeight: 900,
                  padding: '1px 4px',
                  borderRadius: '3px',
                  lineHeight: 1
                }}
              >
                IMDb
              </span>
              <span style={{ color: '#e5e5e5' }}>{movie.imdb_rating}</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .movie-card-container:hover .movie-poster-frame {
          transform: scale(1.06);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7);
        }
        .movie-card-container:hover .movie-hover-play {
          opacity: 1;
        }
        .movie-card-container:hover .play-pulse-circle {
          transform: scale(1);
        }
        .movie-card-container:hover .movie-strip {
          opacity: 1;
        }
        .movie-card-container:hover .movie-fav-btn {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
