import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatWatchTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateString));
};
