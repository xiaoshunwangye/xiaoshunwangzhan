import { useEffect, useRef } from 'react';
import SpecularButton from './SpecularButton';
import PillNav from './PillNav';
import AudioPlayer from './AudioPlayer';
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
      // 视频 preload="none"，首次用户交互时触发加载
      const handleLoad = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
        video.removeEventListener('loadeddata', handleLoad);
      };
      video.addEventListener('loadeddata', handleLoad);

      // 监听首次用户交互触发视频加载
      const events: Array<keyof DocumentEventMap> = ['click', 'touchstart', 'scroll', 'keydown'];
      const onUserInteract = () => {
        video?.play().catch(() => {});
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
        preload="none"
        poster={heroPosterUrl}
        disablePictureInPicture
        disableRemotePlayback
        x5-video-player-type="h5"
        x5-video-orientation="portrait"
        x5-playsinline="true"
        webkit-playsinline="true"
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <header className="hero-nav">
          <PillNav
            logo={`${import.meta.env.BASE_URL}wanhuatong.png`}
            logoAlt="平面设计 / 电商视觉"
            items={[
              { label: '经历', href: '#experience' },
              { label: '作品', href: '#projects' },
              { label: '优势', href: '#strengths' },
              { label: '技能', href: '#skills' },
              { label: '联系', href: '#contact' }
            ]}
            activeHref="#experience"
            ease="power2.easeOut"
            baseColor="transparent"
            pillColor="transparent"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#ffffff"
            initialLoadAnimation
          />
        </header>
        <div className="hero-content">
          <p className="eyebrow">杨大顺 · 电商视觉 & 短视频 · 湛江</p>
          <h1>会做图，也会剪视频的那种设计</h1>
          <p className="hero-copy">
            学平面设计的，现在主要做电商主图和详情页，
            顺便也会剪点短视频。工具熟练，效率在线，
            有项目可以随时聊聊。
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
      <AudioPlayer />
    </section>
  );
};

export default Hero;
