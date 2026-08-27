import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
}

const timeline: TimelineItem[] = [
  {
    id: 'short-video',
    period: '2025.06 — 2025.07',
    role: '电商产品短视频制作',
    company: '个人 / 团队实践',
    summary:
      '围绕电商产品拍摄与制作短视频内容，从脚本到成片全流程输出，兼顾详情页展示与投放素材需求。',
    highlights: [
      '使用剪映 / After Effects 完成多条电商产品短视频剪辑，添加卖点字幕与动态特效',
      '结合产品实拍素材优化视频节奏与画面表现，贴合电商平台短视频传播调性',
      '制作动态主图与产品展示小视频，提升产品在平台的点击率与停留时长',
    ],
  },
  {
    id: 'visual-design',
    period: '2025.03 — 2025.05',
    role: '电商店铺视觉设计',
    company: '课程项目',
    summary:
      '独立完成电商店铺的产品主图与详情页设计，遵循平台视觉规范，以清晰的视觉层级呈现产品卖点。',
    highlights: [
      '独立完成产品主图与详情页设计，遵循平台视觉规范，优化产品展示逻辑',
      '对产品图片进行精修与调色处理，突出产品卖点，提升视觉吸引力',
      '制作节日、促销等店铺活动海报，建立电商视觉营销的基础思路',
    ],
  },
  {
    id: 'study',
    period: '2024 — 2027',
    role: '平面设计专业学习',
    company: '湛江理工职业学校',
    summary:
      '中专 / 中技平面设计专业在读，系统学习电商平面设计、色彩构成、产品修图、短视频剪辑与版式设计。',
    highlights: [
      '主修课程：电商平面设计、色彩构成、产品修图、短视频剪辑、版式设计',
      '在校完成多条电商店铺视觉设计课程作业，覆盖主图、详情页排版与节日海报',
      '掌握电商设计基础逻辑与规范，熟练使用 Photoshop / Illustrator / After Effects',
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');
      const cards = section.querySelectorAll('.experience-grid > *');
      const stats = section.querySelectorAll('.stat-card span');
      const items = section.querySelectorAll('.timeline-item');

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

      stats.forEach((stat) => {
        const text = stat.textContent || '0';
        const target = parseInt(text.replace(/\D/g, '') || '0');
        const suffix = text.replace(/[0-9]/g, '');

        if (isNaN(target) || target === 0) return;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            stat.textContent = Math.round(obj.value) + suffix;
          },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="content-section" ref={sectionRef}>
      <div className="section-head">
        <span className="section-label">个人经历</span>
        <h2>关于我</h2>
      </div>
      <div className="experience-grid">
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
          <div className="profile-card">
            <div className="avatar" />
            <div className="profile-copy">
              <h3>杨大顺 / 平面设计</h3>
              <p>
                平面设计专业在读，专注电商视觉与短视频内容设计。
                熟悉电商平台视觉规范，擅长把产品卖点转化为清晰、有吸引力的视觉表达，
                也会用 AI 工具辅助灵感发散与素材生成。
              </p>
              <div className="contact-meta">
                <p>电话：19860398304</p>
                <p>邮箱：15113609996@163.com</p>
                <p>微信：Y-18-86-ds</p>
                <p>求职意向：设计 · 期望城市：佛山 · 期望薪资：5-8K</p>
              </div>
            </div>
          </div>
        </BorderGlow>
        <div className="experience-stats">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="190 80 60"
            backgroundColor="transparent"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
            fillOpacity={0}
          >
            <div className="stat-card">
              <span>2+</span>
              <p>电商设计项目</p>
            </div>
          </BorderGlow>
          <BorderGlow
            edgeSensitivity={30}
            glowColor="190 80 60"
            backgroundColor="transparent"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
            fillOpacity={0}
          >
            <div className="stat-card">
              <span>10+</span>
              <p>短视频作品</p>
            </div>
          </BorderGlow>
          <BorderGlow
            edgeSensitivity={30}
            glowColor="190 80 60"
            backgroundColor="transparent"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
            fillOpacity={0}
          >
            <div className="stat-card">
              <span>6+</span>
              <p>掌握设计工具</p>
            </div>
          </BorderGlow>
        </div>
      </div>

      <div className="timeline">
        {timeline.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <BorderGlow
              key={item.id}
              edgeSensitivity={30}
              glowColor="190 80 60"
              backgroundColor="transparent"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1.0}
              coneSpread={25}
              animated={false}
              colors={['#06B6D4', '#3B82F6', '#8B5CF6']}
              fillOpacity={0}
            >
              <div
                className={`timeline-item ${isExpanded ? 'is-expanded' : ''}`}
                onClick={() => toggleExpand(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <div className="timeline-marker" />
                <div className="timeline-content">
                  <span className="timeline-period">{item.period}</span>
                  <h3 className="timeline-role">
                    {item.role}
                    <span className="timeline-company"> · {item.company}</span>
                  </h3>
                  <p className="timeline-summary">{item.summary}</p>
                  <div
                    className="timeline-collapsible"
                    style={{
                      maxHeight: isExpanded ? '500px' : '0',
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <ul className="timeline-highlights">
                      {item.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="timeline-toggle">
                    {isExpanded ? '收起 ↑' : '展开详情 ↓'}
                  </span>
                </div>
              </div>
            </BorderGlow>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
