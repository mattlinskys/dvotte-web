import React from "react";
import type { AppProps } from "next/app";
import { providers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import AutoConnect from "components/AutoConnect";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { theme } from "config/theme";

import "api/preset";
import ChainsProvider from "providers/ChainsProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <Web3ReactProvider
      getLibrary={(provider) => {
        return new providers.Web3Provider(provider);
      }}
    >
      <ChainsProvider>
        <AutoConnect />
        <Component {...pageProps} />
      </ChainsProvider>
    </Web3ReactProvider>
  </ChakraProvider>
);

export default appWithTranslation(App);
