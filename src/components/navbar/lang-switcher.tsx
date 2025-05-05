'use server';
import initTranslations from '@/app/i18n';
import type { FunctionComponent, ReactElement } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface LangSwitcherProps {
  locale: string;
}

const LangSwitcher: FunctionComponent<LangSwitcherProps> = async ({ locale }): Promise<ReactElement> => {
  const { i18n } = await initTranslations(locale, ['nav']);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">{locale.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.languages
          .filter(lang => lang !== locale)
          .map(lang => (
            <DropdownMenuItem>{lang.toUpperCase()}</DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitcher;
