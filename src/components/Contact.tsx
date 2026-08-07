import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');

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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <BorderGlow
        edgeSensitivity={30}
        glowColor="184 134 11"
        backgroundColor="#0d1117"
        borderRadius={40}
        glowRadius={40}
        glowIntensity={1.0}
        coneSpread={25}
        animated={false}
        colors={['#b8860b', '#daa520', '#cd7f32']}
        fillOpacity={0.3}
      >
        <div className="contact-wrap">
          <span className="section-label">联系我</span>
          <h2>期待加入佛山的设计团队，一起做好项目</h2>
          <p>姓名：杨大顺</p>
          <p>电话：19860398304</p>
          <p>邮箱：15113609996@163.com</p>
          <p>微信：Y-18-86-ds</p>
          <p>求职意向：设计 · 期望城市：佛山 · 期望薪资：5-8K</p>
        </div>
      </BorderGlow>
    </section>
  );
};

export default Contact;
