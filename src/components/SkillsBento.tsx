import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicBento from './MagicBento';
import './SkillsBento.css';

gsap.registerPlugin(ScrollTrigger);

const SkillsBento = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo('.skills-bento-section .section-label',
        { x: -40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      gsap.fromTo('.skills-bento-section h2',
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // 卡片动画 - 依次出现
      gsap.fromTo('.skills-bento-section .magic-bento-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-bento-section">
      <div className="section-head">
        <span className="section-label">专业技能</span>
        <h2>我掌握的工具与能力</h2>
      </div>
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
      />
    </section>
  );
};

export default SkillsBento;
