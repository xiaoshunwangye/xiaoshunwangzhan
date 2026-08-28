import { lazy, Suspense, useEffect, useState } from "react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProjects";
import Strengths from "./components/Strengths";
import SkillsBento from "./components/SkillsBento";
import Contact from "./components/Contact";

// 背景流体依赖 ogl（WebGL），拆成独立 chunk，等首屏空闲后再加载，
// 不阻塞 Hero 首屏渲染；加载完成后视觉表现完全一致。
const Ferrofluid = lazy(() => import("./components/Ferrofluid"));

const FLUID_COLORS = ["#ffffff", "#ffffff", "#ffffff"];

function App() {
  const [fluidReady, setFluidReady] = useState(false);

  useEffect(() => {
    // 首屏完成首次绘制后立刻挂载，不等 idle：
    // 等 idle 会让主体区背景明显"迟到"（先黑一下再浮现）
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setFluidReady(true));
    });

    // 兜底：3秒后强制显示，防止 WebGL 初始化卡住
    const timeout = setTimeout(() => setFluidReady(true), 3000);

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="app-shell">
      <Hero />
      <main className="page-content">
        <div className="ferrofluid-wrapper">
          {fluidReady && (
            <Suspense fallback={null}>
              <Ferrofluid
                colors={FLUID_COLORS}
                speed={0.5}
                scale={1}
                turbulence={1}
                fluidity={0.1}
                rimWidth={0.2}
                sharpness={3}
                shimmer={1}
                glow={2}
                flowDirection="down"
                opacity={1}
                mouseInteraction={true}
                mouseStrength={1}
                mouseRadius={0.3}
              />
            </Suspense>
          )}
        </div>
        <div className="page-content-inner">
          <Experience />
          <FeaturedProjects />
          <Strengths />
          <SkillsBento />
        </div>
      </main>
      <Contact />
    </div>
  );
}

export default App;
