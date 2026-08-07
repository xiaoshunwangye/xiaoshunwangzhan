import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: '电商产品短视频制作',
    tag: '短视频内容',
    year: '2025.06 — 2025.07',
    description:
      '围绕电商产品拍摄与制作短视频内容，从脚本到成片全流程输出，兼顾详情页展示与投放素材需求。',
    stack: ['剪映', 'After Effects', '产品拍摄', '动态字幕'],
  },
  {
    title: '电商店铺视觉设计',
    tag: '电商设计',
    year: '2025.03 — 2025.05',
    description:
      '独立完成电商店铺的产品主图与详情页设计，遵循平台视觉规范，以清晰的视觉层级呈现产品卖点。',
    stack: ['Photoshop', 'Illustrator', '详情页排版', '活动海报'],
  },
  {
    title: '产品图片精修与调色',
    tag: '产品修图',
    year: '2025',
    description:
      '对产品图片进行精修与调色处理，突出产品质感与卖点，提升视觉吸引力与转化表现。',
    stack: ['Photoshop', '色彩构成', '产品精修', '调色'],
  },
  {
    title: '店铺活动海报设计',
    tag: '运营设计',
    year: '2025',
    description:
      '为节日、促销等不同场景设计店铺活动海报，建立电商视觉营销的基础思路与画面节奏感。',
    stack: ['版式设计', '节日海报', '促销视觉', '素材管理'],
  },
  {
    title: '动态主图与产品展示',
    tag: '动效设计',
    year: '2025',
    description:
      '制作动态主图与产品展示小视频，用动效强化产品信息层级，提升电商平台的点击率与停留时长。',
    stack: ['After Effects', '动态海报', '产品展示', '动效'],
  },
  {
    title: 'AI 辅助电商视觉探索',
    tag: 'AI 探索',
    year: '2025',
    description:
      '尝试用 AI 绘图工具辅助电商视觉创作，用于灵感发散、素材生成与画面氛围参考，提升设计效率。',
    stack: ['AI 绘图', '素材生成', '灵感发散', '后期合成'],
  },
  {
    title: '电商视觉课程作业集',
    tag: '课程实践',
    year: '2024 — 2025',
    description:
      '在校期间完成的多条电商店铺视觉设计课程作业，覆盖产品主图、详情页排版与节日海报设计。',
    stack: ['Photoshop', 'Illustrator', '版式设计', '色彩构成'],
  },
];

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');
      const cards = section.querySelectorAll('.projects-grid > *');

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
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Image reveal animation
      const thumbs = section.querySelectorAll('.project-thumb');
      thumbs.forEach((thumb) => {
        const parent = thumb.parentElement;
        if (!parent || parent.querySelector('.image-reveal-mask')) return;

        const mask = document.createElement('div');
        mask.className = 'image-reveal-mask';
        parent.appendChild(mask);

        gsap.fromTo(mask,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: parent,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="content-section" ref={sectionRef}>
      <div className="section-head">
        <span className="section-label">精选项目</span>
        <h2>代表作品</h2>
      </div>
      <div className="projects-grid">
        {projects.map((item) => (
          <article className="project-card" key={item.title}>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="190 80 60"
              backgroundColor="transparent"
              borderRadius={32}
              glowRadius={40}
              glowIntensity={1.0}
              coneSpread={25}
              animated={false}
              colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
              fillOpacity={0}
            >
              <div className="project-copy">
                <div className="project-meta">
                  <span className="project-tag">{item.tag}</span>
                  <span className="project-year">{item.year}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="project-stack">
                  {item.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </BorderGlow>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
