interface ProgressBarProps {
  progress: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({
  progress,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const heights = {
    sm: 'h-2',
    md: 'h-3',
  };

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${heights[size]} ${className}`}
    >
      <div
        className="bg-purple-600 h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
