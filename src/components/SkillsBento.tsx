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
      gsap.from('.skills-bento-section .section-header > *', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skills-bento-section">
      <div className="section-header">
        <span className="eyebrow">SKILLS</span>
        <h2>专业技能</h2>
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
        glowColor="6, 182, 212"
      />
    </section>
  );
};

export default SkillsBento;
