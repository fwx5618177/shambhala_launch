import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { config } from "../wagmi";
import { ApolloProvider } from "@apollo/client";
import { clientconfig } from "../http/apolloClient";
const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <WagmiProvider config={config}>
        <ApolloProvider client={clientconfig}>
          <QueryClientProvider client={client}>
            <RainbowKitProvider>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </WagmiProvider>
    </I18nextProvider>
  );
}
