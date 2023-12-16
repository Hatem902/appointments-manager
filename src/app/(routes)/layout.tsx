import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ReactQueryProvider, ThemeProvider } from '@/client-providers';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';

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
      <html lang='en' suppressHydrationWarning>
        <body
          className={cn(
            'flex flex-col w-full h-full items-center py-12 px-4 no-scrollbar antialiased bg-background',
            inter.className
          )}
        >
          <ThemeProvider attribute='class' defaultTheme='light'>
            <ModeToggle />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
