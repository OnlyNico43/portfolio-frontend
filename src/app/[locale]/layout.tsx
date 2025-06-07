import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import TranslationProvider from '@/providers/translation-provider/translation-provider';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import '../globals.css';
import initTranslations from '../i18n';

const I18N_NAMESPACES = ['nav', 'footer', 'common'];

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
  const { t, resources } = await initTranslations(locale, I18N_NAMESPACES);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TranslationProvider locale={locale} resources={resources} namespaces={I18N_NAMESPACES}>
            <Navbar locale={locale} t={t} />
            <main className="min-h-[calc(100vh-65px)]">{children}</main>
            <Footer t={t} />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { metadata };
export type { Params, RootLayoutProps };
