import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const strengths = [
  {
    title: '电商视觉设计',
    description: '能独立做电商主图、详情页和活动海报，熟悉淘宝/拼多多等平台的规范，知道怎么让页面看起来专业又卖货。',
    points: ['主图设计', '详情页排版', '活动海报'],
  },
  {
    title: '产品修图与调色',
    description: '能把商品原图修干净、调对色，不同品类有不同时令处理手法，食品偏鲜艳，数码偏干净。',
    points: ['产品精修', '色彩构成', '调色'],
  },
  {
    title: '短视频剪辑',
    description: '会用剪映和 AE 剪电商短视频，加字幕、做动效，节奏感把握得比较熟练。',
    points: ['剪映', 'After Effects', '动态字幕'],
  },
  {
    title: 'AI 辅助设计',
    description: '平时用 Midjourney 和 SD 生成参考图找灵感，不会直接拿 AI 图当成品用，更多是辅助创作。',
    points: ['Midjourney', 'Stable Diffusion', '提示词'],
  },
  {
    title: '版式与海报',
    description: '做过春节、双十一各种主题海报，对不同节日的视觉氛围有感觉，能快速出图。',
    points: ['版式设计', '节日海报', '促销视觉'],
  },
  {
    title: '常用软件',
    description: 'Photoshop 和 Illustrator 每天用，AE 做动效和短视频，Figma 偶尔用来对齐设计规范。',
    points: ['PS', 'AI', 'AE', '剪映'],
  },
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
        <span className="section-label">我能做的</span>
        <h2>主要会这些</h2>
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
            <ul className="strength-points">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
};

export default Strengths;
