import Hero from "./components/Hero";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProjects";
import Strengths from "./components/Strengths";
import Contact from "./components/Contact";
import Ferrofluid from "./components/Ferrofluid";

function App() {
  return (
    <div className="app-shell">
      <Hero />
      <main className="page-content">
        <div className="ferrofluid-wrapper">
          <Ferrofluid
            colors={["#06B6D4", "#EAB308", "#EC4899"]}
            speed={0.5}
            scale={1}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={3}
            shimmer={1}
            glow={2}
            flowDirection="up"
            opacity={0.8}
            mouseInteraction={true}
            mouseStrength={1}
            mouseRadius={0.3}
          />
        </div>
        <div className="page-content-inner">
          <Experience />
          <FeaturedProjects />
          <Strengths />
        </div>
      </main>
      <Contact />
    </div>
  );
}

export default App;
