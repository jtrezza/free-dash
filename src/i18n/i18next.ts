import i18next from 'i18next';
import english from './en.json';
import spanish from './es.json';

import { initReactI18next } from 'react-i18next';

//empty for now
const resources = {
  en: english,
  es: spanish,
  'es-US': spanish,
};

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  react:{
    useSuspense:false,
  }
});

export default i18next;