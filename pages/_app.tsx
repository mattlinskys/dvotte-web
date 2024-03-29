import React from "react";
import type { AppProps } from "next/app";
import { providers } from "ethers";
import { appWithTranslation } from "next-i18next";
import { theme } from "config/theme";
import { presetApi } from "api/preset";
import { Web3ReactProvider } from "@web3-react/core";
import { ChakraProvider } from "@chakra-ui/react";
import ChainsProvider from "providers/ChainsProvider";
import AuthProvider from "providers/AuthProvider";
import AutoConnectProvider from "providers/AutoConnectProvider";
import RecentlyViewiedContractsProvider from "providers/RecentlyViewiedContractsProvider";

import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

presetApi();

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Web3ReactProvider
      getLibrary={(provider) => {
        return new providers.Web3Provider(provider);
      }}
    >
      <ChainsProvider>
        <RecentlyViewiedContractsProvider>
          <AutoConnectProvider>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </AutoConnectProvider>
        </RecentlyViewiedContractsProvider>
      </ChainsProvider>
    </Web3ReactProvider>
  </ChakraProvider>
);

export default appWithTranslation(App);
