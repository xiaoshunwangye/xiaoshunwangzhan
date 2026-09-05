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

// Fisher–Yates 洗牌，返回索引的随机排列
function buildShuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  // 播放模式：'order' 顺序播放 | 'random' 随机播放 | 'loop' 单曲循环
  const [playMode, setPlayMode] = useState<'order' | 'random' | 'loop'>('order');
  const progressRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);
  // 用 ref 镜像最新 state，供 ended 事件回调读取（避免 useEffect 闭包过期）
  const playModeRef = useRef<'order' | 'random' | 'loop'>('order');
  // 随机模式的洗牌队列：保存"接下来要播的索引顺序"
  const shuffleQueueRef = useRef<number[]>([]);
  const playlistStateRef = useRef<Track[]>([]);
  const currentIndexRef = useRef(0);

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
    // 随机模式下：把刚选中的曲目从洗牌队列移除，避免下一首又回到它
    if (playMode === 'random') {
      shuffleQueueRef.current = shuffleQueueRef.current.filter((i) => i !== index);
    }
    audio.src = playlist[index].src;
    audio.load();
    // 等待音频数据就绪后再播放
    const onCanPlay = () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    audio.addEventListener('canplay', onCanPlay);
    setShowPlaylist(false);
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    let nextIndex: number;
    if (playlist.length === 1) {
      nextIndex = 0;
    } else if (playMode === 'random') {
      // 随机模式：从洗牌队列取下一首；队空则重洗
      if (shuffleQueueRef.current.length === 0) {
        shuffleQueueRef.current = buildShuffledIndices(playlist.length);
        if (
          shuffleQueueRef.current.length > 1 &&
          shuffleQueueRef.current[0] === currentIndex
        ) {
          const first = shuffleQueueRef.current.shift()!;
          shuffleQueueRef.current.push(first);
        }
      }
      nextIndex = shuffleQueueRef.current.shift()!;
    } else {
      // 顺序播放：到达末尾后回到开头
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    switchTrack(nextIndex);
  };

  const cyclePlayMode = () => {
    // 顺序 -> 随机 -> 单曲循环 -> 顺序
    setPlayMode((m) => {
      const next = m === 'order' ? 'random' : m === 'random' ? 'loop' : 'order';
      // 切到随机模式时：重置洗牌队列，并把当前曲目挪到队尾避免立刻重播
      if (next === 'random') {
        const list = playlistStateRef.current;
        const cur = currentIndexRef.current;
        const q = buildShuffledIndices(list.length);
        if (q.length > 1 && q[0] === cur) {
          const first = q.shift()!;
          q.push(first);
        }
        shuffleQueueRef.current = q;
      } else {
        // 切出随机模式：清空队列
        shuffleQueueRef.current = [];
      }
      return next;
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleError = (e: Event) => {
      const audioEl = e.target as HTMLAudioElement;
      console.error('[AudioPlayer] error:', audioEl.error?.message, audioEl.error?.code);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
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
      audio.removeEventListener('error', handleError);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 单独订阅 ended：用 ref 持有最新 state，避免 useEffect 闭包过期
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      // 单曲循环：重新从头播放当前曲目
      if (playModeRef.current === 'loop') {
        audio.currentTime = 0;
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
        return;
      }
      const list = playlistStateRef.current;
      if (list.length > 1) {
        const mode = playModeRef.current;
        const cur = currentIndexRef.current;
        let nextIndex: number;
        if (mode === 'random') {
          // 洗牌队列为空 → 重新洗；如果队首就是当前曲目，把它挪到队尾
          if (shuffleQueueRef.current.length === 0) {
            shuffleQueueRef.current = buildShuffledIndices(list.length);
            if (
              shuffleQueueRef.current.length > 1 &&
              shuffleQueueRef.current[0] === cur
            ) {
              const first = shuffleQueueRef.current.shift()!;
              shuffleQueueRef.current.push(first);
            }
          }
          nextIndex = shuffleQueueRef.current.shift()!;
        } else {
          nextIndex = (cur + 1) % list.length;
        }
        setCurrentIndex(nextIndex);
        audio.src = list[nextIndex].src;
        audio.load();
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        };
        audio.addEventListener('canplay', onCanPlay);
      } else {
        setIsPlaying(false);
      }
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 把 state 同步到 ref，给 ended 等只在挂载时订阅的回调读取最新值
  useEffect(() => {
    playModeRef.current = playMode;
  }, [playMode]);
  useEffect(() => {
    playlistStateRef.current = playlist;
  }, [playlist]);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // 如果还没有 src，先加载
      if (!audio.src && playlist.length > 0) {
        audio.src = playlist[currentIndex].src;
        audio.load();
        // 等待音频数据就绪后再播放
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        };
        audio.addEventListener('canplay', onCanPlay);
        return;
      }
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => {});
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
      <audio ref={audioRef} preload="metadata" />
      
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

      <button
        className={`audio-mode-btn audio-mode-${playMode}`}
        onClick={cyclePlayMode}
        aria-label={playMode === 'order' ? '顺序播放' : playMode === 'random' ? '随机播放' : '单曲循环'}
        title={playMode === 'order' ? '顺序播放' : playMode === 'random' ? '随机播放' : '单曲循环'}
      >
        {playMode === 'order' && (
          // 顺序播放图标：循环箭头
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 5.5C2.5 3.5 4.2 2 6.5 2C8.8 2 10.5 3.5 11 5.5" />
            <polyline points="9.5,1 11,5.5 6.5,5.5" />
            <path d="M12 8.5C11.5 10.5 9.8 12 7.5 12C5.2 12 3.5 10.5 3 8.5" />
            <polyline points="4.5,13 3,8.5 7.5,8.5" />
          </svg>
        )}
        {playMode === 'random' && (
          // 随机播放图标：交叉箭头
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,3 4,3 11,11 11,9" />
            <polyline points="11,3 9,3 2,11 2,9" />
            <polyline points="11,1 13,3 11,5" />
            <polyline points="3,9 1,11 3,13" />
          </svg>
        )}
        {playMode === 'loop' && (
          // 单曲循环图标：循环箭头 + 数字 1
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6C2.5 4 4.2 2.5 6.5 2.5C8.8 2.5 10.5 4 11 6" />
            <polyline points="9.5,1.5 11,6 6.5,6" />
            <path d="M12 8C11.5 10 9.8 11.5 7.5 11.5C5.2 11.5 3.5 10 3 8" />
            <polyline points="4.5,12.5 3,8 7.5,8" />
            <text x="7" y="9.5" fontSize="5.5" fontWeight="700" fill="currentColor" stroke="none" textAnchor="middle">1</text>
          </svg>
        )}
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