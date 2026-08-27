import type { Project, ProjectCategory } from '../types/project';

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
    summary: '独立完成电商店铺的产品主图与详情页设计，遵循平台视觉规范。',
    description:
      '独立完成电商店铺的产品主图与详情页设计，遵循平台视觉规范，以清晰的视觉层级呈现产品卖点。注重转化导向，让设计真正服务于业务目标。',
    stack: ['Photoshop', 'Illustrator', '详情页排版', '活动海报'],
    coverGradient: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
    coverIcon: '🛍️',
    coverImg: '/wanhuatong.png',
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
    summary: '对产品图片进行精修与调色处理，突出产品质感与卖点。',
    description:
      '对产品图片进行精修与调色处理，突出产品质感与卖点，提升视觉吸引力与转化表现。掌握多种修图技法，能针对不同品类产品给出合适的视觉方案。',
    stack: ['Photoshop', '色彩构成', '产品精修', '调色'],
    coverGradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
    coverIcon: '🎨',
    highlights: [
      '针对不同品类产品制定合适的精修方案',
      '通过调色强化产品卖点与品牌调性',
      '兼顾视觉表现与电商转化效率',
    ],
  },
  {
    id: 'promotion-poster',
    title: '店铺活动海报设计',
    category: '电商设计',
    year: '2025',
    summary: '为节日、促销等不同场景设计店铺活动海报。',
    description:
      '为节日、促销等不同场景设计店铺活动海报，建立电商视觉营销的基础思路与画面节奏感。能根据活动主题快速产出有冲击力的视觉物料。',
    stack: ['版式设计', '节日海报', '促销视觉', '素材管理'],
    coverGradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    coverIcon: '🎉',
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
    summary: '围绕电商产品拍摄与制作短视频内容，从脚本到成片全流程输出。',
    description:
      '围绕电商产品拍摄与制作短视频内容，从脚本到成片全流程输出，兼顾详情页展示与投放素材需求。熟悉电商平台短视频的节奏与调性，能在短时间内输出可投放的成片。',
    stack: ['剪映', 'After Effects', '产品拍摄', '动态字幕'],
    coverGradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
    coverIcon: '🎬',
    coverVideo: '/hero-video.mp4',
    highlights: [
      '使用剪映 / After Effects 完成多条电商产品短视频剪辑',
      '结合产品实拍素材优化视频节奏与画面表现',
      '制作动态主图与产品展示小视频，提升点击率与停留时长',
    ],
  },
  {
    id: 'dynamic-cover',
    title: '动态主图与产品展示',
    category: '短视频内容',
    year: '2025',
    summary: '制作动态主图与产品展示小视频，用动效强化产品信息层级。',
    description:
      '制作动态主图与产品展示小视频，用动效强化产品信息层级，提升电商平台的点击率与停留时长。把动效作为信息组织工具，而不是单纯的装饰。',
    stack: ['After Effects', '动态海报', '产品展示', '动效'],
    coverGradient: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    coverIcon: '✨',
    highlights: [
      '用动效强化产品信息层级与卖点',
      '兼顾平台规范与视觉表现力',
      '提升点击率与停留时长',
    ],
  },
  {
    id: 'ai-visual-explore',
    title: 'AI 辅助电商视觉探索',
    category: 'AI 探索',
    year: '2025',
    summary: '尝试用 AI 绘图工具辅助电商视觉创作，提升设计效率。',
    description:
      '尝试用 AI 绘图工具辅助电商视觉创作，用于灵感发散、素材生成与画面氛围参考，提升设计效率。把 AI 作为创作伙伴，而不是替代品。',
    stack: ['AI 绘图', '素材生成', '灵感发散', '后期合成'],
    coverGradient: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
    coverIcon: '🤖',
    highlights: [
      '使用 Midjourney / Stable Diffusion 进行素材生成',
      '用 AI 辅助灵感发散与画面氛围参考',
      '建立 AI 辅助设计的工作流',
    ],
  },
  {
    id: 'course-works',
    title: '电商视觉课程作业集',
    category: '课程实践',
    year: '2024 — 2025',
    summary: '在校期间完成的多条电商店铺视觉设计课程作业。',
    description:
      '在校期间完成的多条电商店铺视觉设计课程作业，覆盖产品主图、详情页排版与节日海报设计。系统训练电商设计的基础能力。',
    stack: ['Photoshop', 'Illustrator', '版式设计', '色彩构成'],
    coverGradient: 'linear-gradient(135deg, #64748B 0%, #94A3B8 100%)',
    coverIcon: '📚',
    highlights: [
      '覆盖产品主图、详情页排版与节日海报设计',
      '系统训练电商设计的基础能力',
      '在校期间累计完成多条课程作业',
    ],
  },
];
