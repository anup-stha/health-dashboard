/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/7/22, 11:52 AM
 *
 *
 */

import Image from "next/image";
import { CaretCircleRight } from "phosphor-react";
import React from "react";
import { useCookies } from "react-cookie";

import { Button } from "@/components/Button";

import LoginForm from "./LoginForm";

export const LoginPage = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  console.log(cookies);

  return (
    <div
      suppressHydrationWarning={true}
      data-testid="login-page"
      className="relative flex flex-col items-center justify-center w-full min-h-screen py-20 bg-gray-100 lg:py-8 md:px-8 sm:px-4 "
    >
      <div className="flex w-full bg-white max-w-6xl flex-grow rounded-3xl shadow-E400 3xl:max-w-[60%] sm:max-w-none sm:rounded-lg sm:shadow-E100 h-full sm:flex-grow-0">
        <div className="relative flex flex-col items-center justify-center w-2/5 bg-primary-400 rounded-tr-none rounded-br-none sm:rounded-none sm:w-0 gap-y-32 z-2 bg-transition rounded-3xl sm:opacity-0 ">
          {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? (
            <div className="bg-triangle absolute bg-black text-white w-32 h-32 z-50 text-4xl font-medium top-0 left-0 rounded-tl-3xl">
              <span className="-rotate-45 absolute top-[1.3rem] left-2">DEV</span>
            </div>
          ) : null}
          <Image src="/assets/logo-sunya.svg" alt="Login Avatar" width={144} height={144} objectFit="contain" />
          <div className="w-2/3 space-y-2 text-center">
            <h1 className="text-4xl font-bold uppercase text-center font-vietnam text-gray-800">Sunya Health</h1>
            <p className="text-xl font-light text-gray-600">Please sign in to continue to dashboard.</p>
          </div>
          <CaretCircleRight size={64} weight="fill" className="filter drop-shadow-2xl text-gray-800" />
        </div>
        <div className="flex flex-col justify-center w-3/5 px-20 py-20 gap-28 sm:gap-16 sm:px-6 sm:py-8 rounded-tl-none rounded-bl-none  sm:rounded-none sm:justify-center sm:w-full sm:px-6 lg:px-12  bg-out-transition  ">
          <div className="flex flex-col text-left fadeInLogin">
            <h1 className="text-5xl  font-vietnam text-gray-800 sm:text-4xl">Hello! Welcome Back</h1>
            <p className="text-[1.4rem] font-light text-gray-500 lg:text-lg ">
              Log in with your credentials you entered during your registration.
            </p>
          </div>
          <LoginForm />
          <Button
            onClick={() => {
              console.log("Clicked");

              setCookie("token", "134130");
              setCookie("token", "134130", { domain: "school.sunya.health" });
            }}
          >
            Set Cookie
          </Button>
          <div className="pt-8 gap-2 flex flex-col items-start fadeInLogin">
            <div className="text-base font-medium text-gray-600">&#169; Copyright by Sunya Health Pvt. Ltd.</div>
            <p className="text-base font-medium text-gray-400">
              By logging in you accept our
              <a
                className="text-primary-500 cursor-pointer hover:text-primary-600"
                href="https://sunya.health/privacy"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="text-primary-500 cursor-pointer hover:text-primary-600"
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
  );
};
