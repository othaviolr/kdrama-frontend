import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
}

const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      glow,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105',
      secondary:
        'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-gray-500/50 hover:scale-105',
      glass:
        'bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 shadow-lg',
      outline:
        'border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white hover:scale-105',
      ghost: 'text-gray-700 hover:bg-gray-100 hover:scale-105',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
          variants[variant],
          sizes[size],
          glow && 'shadow-2xl shadow-purple-500/50',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

ModernButton.displayName = 'ModernButton';

export { ModernButton };
