import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// GitHub Pages 部署：
// - 本地开发 (npm run dev)：base 为 "/" → http://localhost:5173/
// - 生产构建 (npm run build)：默认 base 为 "/xiaoshunwangzhan/" → 适配 GitHub Pages
// - 自定义域名：构建时设置 VITE_BASE="/" 即可
// - Vercel/Netlify：构建时设置 VITE_BASE="/"
const REPO_NAME = "xiaoshunwangzhan";

// 插件：替换 index.html 中的 %BASE_URL% 为实际的 base 路径
function htmlBasePlugin(base: string): Plugin {
  return {
    name: "html-base-transform",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(/%BASE_URL%/g, base);
      },
    },
  };
}

// 解析单个文件名：
//   "01_踏浪.mp3" -> { order: 1, name: "踏浪", file: "01_踏浪.mp3" }
//   "踏浪.mp3"    -> { order: null, name: "踏浪", file: "踏浪.mp3" }
function parseAudioName(file: string): { order: number | null; name: string; file: string } {
  const base = path.basename(file, path.extname(file));
  const m = /^(\d+)_(.+)$/.exec(base);
  if (m) return { order: parseInt(m[1], 10), name: m[2], file };
  return { order: null, name: base, file };
}

// 排序规则：
//  1) public/audio-order.json 里显式列出的文件按声明顺序在前
//  2) 其余按"数字前缀升序"；无前缀的按中文拼音排在末尾
//  3) 两者都没有时，按原字母顺序作为兜底
function sortAudioFiles(files: string[], orderFile: string | null): string[] {
  const orderList: string[] = (() => {
    if (!orderFile || !fs.existsSync(orderFile)) return [];
    try {
      const raw = JSON.parse(fs.readFileSync(orderFile, "utf-8"));
      return Array.isArray(raw.order) ? raw.order.filter((x): x is string => typeof x === "string") : [];
    } catch {
      return [];
    }
  })();

  if (orderList.length > 0) {
    const set = new Set(files);
    const inOrder = orderList.filter((f) => set.has(f));
    const rest = files.filter((f) => !orderList.includes(f));
    return [...inOrder, ...rest.sort((a, b) => a.localeCompare(b, "zh-Hans-CN"))];
  }

  const parsed = files.map((f) => ({ f, ...parseAudioName(f) }));
  const withOrder = parsed.filter((x) => x.order !== null);
  const withoutOrder = parsed.filter((x) => x.order === null);
  withOrder.sort((a, b) => (a.order! - b.order!));
  withoutOrder.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
  return [...withOrder, ...withoutOrder].map((x) => x.f);
}

// 插件：dev/build 启动时自动扫描 public/audio/ 生成 audio-list.json
// 这样新加的 mp3 会自动出现在播放列表里，不用再手动编辑 json
//
// 排序规则（由上至下优先级递减）：
//  1) public/audio-order.json 显式列出顺序的文件
//  2) 文件名以 "01_" / "02_" 数字开头的，按数字升序
//  3) 其余按中文拼音
function audioPlaylistPlugin(): Plugin {
  const audioDir = path.resolve(__dirname, "public/audio");
  const orderFile = path.resolve(__dirname, "public/audio-order.json");
  const listFile = path.resolve(__dirname, "public/audio-list.json");

  const writeList = () => {
    if (!fs.existsSync(audioDir)) return;
    const files = fs
      .readdirSync(audioDir)
      .filter((f) => /\.mp3$/i.test(f));
    const sorted = sortAudioFiles(files, orderFile);
    const list = {
      playlist: sorted.map((file) => {
        const { name } = parseAudioName(file);
        return { name, src: `/audio/${file}` };
      }),
    };
    fs.writeFileSync(listFile, JSON.stringify(list, null, 2) + "\n");
  };

  return {
    name: "audio-playlist-auto",
    configureServer(server) {
      writeList();
      const watcher = fs.watch(audioDir, { persistent: true }, () => writeList());
      // 始终监听 order 文件：即使首次启动时它还不存在，
      // 之后再创建/修改也能触发重写。
      const orderWatcher = fs.watch(
        path.dirname(orderFile),
        { persistent: true },
        (event, filename) => {
          if (filename === path.basename(orderFile)) writeList();
        },
      );
      server.httpServer?.on("close", () => {
        watcher.close();
        orderWatcher.close();
      });
    },
    buildStart() {
      // 生产构建也生成一次
      writeList();
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const base = isDev
    ? "/"
    : (process.env.VITE_BASE ?? `/${REPO_NAME}/`);

  return {
    plugins: [htmlBasePlugin(base), audioPlaylistPlugin(), react()],
    base,
    build: {
      target: "es2020",
      cssCodeSplit: true,
      sourcemap: false,
      // 小图标/小图内联，减少请求数
      assetsInlineLimit: 2048,
      chunkSizeWarningLimit: 900,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          // 拆分 react / gsap / ogl 到独立 chunk：浏览器并行下载 + 长期缓存，
          // 业务代码改动时这几个 chunk 的缓存不会失效
          manualChunks: {
            react: ["react", "react-dom"],
            gsap: ["gsap", "gsap/ScrollTrigger"],
            ogl: ["ogl"],
          },
        },
      },
    },
    esbuild: {
      legalComments: "none",
    },
    server: {
      watch: {
        ignored: ["**/public_original_backup/**"],
      },
    },
  };
});
