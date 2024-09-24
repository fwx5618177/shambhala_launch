import { useRouter } from "next/router";
import i18n from "i18next";

/**
 * 自定义 Hook：用于切换语言并更新路由
 */
export const useChangeLanguage = () => {
  const router = useRouter();

  const changeLanguageWithRouter = (lang: string) => {
    // 切换 i18n 的语言
    i18n.changeLanguage(lang);

    // 构造新的 URL 路径
    const newPathname = router.pathname.replace(
      `/${router.locale}`,
      `/${lang}`
    );

    // 更新路由以切换语言
    router.push({ pathname: newPathname, query: router.query }, undefined, {
      locale: lang,
    });
  };

  return changeLanguageWithRouter;
};
