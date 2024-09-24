import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ApolloProvider } from "@apollo/client";

import { config } from "../wagmi";
import { clientConfig } from "@/lib/apolloClient";
import { MessageProvider } from "@/providers/MessageProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const changeLanguage = useChangeLanguage();

  useEffect(() => {
    const { locale } = router;
    if (locale && i18n.language !== locale) {
      changeLanguage(locale); // 更新语言
    }
  }, [changeLanguage, router, router.locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <MessageProvider>
              <ApolloProvider client={clientConfig}>
                <Component {...pageProps} />
              </ApolloProvider>
            </MessageProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </I18nextProvider>
  );
}
