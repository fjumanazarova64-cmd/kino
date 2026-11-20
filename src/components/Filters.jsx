import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, X, Sparkles } from 'lucide-react';

export default function Filters({
  genres,
  countries,
  years,
  selectedGenre,
  setSelectedGenre,
  selectedCountry,
  setSelectedCountry,
  selectedYear,
  setSelectedYear,
  sortBy,
  setSortBy,
  quickFilter,
  setQuickFilter,
  onReset
}) {
  const [isOpen, setIsOpen] = useState(true);

  const hasActiveFilters = selectedGenre || selectedCountry || selectedYear || sortBy !== 'popularity' || quickFilter !== 'all';

  return (
    <section style={{ marginBottom: '28px' }}>
      {/* Top Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '12px',
            backgroundColor: isOpen ? 'rgba(228, 26, 75, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            color: isOpen ? '#e41a4b' : '#ffffff',
            border: isOpen ? '1px solid rgba(228, 26, 75, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'all 0.2s ease'
          }}
        >
          <SlidersHorizontal size={16} />
          <span>{isOpen ? 'Filtrlarni yashirish' : 'Filtrlarni ko’rsatish'}</span>
          <ChevronDown
            size={16}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease'
            }}
          />
        </button>

        {/* Quick Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Barchasi' },
            { id: '4k', label: '4K Ultra HD', icon: Sparkles },
            { id: 'top_rated', label: 'Top Reyting (> 7.5)' },
            { id: 'recent', label: 'Yangi filmlar (2020+)' }
          ].map((chip) => {
            const isActive = quickFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setQuickFilter(chip.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: isActive ? '#e41a4b' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#ffffff' : '#a1a1aa',
                  border: isActive ? '1px solid #e41a4b' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                {chip.icon && <chip.icon size={13} />}
                <span>{chip.label}</span>
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={onReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '7px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}
            >
              <X size={14} />
              <span>Tozalash</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Dropdown Filters */}
      {isOpen && (
        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'rgba(20, 20, 24, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            animation: 'fadeIn 0.25s ease forwards'
          }}
        >
          {/* Genre select */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Janr
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ background: '#141418', color: '#fff' }}>Barcha janrlar</option>
                {genres.map((g) => (
                  <option key={g} value={g} style={{ background: '#141418', color: '#fff' }}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} color="#71717a" style={{ position: 'absolute', right: '14px', top: '14px', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Country select */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Mamlakat
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ background: '#141418', color: '#fff' }}>Barcha mamlakatlar</option>
                {countries.map((c) => (
                  <option key={c} value={c} style={{ background: '#141418', color: '#fff' }}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} color="#71717a" style={{ position: 'absolute', right: '14px', top: '14px', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Year select */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Chiqqan yili
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ background: '#141418', color: '#fff' }}>Barcha yillar</option>
                {years.map((y) => (
                  <option key={y} value={y} style={{ background: '#141418', color: '#fff' }}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} color="#71717a" style={{ position: 'absolute', right: '14px', top: '14px', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#a1a1aa', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Saralash
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="popularity" style={{ background: '#141418', color: '#fff' }}>Mashhurligi bo'yicha</option>
                <option value="year_desc" style={{ background: '#141418', color: '#fff' }}>Eng yangilari</option>
                <option value="kinopoisk" style={{ background: '#141418', color: '#fff' }}>Reyting (Kinopoisk)</option>
                <option value="imdb" style={{ background: '#141418', color: '#fff' }}>Reyting (IMDb)</option>
                <option value="title" style={{ background: '#141418', color: '#fff' }}>Nomi bo'yicha (A-Z)</option>
              </select>
              <ChevronDown size={16} color="#71717a" style={{ position: 'absolute', right: '14px', top: '14px', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
