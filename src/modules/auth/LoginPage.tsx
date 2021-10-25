import React from "react";
import Image from "next/image";
import LoginAvatar from "/public/login-icon.svg";
import { CaretCircleRight } from "phosphor-react";
import { Button } from "@/components/Button";
import { useRouter } from "next/dist/client/router";
import { loginUser } from "@/lib/requests";
import { useTokenStore } from "@/modules/auth/useTokenStore";
import { LoginRequest } from "@/types";
import { PrimaryInput } from "./../../components/Input/index";

export const LoginPage = () => {
  const router = useRouter();
  const hasTokens = useTokenStore(
    (s: any) => !!(s.accessToken && s.refreshToken)
  );
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const request: LoginRequest = {
    username: email,
    password: password,
  };

  React.useEffect(() => {
    hasTokens && router.push("/dashboard");
  }, [hasTokens, router]);

  const onLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);
    await loginUser(request)
      .then((response) => {
        useTokenStore.getState().setTokens({
          accessToken: response.data.auth.access_token,
          refreshToken: response.data.auth.refresh_token,
        });
        setLoading(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        setLoading(false);
        setEmail("");
        setPassword("");
        console.log(error);
      });
  };

  return (
    <div className="h-screen py-20 overflow-hidden px-72 lg:bg-red-700 bg-green-50 lg:px-2">
      <div className="flex h-full bg-white rounded-3xl shadow-E400">
        <div className="flex flex-col items-center justify-center w-2/5 bg-green-400 rounded-tr-none rounded-br-none gap-y-24 z-2 bg-transition rounded-3xl ">
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
        <div className="flex flex-col justify-between w-3/5 px-24 bg-white rounded-tl-none rounded-bl-none py-28 rounded-3xl bg-out-transition fadeInLogin">
          <div className="flex flex-col text-left">
            <p className="text-5xl font-medium text-gray-850">
              Hello! Welcome Back
            </p>
            <p className=" text-[1.4rem] font-light text-gray-850 ">
              Log in with your credentials you entered during your registration.
            </p>
          </div>

          <form className="w-full space-y-8" onSubmit={(e) => onLogin(e)}>
            <div className="space-y-6 ">
              <PrimaryInput
                type="email"
                id="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <PrimaryInput
                type="password"
                id="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <Button type="loading" loading={loading}>
              Login
            </Button>
          </form>

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
            and
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
  );
};
