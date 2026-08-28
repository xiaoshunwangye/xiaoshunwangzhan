import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagicBento from './MagicBento';
import Modal from './Modal';
import './SkillsBento.css';

gsap.registerPlugin(ScrollTrigger);

interface SkillDetail {
  label: string;
  title: string;
  description: string;
  /** 掌握程度 1-5 */
  level: number;
  /** 相关经验 / 项目场景 */
  scenarios: string[];
}

const SKILL_DETAILS: SkillDetail[] = [
  {
    label: '视觉设计',
    title: 'Photoshop / Illustrator / Figma',
    description: '每天用 PS 和 AI 做电商图，Figma 用来对齐设计稿和切图，基本能独立搞定主图、详情页这些需求。',
    level: 5,
    scenarios: [
      '电商主图、详情页',
      '节日促销海报',
      '设计稿切图规范',
    ],
  },
  {
    label: '视频制作',
    title: '剪映 / After Effects',
    description: '剪映日常剪短视频加字幕，AE 做一些动效和产品展示视频，节奏感这块练得比较多。',
    level: 4,
    scenarios: [
      '电商短视频剪辑',
      '动态主图',
      '投放素材快速出',
    ],
  },
  {
    label: 'AI 工具',
    title: 'Midjourney / Stable Diffusion',
    description: '用 AI 生成参考图找灵感、定画面氛围，不会直接拿 AI 图当成品，更多是辅助创作流程。',
    level: 4,
    scenarios: [
      'AI 辅助找灵感',
      '画面氛围参考',
      '写提示词出图',
    ],
  },
  {
    label: '电商设计',
    title: '主图 · 详情页 · 活动海报',
    description: '熟悉淘宝、拼多多这些平台的视觉规范，知道怎么让页面既好看又能转化，针对不同品类有自己的套路。',
    level: 5,
    scenarios: [
      '平台视觉规范',
      '转化导向设计',
      '多品类视觉方案',
    ],
  },
  {
    label: '产品修图',
    title: '精修 · 调色 · 色彩构成',
    description: '不同品类修图方法不一样，食品要鲜艳有食欲，数码要干净有质感，这块练了挺多。',
    level: 4,
    scenarios: [
      '产品质感精修',
      '色彩调性调整',
      '卖点视觉突出',
    ],
  },
  {
    label: '版式设计',
    title: '排版 · 构图 · 视觉层级',
    description: '排版讲究信息清晰和画面节奏，让设计更易读也有吸引力，节日海报和详情页都讲究这个。',
    level: 4,
    scenarios: [
      '信息层级组织',
      '画面节奏感',
      '阅读体验改善',
    ],
  },
];

const SkillsBento = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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

  // 监听卡片点击 - 通过事件代理捕获 .magic-bento-card 的点击
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleCardClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.magic-bento-card') as HTMLElement | null;
      if (!card) return;

      // 找到对应的技能索引
      const cards = section.querySelectorAll('.magic-bento-card');
      const index = Array.from(cards).indexOf(card);
      if (index >= 0 && index < SKILL_DETAILS.length) {
        setActiveSkill(SKILL_DETAILS[index]);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const target = e.target as HTMLElement;
      const card = target.closest('.magic-bento-card') as HTMLElement | null;
      if (!card) return;
      e.preventDefault();
      const cards = section.querySelectorAll('.magic-bento-card');
      const index = Array.from(cards).indexOf(card);
      if (index >= 0 && index < SKILL_DETAILS.length) {
        setActiveSkill(SKILL_DETAILS[index]);
      }
    };

    section.addEventListener('click', handleCardClick);
    section.addEventListener('keydown', handleKey);
    return () => {
      section.removeEventListener('click', handleCardClick);
      section.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-bento-section">
      <div className="section-head">
        <span className="section-label">工具技能</span>
        <h2>我会用的软件</h2>
        <p className="skills-hint">点卡片看详细说明 →</p>
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

      <Modal
        open={activeSkill !== null}
        onClose={() => setActiveSkill(null)}
        title={activeSkill?.title}
        maxWidth={620}
      >
        {activeSkill && (
          <div className="skill-detail">
            <div className="skill-detail-label">{activeSkill.label}</div>
            <p className="skill-detail-desc">{activeSkill.description}</p>

            <h4>掌握程度</h4>
            <div className="skill-level" aria-label={`掌握程度 ${activeSkill.level} / 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`skill-level-dot ${i < activeSkill.level ? 'is-filled' : ''}`}
                />
              ))}
              <span className="skill-level-text">{activeSkill.level} / 5</span>
            </div>

            <h4>应用场景</h4>
            <ul>
              {activeSkill.scenarios.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default SkillsBento;
