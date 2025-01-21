import { setLocaleInLocaleStorage } from '@jetstreamgg/utils';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useEffect } from 'react';

async function loadMessages(locale: string) {
  const baseLocale = locale.split('-').shift();
  const messages = (await loadLocale(locale)) || (await loadLocale(baseLocale)) || (await loadLocale('en'));
  i18n.load(locale, messages);
  i18n.activate(locale);
}
async function loadLocale(locale?: string) {
  try {
    const { messages } = await import(`../locales/${locale}.ts`);
    console.log(`Locale file for ${locale} loaded in widgets.`);
    if (locale) setLocaleInLocaleStorage(locale);
    return messages;
  } catch (error) {
    console.log(`Locale file for ${locale} not found in widgets.`);
    return null;
  }
}

export function useI18n(locale?: string) {
  useEffect(() => {
    (async function anyNameFunction() {
      await loadMessages(locale || 'en');
    })();
  }, [locale]);

  return i18n;
}

export const I18nWidgetProvider = ({
  children,
  locale
}: {
  children: React.ReactNode;
  locale?: string;
}): React.ReactElement => {
  useI18n(locale);
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
