import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const strengths = [
  { title: "品牌策略", description: "从定位到视觉，用设计强化品牌记忆。" },
  { title: "视觉系统", description: "构建一体化、沉浸式的视觉表达。" },
  { title: "AI 创新设计", description: "结合生成式 AI 拓展设计语言和实验空间。" },
  { title: "多端体验", description: "兼顾数字产品和品牌场域的整体感知。" },
];

const Strengths = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');
      const cards = section.querySelectorAll('.strengths-grid > *');

      // Label animation
      if (label) {
        gsap.fromTo(label,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Title animation
      if (title) {
        gsap.fromTo(title,
          { y: 60, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Card stagger animation
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: index * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="strengths" className="content-section" ref={sectionRef}>
      <div className="section-head">
        <span className="section-label">个人优势</span>
        <h2>我擅长的方向</h2>
      </div>
      <div className="strengths-grid">
        {strengths.map((item) => (
          <BorderGlow
            key={item.title}
            className="strength-card"
            backgroundColor="transparent"
            colors={['#5f9fff', '#a78bfa', '#38bdf8']}
            glowColor="220 90% 65%"
            glowIntensity={0.8}
            animated={false}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
};

export default Strengths;
