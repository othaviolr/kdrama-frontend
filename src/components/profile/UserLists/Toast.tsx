import { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Aguarda animação de saída
    }, 2700);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  const icon =
    type === 'success' ? (
      <CheckCircleIcon className="w-5 h-5" />
    ) : (
      <XCircleIcon className="w-5 h-5" />
    );

  return (
    <div
      className={`
      fixed bottom-6 right-6 z-50 
      transform transition-all duration-300 ease-out
      ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'}
    `}
    >
      <div
        className={`
        ${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl
        flex items-center gap-3 min-w-[300px] max-w-md
        backdrop-blur-md border border-white/20
      `}
      >
        {icon}
        <span className="font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
