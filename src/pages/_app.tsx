import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default MyApp;
