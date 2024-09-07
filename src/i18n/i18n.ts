import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/common.json";
import jpTranslation from "./locales/jp/common.json";
import zhTranslation from "./locales/zh/common.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "jp", "zh"],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { common: enTranslation },
    jp: { common: jpTranslation },
    zh: { common: zhTranslation },
  },
});

export default i18n;
