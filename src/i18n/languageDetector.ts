import { NativeModules, Platform } from 'react-native';

const RNLanguageDetector = {
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

export default RNLanguageDetector;