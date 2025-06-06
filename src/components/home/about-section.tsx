'use client';
import { type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface StatItem {
  value: string;
  label: string;
}

const AboutSection: FunctionComponent = (): ReactElement => {
  const { t } = useTranslation('home');

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('about.title')}</h2>
              <p className="text-lg text-muted-foreground">{t('about.description')}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-8 sm:grid-cols-3">
            {(t('about.stats', { returnObjects: true }) as StatItem[]).map(stat => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
