import Navbar from '@/components/navbar/navbar';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Professional portfolio showcasing web development projects and skills',
};

interface Params {
  locale: string;
}

interface RootLayoutProps {
  params: Promise<Params>;
  children: ReactNode;
}

const RootLayout: FunctionComponent<RootLayoutProps> = async ({ params, children }): Promise<ReactElement> => {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar locale={locale} />
          <main className="min-h-[calc(100vh-65px)]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { metadata };
export type { Params };
