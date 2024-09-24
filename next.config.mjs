/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "jp", "zh"],
    defaultLocale: "en",
    localeDetection: true,
  },
};

export default nextConfig;
