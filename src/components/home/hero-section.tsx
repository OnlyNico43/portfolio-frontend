'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ParticleBackground from './particle-background';

const HeroSection: FunctionComponent = (): ReactElement => {
  const { t } = useTranslation('home');

  return (
    <section className="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="animate-fade-in-up space-y-6">
          <div className="inline-block animate-slide-in-left">
            <span className="text-lg text-muted-foreground md:text-xl">{t('hero.greeting')}</span>
          </div>

          <h1 className="animate-slide-in-right bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
            {t('hero.name')}
          </h1>

          <div className="animate-slide-in-left">
            <h2 className="text-2xl font-semibold text-primary md:text-3xl">{t('hero.title')}</h2>
          </div>

          <p className="mx-auto max-w-2xl animate-fade-in text-lg text-muted-foreground md:text-xl">
            {t('hero.subtitle')}
          </p>

          <div className="flex animate-fade-in-up flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="#projects">
                {t('hero.cta.primary')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="group">
              <Link href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                {t('hero.cta.secondary')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/20">
          <div className="mx-auto mt-2 h-2 w-0.5 animate-scroll-down rounded-full bg-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
