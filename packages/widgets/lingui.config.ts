import type { LinguiConfig } from '@lingui/conf';
import { formatter } from '@lingui/format-po';

// TODO sync locales with webapp
const config: LinguiConfig = {
  locales: ['en', 'es', 'es-AR', 'es-ES', 'ko'],
  catalogs: [
    {
      path: 'src/locales/{locale}',
      include: ['src']
    }
  ],
  format: formatter({ lineNumbers: false }),
  compileNamespace: 'ts'
};

export default config;
