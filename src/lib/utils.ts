import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(prismaDateTime: Date | string): string {
  let date = new Date(prismaDateTime);

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(prismaDateTime: Date | string): string {
  // Convert Prisma DateTime to JavaScript Date object
  let date = new Date(prismaDateTime);

  // Format the time
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}
