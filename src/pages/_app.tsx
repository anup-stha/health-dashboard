/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/5/22, 1:19 PM
 *
 *
 */

import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastComponent } from "@/components/Alert/Toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: "always",
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme>
        <Component {...pageProps} />
        <ToastComponent />
      </SkeletonTheme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default MyApp;
