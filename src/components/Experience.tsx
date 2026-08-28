import { useEffect, useRef, useState, type CSSProperties } from 'react';
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
      '暑假期间和朋友一起做了几条电商产品短视频，从拍素材到剪辑全靠自己。',
    highlights: [
      '用剪映和 AE 剪了五六条产品短视频，加了字幕和转场特效',
      '根据产品特点调整视频节奏，让画面更符合平台用户的观看习惯',
      '还做了几个动态主图，用在商品页和广告投放上',
    ],
  },
  {
    id: 'visual-design',
    period: '2025.03 — 2025.05',
    role: '电商店铺视觉设计',
    company: '课程项目',
    summary:
      '在学校课程中独立完成了一套电商店铺的视觉设计作业，包括主图、详情页和活动海报。',
    highlights: [
      '自己从零搭了一套店铺视觉，从主图到详情页排版全部独立完成',
      '对商品图做了精修和调色，让产品展示更有质感',
      '做了春节和双十一两个主题的活动海报',
    ],
  },
  {
    id: 'study',
    period: '2024 — 2027',
    role: '平面设计专业学习',
    company: '湛江理工职业学校',
    summary:
      '在湛江理工职业学校读平面设计，目前大三，正在为毕业后找工作做准备。',
    highlights: [
      '主要学了 Photoshop、Illustrator、AE 和剪映，已经能独立完成大部分电商设计需求',
      '学校课程作业基本都在做电商相关的，主图、详情页、海报都练过',
      '平时也在自己研究短视频剪辑和 AI 出图，持续学新东西',
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
        <span className="section-label">我的经历</span>
        <h2>我是谁</h2>
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
            <div
              className="avatar"
              style={{ '--avatar-url': `url(${import.meta.env.BASE_URL}IMG_3602.JPG)` } as CSSProperties}
            />
            <div className="profile-copy">
              <h3>杨大顺</h3>
              <p>
                湛江理工职业学校，平面设计专业。
                能独立做电商主图、详情页，也会剪短视频，
                平时会用 Midjourney 辅助出图找灵感。
                找工作态度认真，做事效率高，希望能找个踏实做事的团队。
              </p>
              <div className="contact-meta">
                <p>📞 198-6039-8304</p>
                <p>✉️ 15113609996@163.com</p>
                <p>💬 微信：Y-18-86-ds</p>
                <p>📍 广东佛山 · 期望薪资 5-8K</p>
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
              <p>做过的项目</p>
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
              <p>会用工具</p>
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
