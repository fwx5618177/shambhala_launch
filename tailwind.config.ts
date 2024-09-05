import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xl: ["48px", { lineHeight: "1" }], // 大标题
        lg: ["34px", { lineHeight: "1" }], // 标题
        md: ["32px", { lineHeight: "1" }], // 小标题
        desc: ["14px", { lineHeight: "1" }], // 描述
        number: ["40px", { lineHeight: "1" }], // 数字
        coinXl: ["44px", { lineHeight: "1" }], // 超大币种
        coinLg: ["28px", { lineHeight: "1" }], // 大币种
        coinMd: ["20px", { lineHeight: "1" }], // 中币种
        coinSm: ["18px", { lineHeight: "1" }], // 小币种
        tab: ["14px", { lineHeight: "1" }], // 标签
      },
      colors: {
        // 颜色
        primary: "#000000", // 内容/标题
        secondary: "#929292", // 副内容/副标题
        coin: "#040404", // 币种
        success: "#60B96E", // 成功/涨
        error: "#FF574D", // 错误/跌
        low: "#F7F7F7", // 选中低色
        cardBg: "#FFFFFF", // 卡片背景色
        button: "#f4f4f4",
        apy: {
          // 首页推广 APY 渐变色
          from: "#6DD0A1",
          to: "#9EF34C",
        },
        activeTab: "#ffffff",
        tabBorder: "#353535",
        inactiveTab: "#686868",
        bannerBg: "#181818",
      },
      backgroundImage: {
        // 渐变背景
        apy: "linear-gradient(90deg, #6DD0A1 0%, #9EF34C 100%)",
      },
      boxShadow: {
        // 投影效果
        card: "0px 2px 20px rgba(114, 144, 153, 0.5)", // y轴偏移 2px，模糊半径 20px，投影颜色 #729099，透明度 50%
      },
      borderRadius: {
        card: "8px", // 卡片圆角
        coin: "50%", // 圆形
        button: "30px",
      },
      spacing: {
        mini: "-5px",
        normal: "-10px",
      },
      width: {
        400: "400px",
        200: "200px",
      },
      height: {
        42: "42px",
      },
      transitionDuration: {
        "300": "300ms",
      },
      opacity: {
        "75": "0.75",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".button-hover": {
          transition: "all 300ms ease-in-out",
          "&:hover": {
            boxShadow: "0px 2px 20px rgba(114, 144, 153, 0.5)",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

export default config;
