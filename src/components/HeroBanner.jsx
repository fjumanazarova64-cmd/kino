import React, { useState, useEffect } from 'react';
import { Play, Info, Heart, ChevronLeft, ChevronRight, Star, Clock, Sparkles } from 'lucide-react';

export default function HeroBanner({ featuredMovies, onSelectMovie, onToggleFavorite, isFavorite }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!featuredMovies || featuredMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredMovies]);

  if (!featuredMovies || featuredMovies.length === 0) return null;
  const movie = featuredMovies[currentIndex];
  const favorited = isFavorite(movie.id);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '490px',
        overflow: 'hidden',
        borderRadius: '24px',
        margin: '16px auto 36px',
        backgroundColor: '#0e0e12',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
      className="hero-wrapper"
    >
      {/* 1. Ambient Background Layer */}
      <div
        key={`ambient-${movie.id}`}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${movie.poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'blur(60px) brightness(0.2)',
          opacity: 0.8,
          transform: 'scale(1.15)',
          transition: 'all 0.8s ease'
        }}
      />

      {/* 2. Full-height Right Image (Chiziqqa moslab to'liq cho'zilgan va to'liq ko'rinadigan rasm) */}
      <div
        key={`poster-${movie.id}`}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '56%',
          height: '100%',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          overflow: 'hidden'
        }}
        className="hero-right-image-container"
      >
        {/* Ambient fill behind sharp poster */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${movie.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            filter: 'blur(35px) brightness(0.35)',
            opacity: 0.7
          }}
        />

        {/* Sharp, full-height poster touching top and bottom border lines */}
        <img
          src={movie.poster}
          alt={movie.name}
          style={{
            position: 'relative',
            height: '100%',
            width: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            objectPosition: 'right center',
            display: 'block',
            zIndex: 2,
            filter: 'drop-shadow(-20px 0 35px rgba(0, 0, 0, 0.85))',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 8%, black 25%)',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 8%, black 25%)'
          }}
          className="hero-right-img"
        />

        {/* Subtle top & bottom line shadow blend */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(14,14,18,0.25) 0%, transparent 15%, transparent 85%, rgba(14,14,18,0.5) 100%)',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 3. Dark gradient on the left to keep text ultra-readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #0e0e12 0%, #0e0e12 36%, rgba(14, 14, 18, 0.92) 52%, rgba(14, 14, 18, 0.2) 75%, transparent 100%)',
          zIndex: 2
        }}
      />

      {/* 4. Left Content: Title, metadata, description, buttons */}
      <div
        className="container"
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 3,
          paddingTop: '20px',
          paddingBottom: '20px'
        }}
      >
        <div style={{ maxWidth: '580px' }}>
          
          {/* Badge row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: '#e41a4b',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '6px',
                letterSpacing: '0.04em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 0 16px rgba(228, 26, 75, 0.45)'
              }}
            >
              <Sparkles size={13} /> TVCOM PREMYERA
            </span>

            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '6px',
                backdropFilter: 'blur(8px)'
              }}
            >
              {movie.quality}
            </span>

            <span
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              {movie.rating}
            </span>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#f5c518' }}>
                <Star size={13} fill="#f5c518" /> Kinopoisk {movie.kinopoisk_rating}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                IMDb {movie.imdb_rating}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '44px',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '14px',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)'
            }}
            className="hero-title"
          >
            {movie.name}
          </h1>

          {/* Metadata info */}
          <p
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
              fontWeight: 500,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.countries}</span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {movie.duration_str}
            </span>
            <span>•</span>
            <span style={{ color: '#e41a4b', fontWeight: 600 }}>{movie.genres}</span>
          </p>

          {/* Synopsis */}
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.84)',
              lineHeight: 1.6,
              marginBottom: '28px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onSelectMovie(movie)}
              style={{
                height: '48px',
                padding: '0 28px',
                borderRadius: '12px',
                backgroundColor: '#e41a4b',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 0 24px rgba(228, 26, 75, 0.5)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff1e56';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(228, 26, 75, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e41a4b';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(228, 26, 75, 0.5)';
              }}
            >
              <Play size={18} fill="#fff" />
              <span>Tomosha qilish</span>
            </button>

            <button
              onClick={() => onSelectMovie(movie)}
              style={{
                height: '48px',
                padding: '0 20px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Info size={17} />
              <span>Batafsil</span>
            </button>

            <button
              onClick={() => onToggleFavorite(movie.id)}
              style={{
                height: '48px',
                width: '48px',
                borderRadius: '12px',
                backgroundColor: favorited ? 'rgba(228, 26, 75, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                color: favorited ? '#e41a4b' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: favorited ? '1px solid #e41a4b' : '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title={favorited ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
            >
              <Heart size={20} fill={favorited ? '#e41a4b' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Indicators / Navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 4
        }}
      >
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e41a4b'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)'}
        >
          <ChevronLeft size={18} />
        </button>

        {featuredMovies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: idx === currentIndex ? '#e41a4b' : 'rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e41a4b'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)'}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-right-image-container {
            width: 75% !important;
            opacity: 0.55 !important;
          }
          .hero-title {
            font-size: 30px !important;
          }
        }
        @media (max-width: 600px) {
          .hero-wrapper {
            height: 480px !important;
            border-radius: 16px !important;
          }
          .hero-right-image-container {
            width: 100% !important;
            opacity: 0.35 !important;
          }
          .hero-title {
            font-size: 26px !important;
          }
        }
      `}</style>
    </div>
  );
}
