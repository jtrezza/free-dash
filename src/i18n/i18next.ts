import i18next from 'i18next';
import english from './en.json';
import spanish from './es.json';

import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

export const RNLanguageDetector = {
  type: 'languageDetector',
  init: () => { },
  detect: () => {
      const locale = Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
          : NativeModules.I18nManager.localeIdentifier;
      return locale.split('_')[0];
  },
  cacheUserLanguage: () => { },
};

//empty for now
const resources = {
  en: english,
  es: spanish,
  'es-US': spanish,
};

i18next.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  fallbackLng: "en",
});

export default i18next;