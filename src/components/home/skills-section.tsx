'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface SkillCategory {
  title: string;
  skills: string[];
}

const SkillsSection: FunctionComponent = (): ReactElement => {
  const { t } = useTranslation('home');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="skills" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('skills.title')}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t('skills.subtitle')}</p>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {(t('skills.categories', { returnObjects: true }) as SkillCategory[]).map(category => (
              <Card key={category.title} className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="relative">
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="transition-all hover:bg-primary hover:text-primary-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button asChild variant="ghost" className="group">
              <Link href={`/${locale}/skills`}>
                {t('skills.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
