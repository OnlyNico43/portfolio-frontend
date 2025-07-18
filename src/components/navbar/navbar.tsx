'use server';
import type { I18nProps } from '@/app/i18n';
import { Code, Menu } from 'lucide-react';
import Link from 'next/link';
import { type FunctionComponent, type ReactElement } from 'react';
import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
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

interface Item {
  title: string;
  description: string;
  href: string;
}

interface NavbarProps extends I18nProps {
  locale: string;
}

const Navbar: FunctionComponent<NavbarProps> = async ({ locale, t }): Promise<ReactElement> => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container mx-auto px-4 max-w-[1382px] flex flex-wrap">
        <div className="w-[calc(100%-24px)] md:w-full flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="size-6" />
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('nav:links.skills.title')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={`/${locale}/skills`}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">{t('nav:links.skills.description')}</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {t('nav:links.skills.details')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {(t('nav:links.skills.items', { returnObjects: true }) as Item[]).map(item => (
                        <ListItem href={item.href} title={item.title} key={item.title}>
                          {item.description}
                        </ListItem>
                      ))}
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
                    <Link href={`/${locale}/contact`} lang={locale} passHref>
                      {t('nav:links.contact')}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center space-x-1 w-[98px]">
            <LangSwitcher locale={locale} />
            {/* div with preset witdth to prevent CLS */}
            <div className="w-10">
              <ThemeSwitcher />
            </div>
            <Drawer>
              <DrawerTrigger className="md:hidden" asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="flex flex-col space-y-5 p-6">
                <div className="flex flex-col space-y-2">
                  <Link href="/" className="font-medium text-xl">
                    {t('nav:links.skills.title')}
                  </Link>
                  {(t('nav:links.skills.items', { returnObjects: true }) as Item[]).map(item => (
                    <Link href={item.href} key={item.title} className="text-[1.15rem] opacity-80">
                      {item.title}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col space-y-2">
                  <Link href="/" className="font-medium text-xl">
                    {t('nav:links.projects.title')}
                  </Link>
                  {(t('nav:links.projects.items', { returnObjects: true }) as Item[]).map(item => (
                    <Link href={item.href} key={item.title} className="text-[1.15rem] opacity-80">
                      {item.title}
                    </Link>
                  ))}
                </div>
                <Link href="/" className="font-medium text-xl">
                  {t('nav:links.contact')}
                </Link>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
