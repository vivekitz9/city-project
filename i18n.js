import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/language/en.json'
import hi from './src/language/hi.json'

export const resources = {
    en: {
        translation: en
    },
    hi: {
        translation: hi
    },
};

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: "en",
    resources,
    lng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
        escapeValue: false, // react already safes from xss
    }
});

export default i18next;