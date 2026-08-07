import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const strengths = [
  {
    title: '电商视觉设计',
    description:
      '熟悉电商平台视觉规范，能独立完成产品主图、详情页与活动海报设计，遵循平台调性与转化逻辑。',
    points: ['主图设计', '详情页排版', '活动海报'],
  },
  {
    title: '产品修图与调色',
    description:
      '对产品图片进行精修与调色处理，突出产品质感与卖点，提升视觉吸引力与转化表现。',
    points: ['产品精修', '色彩构成', '调色'],
  },
  {
    title: '短视频内容制作',
    description:
      '使用剪映 / After Effects 完成电商产品短视频剪辑，添加卖点字幕与动态特效，适配平台传播。',
    points: ['剪映', 'After Effects', '动态字幕'],
  },
  {
    title: 'AI 辅助设计',
    description:
      '了解 AI 绘图与生成式工具的基础用法，能用 AI 辅助灵感发散、素材生成与设计提效。',
    points: ['AI 绘图', '灵感发散', '素材生成'],
  },
  {
    title: '版式与海报设计',
    description:
      '掌握版式设计基础，能针对节日、促销等不同场景输出清晰、有节奏感的视觉方案。',
    points: ['版式设计', '节日海报', '促销视觉'],
  },
  {
    title: '工具与软件',
    description:
      '熟练使用 Photoshop / Illustrator 完成日常设计工作，能用 After Effects 处理动效与视频。',
    points: ['Photoshop', 'Illustrator', 'After Effects'],
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
