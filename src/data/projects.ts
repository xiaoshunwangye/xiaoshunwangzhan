import type { Project, ProjectCategory } from '../types/project';

// 统一处理 public 资源路径，兼容 GitHub Pages 子目录部署
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const CATEGORY_COLORS: Record<ProjectCategory, { glow: string; glowRgba: string }> = {
  '电商设计': { glow: '280 85% 65%', glowRgba: 'hsla(280, 85%, 65%, 1)' },
  '短视频内容': { glow: '190 80% 60%', glowRgba: 'hsla(190, 80%, 60%, 1)' },
  'AI 探索': { glow: '270 80% 65%', glowRgba: 'hsla(270, 80%, 65%, 1)' },
  '课程实践': { glow: '160 70% 55%', glowRgba: 'hsla(160, 70%, 55%, 1)' },
};

export const PROJECT_CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: '电商设计', label: '电商设计' },
  { value: '短视频内容', label: '短视频内容' },
  { value: 'AI 探索', label: 'AI 探索' },
  { value: '课程实践', label: '课程实践' },
];

export const projects: Project[] = [
  {
    id: 'ecommerce-visual-design',
    title: '电商店铺视觉设计',
    category: '电商设计',
    year: '2025.03 — 2025.05',
    summary: '学校课程的电商店铺视觉设计作业。',
    description:
      '这是在学校课程里独立完成的一套电商店铺设计，主图和详情页都是我自己做的，\n      参考了几个淘宝店的风格，尽量让页面看起来专业一点。',
    stack: ['Photoshop', 'Illustrator', '详情页排版', '活动海报'],
    coverGradient: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
    coverIcon: '🛍️',
    coverImg: asset('/works/mobile-b08-thumb.webp'),
    galleryImgs: [
      asset('/works/main-b08.webp'),
      asset('/works/mobile-c09.webp'),
      asset('/works/detail-c09.webp'),
    ],
    galleryCaptions: [
      '店铺主图方案',
      '移动端详情页',
      '长图详情页排版',
    ],
    highlights: [
      '独立完成产品主图与详情页设计，遵循平台视觉规范',
      '对产品图片进行精修与调色处理，突出产品卖点',
      '制作节日、促销等店铺活动海报，建立电商视觉营销思路',
    ],
  },
  {
    id: 'product-retouch',
    title: '产品图片精修与调色',
    category: '电商设计',
    year: '2025',
    summary: '商品图精修练习，练手用。',
    description:
      '主要是把产品原图修干净、调色调对，\n      让商品看起来更好看。不同品类修图方法不太一样，\n      食品要鲜艳一点，电子产品要干净一点，这块练了不少次。',
    stack: ['Photoshop', '色彩构成', '产品精修', '调色'],
    coverGradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
    coverIcon: '🎨',
    coverImg: asset('/works/page-c09-thumb.webp'),
    galleryImgs: [
      asset('/works/page-c09.webp'),
      asset('/works/detail-c09b.webp'),
    ],
    galleryCaptions: [
      '产品详情页修图前后',
      '商品氛围调色',
    ],
    highlights: [
      '针对不同品类产品制定合适的精修方案',
      '通过调色让产品卖点和品牌调性更突出',
      '兼顾视觉表现与电商转化效率',
    ],
  },
  {
    id: 'promotion-poster',
    title: '店铺活动海报设计',
    category: '电商设计',
    year: '2025',
    summary: '几个主题的海报设计练习。',
    description:
      '春节、双十一这种节点都要做海报，\n      主要是练构图和配色，学会在不同场景下快速出图。',
    stack: ['版式设计', '节日海报', '促销视觉', '素材管理'],
    coverGradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    coverIcon: '🎉',
    coverImg: asset('/works/poster-warm-thumb.webp'),
    galleryImgs: [
      asset('/works/detail-b08.webp'),
      asset('/works/detail-c08.webp'),
      asset('/works/poster-wide.webp'),
      asset('/works/poster-c08.webp'),
      asset('/works/poster-dark.webp'),
    ],
    galleryCaptions: [
      '瑞幸联名活动海报',
      '中秋「福月满满」节日海报',
      '双 11 促销横版海报',
      '春日上新海报',
      '店庆日暗色主题海报',
    ],
    galleryWide: [false, false, true, true, false],
    highlights: [
      '覆盖节日、促销、品牌活动等多种场景',
      '建立可复用的海报设计模板与组件库',
      '注重画面节奏感与信息层级',
    ],
  },
  {
    id: 'ecommerce-short-video',
    title: '电商产品短视频制作',
    category: '短视频内容',
    year: '2025.06 — 2025.07',
    summary: '暑假和朋友一起做的电商短视频。',
    description:
      '暑假的时候帮朋友拍了几个产品的短视频，\n      从拍素材到自己剪辑加字幕，总共做了五六条，\n      用在淘宝店铺和抖音投放上。',
    stack: ['剪映', 'After Effects', '产品拍摄', '动态字幕'],
    coverGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
    coverIcon: '🎬',
    highlights: [
      '用剪映和 AE 剪了几条短视频，加了字幕和转场',
      '根据产品特点调整视频节奏，让画面更符合平台用户习惯',
      '还做了动态主图，用在商品页和投放上',
    ],
  },
  {
    id: 'dynamic-cover',
    title: '动态主图与产品展示',
    category: '短视频内容',
    year: '2025',
    summary: '动态主图和小视频，提升商品展示效果。',
    description:
      '做了几个动态主图和短产品展示视频，\n      让商品页面看起来更生动，点击率会比静态图好一点。',
    stack: ['After Effects', '动态海报', '产品展示', '动效'],
    coverGradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    coverIcon: '✨',
    highlights: [
      '用动效强化产品信息层级与卖点',
      '兼顾平台规范与视觉表现力',
      '让页面点击率比静态图好一点',
    ],
  },
  {
    id: 'ai-visual-explore',
    title: 'AI 辅助电商视觉探索',
    category: 'AI 探索',
    year: '2025',
    summary: '用 AI 辅助出图，找找灵感。',
    description:
      '平时会用 Midjourney 和 Stable Diffusion 生成一些参考图，\n      主要是找灵感和确定画面氛围，\n      不会直接拿 AI 图当成品用，更多是辅助创作。',
    stack: ['AI 绘图', '素材生成', '灵感发散', '后期合成'],
    coverGradient: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
    coverIcon: '🤖',
    highlights: [
      '用 Midjourney 和 SD 生成参考图找灵感',
      '用 AI 确定画面氛围和构图方向',
      '平时写提示词出图，辅助创作流程',
    ],
  },
  {
    id: 'course-works',
    title: '电商视觉课程作业集',
    category: '课程实践',
    year: '2024 — 2025',
    summary: '平时的课程作业积累。',
    description:
      '这些是学校上课的作业，\n      涵盖了主图、详情页和海报几个方向，\n      虽然是作业但也是实打实练出来的。',
    stack: ['Photoshop', 'Illustrator', '版式设计', '色彩构成'],
    coverGradient: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)',
    coverIcon: '📚',
    coverImg: asset('/works/poster-c09-thumb.webp'),
    galleryImgs: [
      asset('/works/poster-c09.webp'),
      asset('/works/poster-light.webp'),
      asset('/works/mobile-b08.webp'),
      asset('/works/mobile-c09.webp'),
    ],
    galleryCaptions: [
      '课程作业·海报设计',
      '课程作业·产品修图',
      '课程作业·移动端详情',
      '课程作业·长图排版',
    ],
    highlights: [
      '练了主图、详情页和海报几个方向',
      '虽然是作业，但也是实打实用 PS 和 AI 做出来的',
      '覆盖了电商平台设计的几个常见场景',
    ],
  },
];
