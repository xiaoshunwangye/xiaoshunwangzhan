import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 部署：
// - 仓库名为 portfolio-site 时，base 应为 "/portfolio-site/"
// - 如果使用自定义域名（CNAME），改为 "/"
// - 如果部署到 Vercel/Netlify，保持 "/"
const REPO_NAME = "portfolio-site";

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE ?? `/${REPO_NAME}/`,
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // 拆分 GSAP 和 OGL 到独立 chunk，便于浏览器并行下载与缓存
        manualChunks: {
          gsap: ["gsap"],
          ogl: ["ogl"],
        },
      },
    },
  },
});
