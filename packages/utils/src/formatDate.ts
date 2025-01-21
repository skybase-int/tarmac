import { Locale, format } from 'date-fns';
import { localeImports } from './locale.constants';

//map lingui locale strings to date-fns locales
//default to enUS
export const getDateLocale = async (locale: string): Promise<Locale> => {
  const [code, region] = locale.split('-');
  let localeModule;
  try {
    const localeFn = localeImports[`${code}${region}`] || localeImports[`${code}`] || localeImports['enUS'];
    localeModule = await localeFn();
  } catch (error) {
    localeModule = await import('date-fns/locale/en-US');
  }
  return localeModule.default;
};

//formats Date using provided lingui locale string and dateFormat string
export function formatDate(date: Date, locale: Locale, dateFormat = 'MMMM d, yyyy, h:mm a') {
  return format(date, dateFormat, { locale });
}
