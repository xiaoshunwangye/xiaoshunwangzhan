import { ReactNode } from 'react';

declare module './BorderGlow' {
  interface BorderGlowProps {
    children?: ReactNode;
    glowColor?: string;
    intensity?: number;
    borderRadius?: number | string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    [key: string]: unknown;
  }

  const BorderGlow: React.FC<BorderGlowProps>;
  export default BorderGlow;
}
