import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './locales/en_translation.json';

i18n
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'en',
    debug: false,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    resources: { en: { translations } },
  });

export default i18n;
