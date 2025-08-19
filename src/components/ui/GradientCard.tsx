import { cn } from '@/lib/utils';

const gradients = {
  pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
  green: 'bg-gradient-to-br from-green-400 to-green-600',
  orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  teal: 'bg-gradient-to-br from-teal-400 to-teal-600',
  yellow: 'bg-gradient-to-br from-yellow-400 to-orange-500',
};

interface GradientCardProps {
  gradient: keyof typeof gradients;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GradientCard = ({
  gradient,
  children,
  className = '',
  onClick,
}: GradientCardProps) => {
  return (
    <div
      className={cn(
        gradients[gradient],
        'rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
