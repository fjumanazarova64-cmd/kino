import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, 
  Share2, Heart, Star, Clock, Check, Sparkles 
} from 'lucide-react';

export default function MoviePlayerModal({
  movie,
  onClose,
  onToggleFavorite,
  isFavorite,
  onShare,
  allMovies,
  onSelectMovie
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState("O'zbekcha (Professional)");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);

  const favorited = isFavorite(movie.id);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Find 4 related movies with similar genres
  const relatedMovies = allMovies
    .filter(m => m.id !== movie.id)
    .slice(0, 4);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '24px 16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          backgroundColor: '#141418',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e41a4b'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}
        >
          <X size={20} />
        </button>

        {/* Video Player Section */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#000000',
            overflow: 'hidden'
          }}
          className="video-container"
        >
          <video
            ref={videoRef}
            src={movie.video_url}
            poster={movie.backdrop || movie.poster}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onTimeUpdate={() => setCurrentTime(videoRef.current ? videoRef.current.currentTime : 0)}
            onLoadedMetadata={() => setDuration(videoRef.current ? videoRef.current.duration : 0)}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Big Center Play Button when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  backgroundColor: '#e41a4b',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 35px rgba(228, 26, 75, 0.9)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Play size={36} fill="#fff" style={{ marginLeft: '4px' }} />
              </div>
            </div>
          )}

          {/* Custom Controls Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              zIndex: 10
            }}
          >
            {/* Progress Slider */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: '100%',
                accentColor: '#e41a4b',
                cursor: 'pointer',
                height: '5px'
              }}
            />

            {/* Controls row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={togglePlay} style={{ color: '#fff' }}>
                  {isPlaying ? <Pause size={22} fill="#fff" /> : <Play size={22} fill="#fff" />}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={toggleMute} style={{ color: '#fff' }}>
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    style={{ width: '80px', accentColor: '#e41a4b', height: '4px' }}
                  />
                </div>

                <span style={{ fontSize: '13px', color: '#cacaca' }}>
                  {formatTime(currentTime)} / {formatTime(duration || movie.duration * 60)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Audio track selector */}
                <select
                  value={selectedAudio}
                  onChange={(e) => setSelectedAudio(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                >
                  <option value="O'zbekcha (Professional)" style={{ background: '#141418' }}>O'zbekcha Dublyaj</option>
                  <option value="Original" style={{ background: '#141418' }}>Original audio</option>
                </select>

                <button onClick={toggleFullscreen} style={{ color: '#fff' }}>
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Info & Details */}
        <div style={{ padding: '32px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            
            <div style={{ flex: '1 1 500px' }}>
              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#e41a4b', color: '#fff', fontSize: '12px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                  TVCOM O'ZBEKCHA
                </span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                  {movie.quality}
                </span>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                  {movie.rating}
                </span>
                <span style={{ color: '#f5c518', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={13} fill="#f5c518" /> Kinopoisk {movie.kinopoisk_rating}
                </span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>
                  IMDb {movie.imdb_rating}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>
                {movie.name}
              </h2>

              {/* Metadata */}
              <p style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '18px' }}>
                {movie.year} • {movie.countries} • {movie.duration_str} • <span style={{ color: '#e41a4b' }}>{movie.genres}</span>
              </p>

              {/* Description */}
              <p style={{ fontSize: '15px', color: '#e1e1e1', lineHeight: 1.7, marginBottom: '24px' }}>
                {movie.description}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onToggleFavorite(movie.id)}
                style={{
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '12px',
                  backgroundColor: favorited ? 'rgba(228, 26, 75, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                  color: favorited ? '#e41a4b' : '#fff',
                  border: favorited ? '1px solid #e41a4b' : '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                <Heart size={18} fill={favorited ? '#e41a4b' : 'none'} />
                <span>{favorited ? "Saqlangan" : "Sevimlilar"}</span>
              </button>

              <button
                onClick={() => onShare(movie)}
                style={{
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                <Share2 size={18} />
                <span>Ulashish</span>
              </button>
            </div>
          </div>

          {/* Related movies */}
          <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              O'xshash kinolar
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {relatedMovies.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectMovie(rel)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                >
                  <img
                    src={rel.poster_small || rel.poster}
                    alt={rel.name}
                    style={{ width: '48px', height: '68px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {rel.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#a1a1aa' }}>
                      {rel.year} • {rel.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
