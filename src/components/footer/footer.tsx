import type { I18nProps } from '@/app/i18n';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { type FunctionComponent, type ReactElement } from 'react';

const Footer: FunctionComponent<I18nProps> = ({ t }): ReactElement => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/yourusername',
      icon: Github,
      hoverColor: 'hover:text-gray-600',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/yourusername',
      icon: Linkedin,
      hoverColor: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/yourusername',
      icon: Twitter,
      hoverColor: 'hover:text-blue-400',
    },
    {
      name: 'Email',
      href: 'mailto:your.email@example.com',
      icon: Mail,
      hoverColor: 'hover:text-red-500',
    },
  ];

  const legalLinks = [
    {
      name: t('footer:legal.privacy'),
      href: '/privacy-policy',
    },
    {
      name: t('footer:legal.terms'),
      href: '/terms-of-service',
    },
    {
      name: t('footer:legal.cookies'),
      href: '/cookie-policy',
    },
    {
      name: t('footer:legal.imprint'),
      href: '/imprint',
    },
  ];

  const quickLinks = [
    {
      name: t('footer:navigation.about'),
      href: '#about',
    },
    {
      name: t('footer:navigation.projects'),
      href: '#projects',
    },
    {
      name: t('footer:navigation.skills'),
      href: '#skills',
    },
    {
      name: t('footer:navigation.contact'),
      href: '#contact',
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{t('common:name')}</h3>
              <p className="text-sm text-muted-foreground">{t('common:title')}</p>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t('footer:description')}</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t('footer:location')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer:sections.navigation')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer:sections.legal')}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t('footer:sections.connect')}
            </h4>
            <div className="flex space-x-3">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={`h-9 w-9 p-0 transition-colors ${social.hoverColor}`}
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">{t('footer:availability')}</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col space-y-2 text-xs text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
            <p>
              © {currentYear} {t('common:name')}. {t('footer:copyright')}
            </p>
            <div className="hidden sm:block">•</div>
            <p>{t('footer:compliance.gdpr')}</p>
            <div className="hidden sm:block">•</div>
            <p>{t('footer:compliance.swiss')}</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-muted-foreground">{t('footer:builtWith')}</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Next.js
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              Tailwind CSS
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline"
            >
              shadcn/ui
            </Link>
          </div>
        </div>

        {/* EU/Swiss Compliance Notice */}
        <div className="mt-6 rounded-lg border bg-muted/20 p-4">
          <div className="flex flex-col space-y-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex-1">
              <p className="font-medium text-foreground">{t('footer:compliance.noticeTitle')}</p>
              <p>{t('footer:compliance.noticeText')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/privacy-policy" className="underline hover:text-foreground">
                {t('footer:legal.privacy')}
              </Link>
              <span>•</span>
              <Link href="/cookie-policy" className="underline hover:text-foreground">
                {t('footer:legal.cookies')}
              </Link>
              <span>•</span>
              <Link href="/imprint" className="underline hover:text-foreground">
                {t('footer:legal.imprint')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
