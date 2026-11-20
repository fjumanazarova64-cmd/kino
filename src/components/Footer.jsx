import React from 'react';
import { Phone, Mail, Tv, Download } from 'lucide-react';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TelegramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer({ onNavClick }) {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0c',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '60px 0 40px',
        color: '#a1a1aa'
      }}
    >
      <div className="container">
        
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px 30px',
            marginBottom: '48px'
          }}
        >
          {/* Tech Support Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
              Texnik yordam
            </h3>
            <p style={{ fontSize: '14px', color: '#71717a', marginBottom: '14px' }}>
              Savollaringizga javob berishdan mamnunmiz
            </p>
            <a
              href="tel:+998712058555"
              style={{
                display: 'block',
                fontSize: '22px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '-0.01em'
              }}
            >
              71 205 85 55
            </a>
            <a
              href="mailto:support@tvcom.uz"
              style={{
                display: 'block',
                fontSize: '14px',
                color: '#e41a4b',
                fontWeight: 600,
                marginBottom: '20px'
              }}
            >
              support@tvcom.uz
            </a>

            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              Marketing masalalari bo’yicha
            </h4>
            <a
              href="mailto:marketing@tvcom.uz"
              style={{ fontSize: '14px', color: '#a1a1aa', textDecoration: 'underline' }}
            >
              marketing@tvcom.uz
            </a>
          </div>

          {/* Bosh menyu Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Bosh menyu
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'home', label: 'Bosh sahifa' },
                { id: 'tv', label: 'Telekanallar' },
                { id: 'movies', label: 'Filmlar' },
                { id: 'serials', label: 'Seriallar' },
                { id: 'kids', label: 'Bolalarga' },
                { id: 'uzb', label: 'O’zbek tilida', isBold: true },
                { id: 'favourites', label: 'Meniki' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavClick(item.id)}
                    style={{
                      fontSize: '14px',
                      color: item.isBold ? '#e41a4b' : '#a1a1aa',
                      fontWeight: item.isBold ? 700 : 500,
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = item.isBold ? '#e41a4b' : '#a1a1aa'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Yordam Column */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Yordam
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['To’lov usullari', 'Obunalar', 'Savollar va javoblar', 'TVCOM’ni o’rnatish'].map((txt, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontSize: '14px', color: '#a1a1aa', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
                  >
                    {txt}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Biz haqimizda & Apps */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Biz haqimizda
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {['Yangiliklar', 'Kompaniya haqida', 'TVCOMda ishlash', 'Maxfiylik siyosati', 'Foydalanish shartlari'].map((txt, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ fontSize: '14px', color: '#a1a1aa', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
                  >
                    {txt}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              {[
                { icon: FacebookIcon, href: 'https://www.facebook.com/tvcom.uz/', color: '#1877f2' },
                { icon: InstagramIcon, href: 'https://www.instagram.com/tvcom.uz_official', color: '#e4405f' },
                { icon: TelegramIcon, href: 'https://t.me/tvcom_uz', color: '#0088cc' },
                { icon: YoutubeIcon, href: 'https://www.youtube.com/@tvcom_uzb', color: '#ff0000' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = s.color;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '13px',
            color: '#71717a'
          }}
        >
          <p>© 2026 «TVPLUS» MChJ. Barcha huquqlar himoyalangan.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>O'zbekiston Milliy Cinema Platformasi</span>
            <span>•</span>
            <span style={{ color: '#e41a4b', fontWeight: 600 }}>Full HD / 4K</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
