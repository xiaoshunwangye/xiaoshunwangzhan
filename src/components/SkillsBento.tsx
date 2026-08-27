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
    description:
      '熟练使用主流视觉设计工具完成电商主图、详情页、海报等设计任务，注重画面层级与转化导向。',
    level: 5,
    scenarios: [
      '电商产品主图与详情页设计',
      '节日 / 促销海报设计',
      '品牌视觉规范梳理',
    ],
  },
  {
    label: '视频制作',
    title: '剪映 / After Effects / Premiere',
    description:
      '能独立完成电商短视频从脚本到成片的全流程制作，擅长动态字幕与产品展示动效。',
    level: 4,
    scenarios: [
      '电商产品短视频剪辑',
      '动态主图与产品展示小视频',
      '投放素材快速产出',
    ],
  },
  {
    label: 'AI 工具',
    title: 'Midjourney / Stable Diffusion',
    description:
      '使用 AI 绘图工具辅助灵感发散与素材生成，建立 AI 辅助设计的工作流，提升创作效率。',
    level: 4,
    scenarios: [
      'AI 辅助灵感发散',
      '素材生成与画面氛围参考',
      '提示词工程实践',
    ],
  },
  {
    label: '电商设计',
    title: '主图 / 详情页 / 活动海报',
    description:
      '熟悉电商平台视觉规范，理解转化导向设计，能针对不同场景输出合适的视觉方案。',
    level: 5,
    scenarios: [
      '平台视觉规范遵循',
      '转化导向设计思路',
      '多场景视觉方案输出',
    ],
  },
  {
    label: '产品修图',
    title: '精修 / 调色 / 色彩构成',
    description:
      '掌握多种产品修图技法，能针对不同品类产品给出合适的精修与调色方案，突出产品质感。',
    level: 4,
    scenarios: [
      '产品质感精修',
      '色彩调性与卖点强化',
      '视觉吸引力提升',
    ],
  },
  {
    label: '版式设计',
    title: '排版 / 构图 / 视觉层级',
    description:
      '注重信息清晰度与画面节奏感，通过合理的排版与构图让设计更易读、更有吸引力。',
    level: 4,
    scenarios: [
      '信息层级组织',
      '画面节奏感把控',
      '阅读体验优化',
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
        <span className="section-label">专业技能</span>
        <h2>我掌握的工具与能力</h2>
        <p className="skills-hint">点击任意技能卡片查看详情 →</p>
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
