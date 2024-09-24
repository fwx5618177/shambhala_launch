import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/common.json";
import enTerms from "./locales/en/terms.json";
import enPrivacy from "./locales/en/privacy.json";

import jpTranslation from "./locales/jp/common.json";
import jpTerms from "./locales/jp/terms.json";
import jpPrivacy from "./locales/jp/privacy.json";

import zhTranslation from "./locales/zh/common.json";
import zhTerms from "./locales/zh/terms.json";
import zhPrivacy from "./locales/zh/privacy.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  supportedLngs: ["en", "jp", "zh"],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { common: enTranslation, terms: enTerms, privacy: enPrivacy },
    jp: { common: jpTranslation, terms: jpTerms, privacy: jpPrivacy },
    zh: { common: zhTranslation, terms: zhTerms, privacy: zhPrivacy },
  },
  detection: {
    order: ["path", "cookie", "localStorage", "navigator"], // 检测语言顺序，首先通过 URL 路径检测
    caches: ["cookie"], // 缓存选项
  },
});

export default i18n;
