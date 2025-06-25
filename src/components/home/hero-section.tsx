'use client';
import TypewriterText from '@/components/home/typewriter-text';
import { Button } from '@/components/ui/button';
import { cx } from 'class-variance-authority';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ParticleBackground from './particle-background';

const HeroSection: FunctionComponent = (): ReactElement => {
  const { t } = useTranslation();

  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    // Hide scroll indicator after 50px of scrolling
    const handleScroll = (): void => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setShowScrollIndicator]);

  return (
    <section className="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center h-full">
        <div className="animate-fade-in-up space-y-6">
          <div className="inline-block animate-slide-in-left">
            <span className="text-lg text-muted-foreground md:text-xl">{t('home:hero.greeting')}</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            <TypewriterText
              text={t('common:name')}
              delay={500}
              speed={100}
              onComplete={() => setShowTitle(true)}
              showCursor={false}
            />
          </h1>

          {showTitle && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                <TypewriterText
                  text={t('common:title')}
                  delay={200}
                  speed={100}
                  onComplete={() => setShowSubtitle(true)}
                  showCursor={false}
                />
              </h2>
            </div>
          )}

          {showSubtitle && (
            <p className="mx-auto max-w-2xl animate-fade-in text-lg text-muted-foreground md:text-xl">
              <TypewriterText
                text={t('home:hero.subtitle')}
                delay={300}
                speed={60}
                onComplete={() => setShowButtons(true)}
                showCursor={false}
              />
            </p>
          )}

          {showButtons && (
            <div className="flex animate-fade-in flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  {t('home:hero.cta.primary')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="group">
                <Link href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  {t('home:hero.cta.secondary')}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cx(
          'absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-300',
          showScrollIndicator ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/20">
          <div className="mx-auto mt-2 h-2 w-0.5 animate-scroll-down rounded-full bg-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
