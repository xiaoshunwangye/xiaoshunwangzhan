import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 使用 gsap.context 局部管理，仅清理本组件创建的 ScrollTrigger
    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');
      const cards = section.querySelectorAll('.experience-grid > *');
      const stats = section.querySelectorAll('.stat-card span');

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

      // Counter animation
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
    }, section);

    return () => ctx.revert();
  }, []);

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
              <h3>视觉设计师 / AI 设计师</h3>
              <p>
                结合品牌策略与视觉体验，擅长将科技感与高级感融合到品牌空间与交互中。
              </p>
              <div className="contact-meta">
                <p>邮箱：15113609996@163.com</p>
                <p>微信：Y-18-86-ds</p>
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
              <span>8+</span>
              <p>品牌设计项目</p>
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
              <span>5+</span>
              <p>AI 视觉探索</p>
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
              <span>20+</span>
              <p>行业合作案例</p>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
};

export default Experience;
