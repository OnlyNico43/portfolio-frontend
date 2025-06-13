'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, type FunctionComponent, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../../i18n.config';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface LangSwitcherProps {
  locale: string;
}

const LangSwitcher: FunctionComponent<LangSwitcherProps> = ({ locale }): ReactElement => {
  const { i18n } = useTranslation();
  const path = usePathname();
  const router = useRouter();

  const handleLanguageChange = useCallback(
    (lang: string): void => {
      // Get the path without locale prefix
      const pathSegments = path.split('/').filter(Boolean);
      const currentLocale = i18nConfig.locales.includes(pathSegments[0]) ? pathSegments[0] : null;

      let newPath;
      if (currentLocale) {
        // If we have a locale in the URL, replace it
        newPath = path.replace(`/${currentLocale}`, `/${lang}`);
      } else {
        // If we don't have a locale, add it at the beginning
        newPath = `/${lang}${path}`;
      }

      void i18n.changeLanguage(lang, () => router.replace(newPath, { scroll: false }));
    },
    [i18n, path, router],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{locale.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18nConfig.locales
          .filter(lang => lang !== locale)
          .map(lang => (
            <DropdownMenuItem
              key={lang}
              onSelect={e => {
                // Prevent the default selection behavior
                e.preventDefault();
                handleLanguageChange(lang);
              }}
            >
              {lang.toUpperCase()}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitcher;
