import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 部署：
// - 本地开发 (npm run dev)：base 为 "/" → http://localhost:5173/
// - 生产构建 (npm run build)：默认 base 为 "/portfolio-site/" → 适配 GitHub Pages
// - 自定义域名：构建时设置 VITE_BASE="/" 即可
// - Vercel/Netlify：构建时设置 VITE_BASE="/"
const REPO_NAME = "xiaoshunwangzhan";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const base = isDev
    ? "/"
    : (process.env.VITE_BASE ?? `/${REPO_NAME}/`);

  return {
    plugins: [react()],
    base,
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
  };
});
