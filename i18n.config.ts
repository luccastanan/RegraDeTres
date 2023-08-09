import translations from '@/translations';
import RNLanguageDetector from '@/utils/languageDetector';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: translations,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
