import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Film } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, movies, onSelectMovie }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? movies.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        (m.genres && m.genres.toLowerCase().includes(query.toLowerCase())) ||
        (m.countries && m.countries.toLowerCase().includes(query.toLowerCase())) ||
        (m.year && m.year.toString().includes(query))
      ).slice(0, 8)
    : [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(16px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#16161b',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          overflow: 'hidden',
          animation: 'scaleUp 0.2s ease forwards'
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            gap: '14px'
          }}
        >
          <Search size={22} color="#e41a4b" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kino nomi, janri yoki yili bo'yicha qidiring..."
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '17px',
              color: '#ffffff',
              fontWeight: 500
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: '#71717a' }}>
              <X size={20} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#a1a1aa',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '480px', overflowY: 'auto', padding: '12px' }}>
          {query.trim() === '' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#71717a' }}>
              <Search size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
              <p style={{ fontSize: '14px' }}>Qidirmoqchi bo'lgan kino nomini kiriting...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  onSelectMovie(m);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <img
                  src={m.poster_small || m.poster}
                  alt={m.name}
                  style={{ width: '44px', height: '62px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {m.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#a1a1aa' }}>
                    {m.year} • {m.countries} • <span style={{ color: '#e41a4b' }}>{m.genres}</span>
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f5c518', fontSize: '13px', fontWeight: 700 }}>
                  <Star size={14} fill="#f5c518" /> {m.kinopoisk_rating}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#71717a' }}>
              <Film size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
              <p style={{ fontSize: '14px' }}>"{query}" bo'yicha hech qanday film topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
