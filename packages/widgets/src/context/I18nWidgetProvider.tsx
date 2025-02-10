import { dynamicActivate } from '@jetstreamgg/utils';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useEffect } from 'react';

export function useI18n(locale?: string) {
  useEffect(() => {
    (async function anyNameFunction() {
      await dynamicActivate(i18n, locale || 'en');
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
