import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';
import Modal from './Modal';
import { projects, PROJECT_CATEGORIES, CATEGORY_COLORS } from '../data/projects';
import type { Project, ProjectCategory } from '../types/project';

gsap.registerPlugin(ScrollTrigger);

type FilterValue = ProjectCategory | 'all';

const CATEGORY_GRADIENT_COLORS: Record<ProjectCategory, string[]> = {
  '电商设计': ['#EC4899', '#F59E0B', '#EF4444'],
  '短视频内容': ['#06B6D4', '#3B82F6', '#8B5CF6'],
  'AI 探索': ['#8B5CF6', '#6366F1', '#EC4899'],
  '课程实践': ['#10B981', '#06B6D4', '#3B82F6'],
};

/**
 * 封面视频：进入视口才开始加载并播放，离开视口暂停。
 * 避免页面一打开就把 8MB 的 hero-video 拉下来并常驻解码。
 */
const ProjectCoverVideo = ({ src, poster, label }: { src: string; poster?: string; label: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          const p = video.play();
          if (p !== undefined) p.catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(video);

    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="project-cover-video"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
};

const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterValue>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const isFirstFilterRender = useRef(true);

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');

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
    }, section);

    return () => ctx.revert();
  }, []);

  // 筛选切换时卡片：先淡出，再错开淡入（首屏直接呈现，避免多余的一次闪烁）
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll('.projects-grid > article');
    if (cards.length === 0) return;

    if (isFirstFilterRender.current) {
      isFirstFilterRender.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
        );
      },
    });
    tl.to(cards, { opacity: 0, y: -10, duration: 0.2, stagger: 0.03 });
  }, [filter]);

  return (
    <section id="projects" className="content-section" ref={sectionRef}>
      <div className="section-head">
        <span className="section-label">作品集</span>
        <h2>做过的东西</h2>
      </div>

      <div className="project-filters" role="tablist" aria-label="作品分类筛选">
        {PROJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            role="tab"
            aria-selected={filter === cat.value}
            className={`project-filter-btn ${filter === cat.value ? 'is-active' : ''}`}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
            {cat.value !== 'all' && (
              <span className="project-filter-count">
                {projects.filter((p) => p.category === cat.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((item) => (
          <article className="project-card" key={item.id}>
            <BorderGlow
              edgeSensitivity={30}
              glowColor={CATEGORY_COLORS[item.category].glow}
              backgroundColor="transparent"
              borderRadius={32}
              glowRadius={40}
              glowIntensity={1.0}
              coneSpread={25}
              animated={false}
              colors={CATEGORY_GRADIENT_COLORS[item.category]}
              fillOpacity={0}
            >
              <button
                type="button"
                className={`project-cover-btn category-${item.category.replace(/\s/g, '-')}`}
                onClick={() => setActiveProject(item)}
                aria-label={`查看 ${item.title} 详情`}
              >
                {item.coverVideo ? (
                  <ProjectCoverVideo
                    src={item.coverVideo}
                    poster={item.coverImg || undefined}
                    label={item.title}
                  />
                ) : item.coverImg ? (
                  <img
                    src={item.coverImg}
                    alt={item.title}
                    className="project-cover-img"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="project-cover-icon">{item.coverIcon}</span>
                )}
                <span className="project-cover-label">{item.title}</span>
                <span className="project-cover-cta" aria-hidden="true">
                  <em>查看详情 →</em>
                </span>
              </button>
              <div className="project-copy">
                <div className="project-meta">
                  <span className="project-tag" data-category={item.category}>{item.category}</span>
                  <span className="project-year">{item.year}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="project-stack">
                  {item.stack.slice(0, 4).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </BorderGlow>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="project-empty">该分类下暂无作品</p>
      )}

      <Modal
        open={activeProject !== null}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title}
        maxWidth={760}
      >
        {activeProject && (
          <div className="project-detail">
            {activeProject.coverVideo ? (
              <div className="project-detail-cover project-detail-video-wrap">
                <video
                  src={activeProject.coverVideo}
                  className="project-detail-video"
                  controls
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              </div>
            ) : activeProject.coverImg ? (
              <div className="project-detail-cover project-detail-img-wrap">
                <img
                  src={activeProject.coverImg}
                  alt={activeProject.title}
                  className="project-detail-img"
                />
              </div>
            ) : (
              <div
                className="project-detail-cover"
                style={{ background: activeProject.coverGradient }}
              >
                <span className="project-cover-icon">{activeProject.coverIcon}</span>
              </div>
            )}
            <div className="project-detail-meta">
              <span className="project-tag">{activeProject.category}</span>
              <span className="project-year">{activeProject.year}</span>
            </div>
            <p className="project-detail-desc">{activeProject.description}</p>

            {activeProject.galleryImgs && activeProject.galleryImgs.length > 0 && (
              <>
                <h4>作品图集</h4>
                <div className="project-gallery">
                  {activeProject.galleryImgs.map((src, i) => {
                    const isWide = activeProject.galleryWide?.[i] === true;
                    const caption = activeProject.galleryCaptions?.[i];
                    return (
                      <figure
                        key={src + i}
                        className={`project-gallery-item${isWide ? ' is-wide' : ''}`}
                      >
                        <img
                          src={src}
                          alt={`${activeProject.title} 作品图 ${i + 1}`}
                          className="project-gallery-img"
                          loading="lazy"
                          decoding="async"
                          onClick={() => window.open(src, '_blank')}
                          role="button"
                          tabIndex={0}
                        />
                        {caption && <figcaption className="project-gallery-caption">{caption}</figcaption>}
                      </figure>
                    );
                  })}
                </div>
              </>
            )}

            <h4>做了什么</h4>
            <ul>
              {activeProject.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <h4>用的工具</h4>
            <ul className="project-stack project-stack--inline">
              {activeProject.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            {(activeProject.demoUrl || activeProject.sourceUrl) && (
              <div className="project-detail-actions">
                {activeProject.demoUrl && (
                  <a
                    className="project-detail-btn"
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    在线演示
                  </a>
                )}
                {activeProject.sourceUrl && (
                  <a
                    className="project-detail-btn project-detail-btn--ghost"
                    href={activeProject.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    查看源码
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default FeaturedProjects;
