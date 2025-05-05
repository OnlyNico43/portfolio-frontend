'use server';
import initTranslations from '@/app/i18n';
import TranslationProvider from '@/providers/translation-provider/translation-provider';
import { Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type FunctionComponent, type ReactElement } from 'react';
import GithubMarkWhite from '../../../public/github-mark-white.svg';
import GithubMark from '../../../public/github-mark.svg';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import LangSwitcher from './lang-switcher';
import ListItem from './list-item';
import ThemeSwitcher from './theme-switcher';

const I18N_NAMESPACES = ['nav'];

interface Item {
  title: string;
  description: string;
  href: string;
}

interface NavbarProps {
  locale: string;
}

const Navbar: FunctionComponent<NavbarProps> = async ({ locale }): Promise<ReactElement> => {
  const { t, resources } = await initTranslations(locale, I18N_NAMESPACES);
  return (
    <TranslationProvider locale={locale} namespaces={I18N_NAMESPACES} resources={resources}>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 max-w-[1382px] flex flex-wrap">
          <div className="w-[calc(100%-24px)] md:w-full flex h-16 items-center justify-between">
            <Code className="h-6 w-6" />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('nav:links.skills.title')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/skills"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">{t('nav:links.skills.description')}</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {t('nav:links.skills.details')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {(t('nav:links.skills.items', { returnObjects: true }) as Item[]).map(
                        (item: { title: string; description: string; href: string }) => (
                          <ListItem href={item.href} title={item.title} key={item.title}>
                            {item.description}
                          </ListItem>
                        ),
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('nav:links.projects.title')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {(t('nav:links.projects.items', { returnObjects: true }) as Item[]).map(component => (
                        <ListItem key={component.title} title={component.title} href={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/docs" lang={locale} passHref>
                      {t('nav:links.contact')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center space-x-1">
              <LangSwitcher locale={locale} />
              <ThemeSwitcher />
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/OnlyNico43" target="_blank" rel="noopener noreferrer">
                  <Image src={GithubMark} alt="Github Link" width={28} height={28} className="dark:hidden" />
                  <Image src={GithubMarkWhite} alt="Github Link" width={28} height={28} className="hidden dark:block" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </TranslationProvider>
  );
};

export default Navbar;
