import { useEffect, useRef } from 'react';
import SpecularButton from './SpecularButton';
import PillNav from './PillNav';
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

      // 微信 X5 内核特殊处理：通过 WeixinJSBridge 触发播放
      const handleWeixinReady = () => {
        tryPlay();
      };
      if (typeof (window as any).WeixinJSBridge !== 'undefined') {
        (window as any).WeixinJSBridge.invoke('getNetworkType', {}, handleWeixinReady);
      } else {
        document.addEventListener('WeixinJSBridgeReady', handleWeixinReady, false);
      }

      // 监听首次用户交互（点击/触摸/滚动/键盘）
      const events: Array<keyof DocumentEventMap> = ['click', 'touchstart', 'scroll', 'keydown'];
      const onUserInteract = () => {
        tryPlay();
        events.forEach((evt) => document.removeEventListener(evt, onUserInteract));
      };
      events.forEach((evt) => document.addEventListener(evt, onUserInteract, { once: true, passive: true }));

      // iPad 微信特殊处理：监听 visibilitychange，页面可见时尝试播放
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          tryPlay();
        }
      });
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
          <p className="eyebrow">平面设计 · 电商视觉 · 短视频内容 · AI 辅助</p>
          <h1>用电商视觉与短视频内容讲好产品故事</h1>
          <p className="hero-copy">
            平面设计专业在读，专注电商主图、详情页与短视频内容设计，
            把产品卖点转化为清晰、有吸引力的视觉表达。
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
