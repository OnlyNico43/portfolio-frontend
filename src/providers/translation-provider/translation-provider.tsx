'use client';
import initTranslations from '@/app/i18n';
import { createInstance, type Resource } from 'i18next';
import type { FunctionComponent, JSX, PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

interface TranslationProviderProps {
  locale: string;
  namespaces: string[];
  resources?: Resource;
}

const TranslationProvider: FunctionComponent<PropsWithChildren<TranslationProviderProps>> = ({
  children,
  locale,
  namespaces,
  resources,
}): JSX.Element => {
  const i18n = createInstance();
  void initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationProvider;
