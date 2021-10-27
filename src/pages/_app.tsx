import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} /> <Toaster />{" "}
    </>
  );
};
export default MyApp;
