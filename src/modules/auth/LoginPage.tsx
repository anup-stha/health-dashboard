/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/11/22, 10:59 AM
 *
 *
 */

import React from "react";
import Image from "next/image";
import { CaretCircleRight } from "phosphor-react";
import LoginForm from "./LoginForm";

export const LoginPage = () => {
  return (
    <div
      suppressHydrationWarning={true}
      className="flex flex-col items-center justify-center w-full min-h-screen py-20 bg-gray-100 sm:bg-gray-200  lg:py-8 md:px-8 sm:p-0 sm:h-screen"
    >
      <div className="flex w-full bg-white max-w-6xl flex-grow rounded-3xl shadow-E400 3xl:max-w-[60%] sm:max-w-none h-full">
        <div className="flex flex-col items-center justify-center w-2/5 bg-green-400 rounded-tr-none rounded-br-none sm:rounded-none sm:w-0 gap-y-24 z-2 bg-transition rounded-3xl sm:opacity-0 ">
          <Image
            src="/assets/logo-sunya.svg"
            alt="Login Avatar"
            width={144}
            height={144}
            objectFit="contain"
          />
          <div className="w-2/3 text-center">
            <h1 className="text-4xl font-extrabold text-center text-gray-850">
              Sunya Health
            </h1>
            <p className="text-xl font-light text-gray-800">
              Please Log in to continue to Dashboard
            </p>
          </div>
          <CaretCircleRight
            size={64}
            weight="fill"
            className="filter drop-shadow-2xl text-gray-850"
          />
        </div>
        <div className="flex flex-col justify-between gap-y-20 w-3/5 px-20 py-32 sm:px-4 sm:bg-gray-200 rounded-tl-none rounded-bl-none  sm:rounded-none sm:justify-center sm:w-full sm:h-full sm:py-6 lg:px-12  bg-out-transition fadeInLogin ">
          <div className="gap-y-28 flex flex-col sm:px-8 sm:py-12 sm:rounded-2xl sm:shadow-E300 sm:bg-white">
            <div className="flex flex-col text-left">
              <p className="text-5xl font-medium text-gray-800 sm:text-4xl lg:text-3xl">
                Hello! Welcome Back
              </p>
              <p className=" text-[1.4rem] font-light text-gray-850 lg:text-lg ">
                Log in with your credentials you entered during your
                registration.
              </p>
            </div>
            <LoginForm />
            <div className="-mt-5  flex flex-col items-start ">
              <div className="text-base font-semibold text-gray-600">
                &#169; Copyright by Sunya Health Pvt. Ltd.
              </div>
              <p className="text-base font-medium text-gray-500">
                By logging in you accept our
                <a
                  className="text-green-500 cursor-pointer hover:text-green-600"
                  href="https://sunya.health/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  className="text-green-500 cursor-pointer hover:text-green-600"
                  href="https://sunya.health/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
