import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ReactQueryProvider } from '@/client-providers';

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
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
