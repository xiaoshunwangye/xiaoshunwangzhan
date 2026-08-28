import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/globals.css";
import "./styles/animations.css";

gsap.registerPlugin(ScrollTrigger);
// 移动端地址栏伸缩引起的 resize 不再触发 ScrollTrigger 全量重算，减少滚动抖动
ScrollTrigger.config({ ignoreMobileResize: true });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
