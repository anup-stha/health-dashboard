/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 9:39 AM
 *
 *
 */

import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.scss";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastComponent } from "@/components/Alert/Toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

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
