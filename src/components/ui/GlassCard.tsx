import { cn } from '@/lib/utils';
import { designTokens } from '@/lib/design-tokens';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'gradient';
  blur?: boolean;
  glow?: boolean;
  animated?: boolean;
}

export const GlassCard = ({
  children,
  className,
  variant = 'light',
  blur = true,
  glow = false,
  animated = true,
}: GlassCardProps) => {
  const variants = {
    light: 'bg-white/10 border border-white/20',
    dark: 'bg-black/10 border border-white/10',
    gradient:
      'bg-gradient-to-br from-white/20 to-white/5 border border-white/20',
  };

  return (
    <div
      className={cn(
        'rounded-2xl',
        variants[variant],
        blur && 'backdrop-blur-xl',
        glow && designTokens.shadows.glow,
        animated &&
          'transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl',
        !glow && 'shadow-lg shadow-black/5',
        className
      )}
    >
      {children}
    </div>
  );
};
