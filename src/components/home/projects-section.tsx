'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const ProjectsSection: FunctionComponent = (): ReactElement => {
  const { t } = useTranslation('home');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t('projects.title')}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t('projects.subtitle')}</p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(t('projects.items', { returnObjects: true }) as Project[]).map(project => (
              <Card key={project.title} className="group relative overflow-hidden transition-all hover:shadow-xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                {/* Content */}
                <CardHeader>
                  <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button asChild className="group">
              <Link href={`/${locale}/projects`}>
                {t('projects.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
