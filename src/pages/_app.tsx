import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SkeletonTheme baseColor="#D4D4D8" highlightColor="#A1A1AA">
      <Component {...pageProps} /> <Toaster />{" "}
    </SkeletonTheme>
  );
};
export default MyApp;
