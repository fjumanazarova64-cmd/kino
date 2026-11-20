import React, { useState, useEffect } from 'react';
import { Search, LogIn, Menu, X, Radio, Tv, Film, Clapperboard, Heart, Baby, Globe } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  favoritesCount,
  currentLang,
  setCurrentLang 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Bosh sahifa', icon: Film },
    { id: 'tv', label: 'Telekanallar', icon: Tv },
    { id: 'uzb', label: 'O’zbek tilida', isCurrent: true, icon: Film },
    { id: 'movies', label: 'Filmlar', icon: Film },
    { id: 'serials', label: 'Seriallar', icon: Clapperboard },
    { id: 'favourites', label: 'Meniki', badge: favoritesCount, icon: Heart },
    { id: 'kids', label: 'Bolalarga', icon: Baby },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isScrolled ? 'rgba(12, 12, 14, 0.95)' : 'rgba(12, 12, 14, 0.75)',
          backdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          
          {/* Logo & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {/* TVCOM Exact SVG Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('uzb'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              aria-label="TVCOM"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="132" height="26" fill="none" viewBox="0 0 141 28">
                <path fill="#fff" d="M23.14 2.74H0v5.53h8.48v16.98h6.17V8.27h8.49zm46.4 15.58a5 5 0 0 1-2.24 1.53q-1.38.52-3.19.51a8 8 0 0 1-3.58-.76q-1.51-.76-2.31-2.2a7 7 0 0 1-.8-3.4q0-1.98.8-3.4a5.3 5.3 0 0 1 2.3-2.2q1.52-.75 3.6-.76 1.8 0 3.18.53 1.37.54 2.24 1.54.86 1.02 1.16 2.45h6.17a10.3 10.3 0 0 0-2.02-5.2 11 11 0 0 0-4.44-3.47 15 15 0 0 0-6.3-1.23q-3.88 0-6.79 1.47a11 11 0 0 0-4.52 4.11 11.6 11.6 0 0 0-1.62 6.15q0 3.51 1.62 6.15a11 11 0 0 0 4.52 4.11q2.9 1.47 6.8 1.47 3.55 0 6.3-1.23 2.73-1.23 4.43-3.46a10.4 10.4 0 0 0 2.02-5.21H70.7q-.3 1.46-1.16 2.5m34.11-10.47a11 11 0 0 0-4.63-4.11 15.5 15.5 0 0 0-6.94-1.47q-3.96 0-6.93 1.47a11 11 0 0 0-4.63 4.1A11.4 11.4 0 0 0 78.88 14q0 3.51 1.64 6.15a11 11 0 0 0 4.63 4.1q2.98 1.48 6.93 1.48c2.63 0 4.97-.5 6.94-1.47a11 11 0 0 0 4.63-4.11A11.3 11.3 0 0 0 105.3 14q0-3.51-1.66-6.15m-5.42 9.45a5.6 5.6 0 0 1-2.42 2.13q-1.57.75-3.73.75a8.5 8.5 0 0 1-3.7-.75 5.6 5.6 0 0 1-2.44-2.13 6 6 0 0 1-.85-3.3q0-1.91.85-3.3a5.7 5.7 0 0 1 2.43-2.13 9 9 0 0 1 3.71-.75c1.42 0 2.7.25 3.73.75a5.6 5.6 0 0 1 2.42 2.13q.85 1.4.85 3.3 0 1.91-.85 3.3M131.5 2.74l-6.73 16.44-6.8-16.44h-9.48v22.5h5.84V8.29l7.3 16.97h6.22l7.3-17.08v17.08H141V2.75z"/>
                <path fill="#FF0054" d="M48.8 14q-.01 1.18-.46 2.23v.01l-2.37-1.05-19.41-8.61V0l19.1 8.99A5.6 5.6 0 0 1 48.81 14z"/>
                <path fill="#B10036" d="M48.33 16.23q-.15.36-.36.68a5.5 5.5 0 0 1-2.34 2.1L26.54 28v-6.66l16.54-7.4-16.54-7.36 19.41 8.61z"/>
                <path fill="#191919" d="M48.34 16.22v.01q-.15.36-.36.68l-7.2-1.95 2.3-1.03 2.9 1.25z" opacity=".45"/>
              </svg>
            </a>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="desktop-nav">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }}
                  >
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <span
                        style={{
                          backgroundColor: '#e41a4b',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '10px'
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Radio Pill */}
              <button
                onClick={() => setActiveTab('radio')}
                style={{
                  padding: '7px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Radio size={14} color="#e41a4b" />
                <span>Radio</span>
              </button>
            </nav>
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Language Switch */}
            <button
              onClick={() => setCurrentLang(currentLang === 'UZ' ? 'RU' : 'UZ')}
              style={{
                height: '40px',
                padding: '0 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'}
              title="Tilni o'zgartirish"
            >
              <Globe size={15} color="#a1a1aa" />
              <span>{currentLang}</span>
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearch}
              style={{
                height: '40px',
                width: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = '#e41a4b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
              aria-label="Qidiruv"
              title="Qidiruv (Ctrl + K)"
            >
              <Search size={18} />
            </button>

            {/* Login / Profile button */}
            <button
              style={{
                height: '40px',
                padding: '0 16px',
                borderRadius: '10px',
                backgroundColor: '#e41a4b',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 15px rgba(228, 26, 75, 0.35)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff1e56';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(228, 26, 75, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e41a4b';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(228, 26, 75, 0.35)';
              }}
            >
              <LogIn size={16} />
              <span className="login-text">Kirish</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-burger"
              style={{
                height: '40px',
                width: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '72px',
            backgroundColor: 'rgba(12, 12, 14, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: isActive ? 'rgba(228, 26, 75, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#e41a4b' : '#fff',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} />
                  <span>{link.label}</span>
                </div>
                {link.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: '#e41a4b',
                      color: '#fff',
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-burger {
            display: flex !important;
          }
          .login-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
