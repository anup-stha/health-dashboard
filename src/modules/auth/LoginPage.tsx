import { loginUser } from "@/lib/requests";
import { useTokenStore } from "@/modules/auth/useTokenStore";
import { LoginRequest } from "@/types";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { CaretCircleRight } from "phosphor-react";
import React from "react";
import LoginForm from "./LoginForm";
import LoginAvatar from "/public/login-icon.svg";

export const LoginPage = () => {
  const router = useRouter();

  const onLogin = async (email: string, password: string) => {
    const request: LoginRequest = { username: email, password };

    return new Promise(
      async (resolve, reject) =>
        await loginUser(request)
          .then((response) => {
            useTokenStore.getState().setTokens({
              accessToken: response.data.access,
              refreshToken: response.data.refresh,
            });
            router.push("/dashboard");
            resolve("Logged In");
          })
          .catch((error) => {
            reject(error.response.data.detail);
            console.log(error.response);
          })
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen py-20 overflow-hidden bg-green-50 lg:py-64 md:px-8 sm:p-0 ">
      <div className="flex w-full h-full bg-white max-w-6xl rounded-3xl shadow-E400 3xl:max-w-[80%] sm:max-w-none">
        <div className="flex flex-col items-center justify-center w-2/5 bg-green-400 rounded-tr-none rounded-br-none sm:rounded-none sm:w-0 gap-y-24 z-2 bg-transition rounded-3xl sm:opacity-0 ">
          <Image
            src={LoginAvatar}
            alt="Login Avatar"
            width={144}
            height={144}
            objectFit="contain"
          />
          <div className="w-2/3 text-center">
            <h1 className="text-3xl font-extrabold text-center text-gray-850">
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
        <div className="flex items-center w-3/5 px-20 py-32 rounded-tl-none rounded-bl-none sm:px-8 sm:bg-green-50 sm:rounded-none sm:justify-center sm:w-full sm:h-full sm:py-6 lg:px-12 rounded-3xl bg-out-transition fadeInLogin ">
          <div className="flex flex-col justify-between h-full bg-white sm:h-auto lg:justify-center sm:px-8 sm:shadow-E400 sm:py-8 lg:gap-y-16 sm:gap-y-12 sm:rounded-xl">
            <div className="flex flex-col text-left">
              <p className="text-5xl font-medium text-gray-800 sm:text-4xl">
                Hello! Welcome Back
              </p>
              <p className=" text-[1.4rem] font-light text-gray-850 lg:text-lg ">
                Log in with your credentials you entered during your
                registration.
              </p>
            </div>
            <LoginForm onLogin={onLogin} />

            <p className="text-base font-medium text-gray-600">
              * By logging in you accept our
              <a
                className="text-green-500 cursor-pointer"
                href="https://sunyahealth-landing.vercel.app/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="text-green-500 cursor-pointer"
                href="https://sunyahealth-landing.vercel.app/terms"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
