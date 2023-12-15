import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ReactQueryProvider } from '@/client-providers';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appointments Manager',
  description: 'Manage and view your appointments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang='en'>
        <body
          className={cn(
            'flex flex-col w-full h-full items-center py-16 px-4 no-scrollbar ',
            inter.className
          )}
        >
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
