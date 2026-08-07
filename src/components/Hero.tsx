import { useEffect, useRef } from 'react';
import SpecularButton from './SpecularButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideoUrl from '/hero-video.mp4?url';
import heroPosterUrl from '/IMG_3602.JPG?url';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Initial states
    gsap.set('.hero-nav', { y: -20, opacity: 0 });
    gsap.set('.eyebrow', { y: 30, opacity: 0 });
    gsap.set('h1', { y: 60, opacity: 0, scale: 0.9 });
    gsap.set('.hero-copy', { y: 40, opacity: 0 });
    gsap.set('.hero-button', { y: 20, opacity: 0, scale: 0.95 });
    gsap.set('.scroll-indicator', { y: 0, opacity: 0 });

    // Opening animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-nav', { y: 0, opacity: 1, duration: 0.8 })
      .to('.eyebrow', { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .to('h1', { y: 0, opacity: 1, scale: 1, duration: 1 }, '-=0.3')
      .to('.hero-copy', { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
      .to('.hero-button', { y: 0, opacity: 1, scale: 1, duration: 0.5 }, '-=0.3');

    // Scroll indicator animation
    gsap.to('.scroll-indicator', {
      y: 10,
      opacity: 0.6,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1.5
    });

    // Autoplay fallback: 浏览器自动播放策略阻止时，在首次用户交互后播放
    const video = hero.querySelector('video');
    if (video) {
      const tryPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // 自动播放被阻止，等待用户交互
          });
        }
      };

      // 尝试立即播放
      tryPlay();

      // 监听首次用户交互（点击/触摸/滚动/键盘）
      const events: Array<keyof DocumentEventMap> = ['click', 'touchstart', 'scroll', 'keydown'];
      const onUserInteract = () => {
        tryPlay();
        events.forEach((evt) => document.removeEventListener(evt, onUserInteract));
      };
      events.forEach((evt) => document.addEventListener(evt, onUserInteract, { once: true, passive: true }));
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <video
        className="hero-video"
        src={heroVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={heroPosterUrl}
        disablePictureInPicture
        disableRemotePlayback
        x5-video-player-type="h5"
        x5-video-orientation="portrait"
        x5-playsinline="true"
        webkit-playsinline="true"
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <header className="hero-nav">
          <div className="logo">视觉 / AI / 品牌</div>
          <nav>
            <a href="#experience">经历</a>
            <a href="#projects">作品</a>
            <a href="#strengths">优势</a>
            <a href="#contact">联系</a>
          </nav>
        </header>
        <div className="hero-content">
          <p className="eyebrow">视觉设计师 · AI 设计师 · 品牌设计师</p>
          <h1>用视觉与科技构建高级品牌表达</h1>
          <p className="hero-copy">
            专注于品牌策略、数字体验与沉浸式视觉系统，打造高级、克制、有质感的作品。
          </p>
          <SpecularButton
            size="lg"
            radius={999}
            tintOpacity={0}
            textColor="#f5f5f5"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={0.8}
            className="hero-button"
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            联系我
          </SpecularButton>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
