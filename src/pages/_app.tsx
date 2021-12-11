/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import type { AppProps } from "next/app";
import * as React from "react";
import "../styles/globals.scss";
import { resolveValue, Toast, Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CheckCircle, WarningCircle } from "phosphor-react";
import { Transition } from "@headlessui/react";
import { Oval } from "react-loading-icons";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SkeletonTheme>
      <Component {...pageProps} />
      <ToastComponent />
    </SkeletonTheme>
  );
};

export default MyApp;

export const ToastComponent = () => {
  return (
    <Toaster gutter={24}>
      {(t: Toast) => {
        return (
          <Transition as={"div"} appear show={t.visible}>
            {t.type === "loading" ? (
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 -translate-y-32"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <div className="flex bg-white max-w-3xl min-w-[30rem] rounded-lg shadow-md dark:bg-gray-800">
                  <div className="flex items-center justify-center px-3 bg-gray-500 text-white text-5xl shadow-lg rounded-l-lg">
                    <Oval strokeWidth={5} height={"2rem"} />
                  </div>

                  <div className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-2xl font-Inter font-medium text-gray-700 dark:text-green-400">
                        Loading
                      </span>
                      <p className="max-w-2xl text-xl font-Inter text-gray-500  dark:text-gray-200  line-clamp-2 ">
                        {resolveValue(t.message, t)}
                      </p>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            ) : t.type === "error" ? (
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 -translate-y-32"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <div className="flex bg-white max-w-3xl min-w-[30rem] rounded-lg shadow-md dark:bg-gray-800">
                  <div className="flex items-center justify-center px-4 bg-red-500 text-white shadow-lg rounded-l-lg">
                    <WarningCircle weight="fill" size={32} />
                  </div>

                  <div className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-2xl font-Inter font-medium text-red-600 dark:text-green-400">
                        Error
                      </span>
                      <p className="max-w-lg text-xl font-Inter text-gray-500 dark:text-gray-200  line-clamp-2 ">
                        {resolveValue(t.message, t)}
                      </p>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            ) : (
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 -translate-y-32"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
              >
                <div className="flex bg-white max-w-3xl min-w-[30rem] rounded-lg shadow-md dark:bg-gray-800">
                  <div className="flex items-center justify-center px-4 bg-emerald-500 text-white text-5xl shadow-lg rounded-l-lg">
                    <CheckCircle weight="fill" size={32} />
                  </div>

                  <div className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-2xl font-Inter font-medium text-emerald-600 dark:text-green-400">
                        Success
                      </span>
                      <p className="max-w-2xl text-xl font-Inter text-gray-500 dark:text-gray-200  line-clamp-2 ">
                        {resolveValue(t.message, t)}
                      </p>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            )}
          </Transition>
        );
      }}
    </Toaster>
  );
};
