import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  color?: 'blue' | 'green' | 'purple' | 'pink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

export const ProgressBar = ({
  progress,
  color = 'blue',
  size = 'md',
  showPercentage = true,
}: ProgressBarProps) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    orange: 'bg-orange-500',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between text-sm mb-1">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className={cn('w-full bg-white/20 rounded-full', sizeClasses[size])}>
        <div
          className={cn(
            colorClasses[color],
            sizeClasses[size],
            'rounded-full transition-all duration-500'
          )}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};
