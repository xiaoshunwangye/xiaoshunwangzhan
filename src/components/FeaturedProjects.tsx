import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "品牌视觉系统",
    description: "为科技品牌构建高阶视觉语言与空间延展",
  },
  {
    title: "数字产品界面",
    description: "融合 AI 交互与界面美学的沉浸式体验设计",
  },
  {
    title: "跨领域品牌策略",
    description: "从定位到视觉体系的一体化品牌设计方案",
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
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </BorderGlow>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
