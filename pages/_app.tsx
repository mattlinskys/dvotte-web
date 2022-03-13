import React from "react";
import type { AppProps } from "next/app";
import { providers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import AutoConnect from "components/AutoConnect";

import "api/preset";
import "styles/globals.css";
import { appWithTranslation } from "next-i18next";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Web3ReactProvider
    getLibrary={(provider) => {
      return new providers.Web3Provider(provider);
    }}
  >
    <AutoConnect />

    <Component {...pageProps} />
  </Web3ReactProvider>
);

export default appWithTranslation(App);
