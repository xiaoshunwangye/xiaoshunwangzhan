import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

interface Track {
  name: string;
  src: string;
}

const PLAYLIST: Track[] = [
  { name: '踏浪', src: '/audio/踏浪.mp3' },
  { name: '精卫', src: '/audio/精卫.mp3' },
];

const formatTime = (time: number): string => {
  if (isNaN(time) || !isFinite(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);

  const currentTrack = playlist[currentIndex];

  // 自动扫描播放列表
  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
    fetch(`${baseUrl}/audio-list.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const base = import.meta.env.BASE_URL;
        const tracks = (data.playlist || []).map((track: Track) => ({
          ...track,
          src: track.src.startsWith('/') ? base + track.src.slice(1) : track.src,
        }));
        setPlaylist(tracks);
        // 加载完成后立即给 audio 设置初始 src，否则 audio.play() 会因无 src 而失败
        if (tracks.length > 0 && audioRef.current) {
          audioRef.current.src = tracks[0].src;
          audioRef.current.load();
        }
      })
      .catch((err) => {
        // 如果配置文件不存在或请求失败，使用空播放列表
        console.error('[AudioPlayer] failed to load playlist:', err);
        setPlaylist([]);
      });
  }, []);

  const switchTrack = (index: number) => {
    const audio = audioRef.current;
    if (!audio || playlist.length === 0) return;
    setCurrentIndex(index);
    audio.src = playlist[index].src;
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(() => {});
    setShowPlaylist(false);
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    switchTrack(nextIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (playlist.length > 1) {
        playNext();
      } else {
        setIsPlaying(false);
      }
    };
    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement;
      console.error('[AudioPlayer] error:', audioEl.error?.message, audioEl.error?.code);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    const handleClickOutside = (e: MouseEvent) => {
      if (playlistRef.current && !playlistRef.current.contains(e.target as Node)) {
        setShowPlaylist(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // 如果还没有 src 但 playlist 已加载，先设置 src
    if (!audio.src && playlist.length > 0) {
      audio.src = playlist[currentIndex].src;
      audio.load();
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch((err) => {
          console.error('[AudioPlayer] play failed:', err);
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(true);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const playBtnClass = isPlaying ? 'audio-play-btn playing' : 'audio-play-btn';
  const playlistBtnClass = showPlaylist ? 'audio-playlist-btn active' : 'audio-playlist-btn';

  return (
    <div 
      className={`audio-player ${isPlaying ? 'is-playing' : ''}`}
    >
      <audio ref={audioRef} preload="metadata" loop={playlist.length === 1} />
      
      <button className={playBtnClass} onClick={togglePlay} aria-label={isPlaying ? '暂停' : '播放'}>
        <span className="play-btn-pulse" />
        <span className="play-btn-core">
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="3.5" height="12" rx="1.2" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1.2" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="3,1 13,7 3,13" />
            </svg>
          )}
        </span>
      </button>

      <div className="audio-info-section">
        <span className="audio-track-name">{currentTrack?.name || '未加载曲目'}</span>
        <div className="audio-progress-wrap" ref={progressRef} onClick={handleProgressClick}>
          <div className="audio-progress-bg">
            <div className="audio-progress-fill" style={{ width: progressPercent + '%' }} />
            <div className="audio-progress-glow" style={{ width: progressPercent + '%' }} />
          </div>
          <div className="audio-progress-thumb" style={{ left: `calc(${progressPercent}% - 4px)` }} />
        </div>
      </div>

      <div className="audio-time-section">
        <span className="audio-time current">{formatTime(currentTime)}</span>
        <span className="audio-time-sep">/</span>
        <span className="audio-time total">{formatTime(duration)}</span>
      </div>

      {playlist.length > 1 && (
        <>
          <button className="audio-next-btn" onClick={playNext} aria-label="下一首" title="下一首">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="2,1 10,7 2,13" />
              <rect x="10.5" y="1" width="2" height="12" rx="0.8" />
            </svg>
          </button>

          <div className="audio-playlist-wrapper" ref={playlistRef}>
            <button className={playlistBtnClass} onClick={() => setShowPlaylist(!showPlaylist)} aria-label="播放列表" title="播放列表">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <line x1="2" y1="3.5" x2="12" y2="3.5" />
                <line x1="2" y1="7" x2="12" y2="7" />
                <line x1="2" y1="10.5" x2="12" y2="10.5" />
              </svg>
            </button>
            {showPlaylist && (
              <div className="audio-playlist">
                <div className="audio-playlist-header">播放列表</div>
                {playlist.map((track, index) => (
                  <button 
                    key={index} 
                    className={index === currentIndex ? 'audio-playlist-item active' : 'audio-playlist-item'} 
                    onClick={() => switchTrack(index)}
                  >
                    <span className="track-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="track-name">{track.name}</span>
                    {index === currentIndex && isPlaying && (
                      <span className="playing-indicator">
                        <span /><span /><span /><span />
                      </span>
                    )}
                    {index !== currentIndex && (
                      <span className="track-play-icon">
                        <svg width="9" height="9" viewBox="0 0 14 14" fill="currentColor">
                          <polygon points="3,1 13,7 3,13" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <div className="audio-volume-wrap">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" className="audio-volume-icon">
          <path d="M1.5 4.5V9.5C1.5 9.78 1.72 10 2 10H3.5L6.5 13V1L3.5 4H2C1.72 4 1.5 4.22 1.5 4.5Z" />
          <path d="M9 3.5C8.2 3.5 7.5 4 7.15 4.7L9 6.5L7.15 8.3C7.5 9 8.2 9.5 9 9.5C10.1 9.5 11 8.6 11 7.5C11 6.4 10.1 5.5 9 5.5V3.5Z" />
          {volume > 0.3 && <path d="M11.5 2C10.6 2 9.85 2.35 9.3 2.95L10.5 4.15L9.3 5.35C9.85 5.95 10.6 6.3 11.5 6.3C12.6 6.3 13.5 5.4 13.5 4.3C13.5 3.2 12.6 2.3 11.5 2.3V2Z" />}
        </svg>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange} 
          className="audio-volume-slider" 
          aria-label="音量" 
          style={{
            background: `linear-gradient(to right, #63b3ed ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;