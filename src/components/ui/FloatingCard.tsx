import { cn } from '@/lib/utils';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hoverScale?: number;
  glowIntensity?: 'low' | 'medium' | 'high';
}

export const FloatingCard = ({
  children,
  className,
  gradient = 'from-purple-500 to-blue-600',
  hoverScale = 1.05,
  glowIntensity = 'medium',
}: FloatingCardProps) => {
  const glowIntensities = {
    low: 'hover:shadow-lg hover:shadow-purple-500/20',
    medium: 'hover:shadow-2xl hover:shadow-purple-500/40',
    high: 'hover:shadow-2xl hover:shadow-purple-500/60',
  };

  return (
    <div
      className={cn(
        `bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white`,
        'transform transition-all duration-500 ease-out',
        'shadow-lg shadow-black/10',
        glowIntensities[glowIntensity],
        'cursor-pointer group',
        className
      )}
      style={
        {
          '--hover-scale': hoverScale,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `scale(${hoverScale}) translateY(-2px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <div className="relative overflow-hidden rounded-xl">
        {children}

        {/* Efeito de brilho em hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  );
};
