import { dynamicActivate } from '@jetstreamgg/sky-utils';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useEffect, useState } from 'react';

function useI18n(locale?: string) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setIsReady(false);

    (async function anyNameFunction() {
      await dynamicActivate(i18n, locale || 'en');

      if (!isCancelled) {
        setIsReady(true);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [locale]);

  return { i18n, isReady };
}

export const I18nWidgetProvider = ({
  children,
  locale
}: {
  children: React.ReactNode;
  locale?: string;
}): React.ReactElement => {
  const { i18n, isReady } = useI18n(locale);

  return <I18nProvider i18n={i18n}>{isReady ? children : null}</I18nProvider>;
};
