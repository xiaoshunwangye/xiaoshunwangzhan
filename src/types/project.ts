export type ProjectCategory = '电商设计' | '短视频内容' | 'AI 探索' | '课程实践';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  description: string;
  stack: string[];
  /** 封面渐变色（用于占位封面） */
  coverGradient: string;
  /** 封面 emoji 或图标字符 */
  coverIcon: string;
  /** 封面图片路径（可选），如 '/IMG_3602.JPG' */
  coverImg?: string;
  /** 封面视频路径（可选），如 '/hero-video.mp4' */
  coverVideo?: string;
  /** 亮点列表 */
  highlights: string[];
  /** 演示链接（可选） */
  demoUrl?: string;
  /** 源码链接（可选） */
  sourceUrl?: string;
  /** AI 项目：Before/After 对比图路径 */
  beforeAfterImg?: string;
  /** AI 项目：生成过程截图列表 */
  processScreenshots?: string[];
  /** AI 项目：AI 提示词 */
  aiPrompt?: string;
  /** AI 项目：工作流步骤说明 */
  processSteps?: string[];
  /** 作品集图片列表（可放多张） */
  galleryImgs?: string[];
  /** 作品集视频列表 */
  videos?: string[];
}
