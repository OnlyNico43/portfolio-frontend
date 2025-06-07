// src/app/[locale]/page.tsx
'use server';
import initTranslations from '@/app/i18n';
import AboutSection from '@/components/home/about-section';
import ContactSection from '@/components/home/contact-section';
import HeroSection from '@/components/home/hero-section';
import ProjectsSection from '@/components/home/projects-section';
import SkillsSection from '@/components/home/skills-section';
import TranslationProvider from '@/providers/translation-provider/translation-provider';
import type { FunctionComponent, ReactElement } from 'react';

const I18N_NAMESPACES = ['common', 'home'];

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const Home: FunctionComponent<HomePageProps> = async ({ params }): Promise<ReactElement> => {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, I18N_NAMESPACES);

  return (
    <TranslationProvider locale={locale} namespaces={I18N_NAMESPACES} resources={resources}>
      <main className="relative">
        <HeroSection />
        <AboutSection t={t} />
        <SkillsSection locale={locale} t={t} />
        <ProjectsSection locale={locale} t={t} />
        <ContactSection />
      </main>
    </TranslationProvider>
  );
};

export default Home;
