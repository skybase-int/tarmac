import { WidgetsConfig } from '@jetstreamgg/sky-widgets';

export type ThemeColor = {
  default: string;
  _dark?: string;
};

export type SiteConfig = WidgetsConfig & {
  name: string;
  description: string;
  daiSavingsReferral: number;
  logo: string;
  favicon: string;
  locale: string | undefined;
};
