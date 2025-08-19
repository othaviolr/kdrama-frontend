interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  initials?: string;
  color?: 'pink' | 'blue' | 'green' | 'purple' | 'orange';
}

export const Avatar = ({
  src,
  alt,
  size = 'md',
  initials,
  color = 'blue',
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const colorClasses = {
    pink: 'bg-pink-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full flex items-center justify-center text-white font-medium`}
    >
      {initials || alt.charAt(0).toUpperCase()}
    </div>
  );
};
