/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { promiseToast } from "@/components/Toast";

import { AuthQuery } from "./query/AuthQuery";

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Not a valid email address"
    )
    .email("Not a valid email address")
    .required("This field is required"),

  password: yup.string().required("This field is required"),
});

const LoginForm: React.FC<any> = () => {
  const { mutateAsync: login } = AuthQuery.useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const loginSubmitHandler = handleSubmit(async (data) => {
    await promiseToast({
      promise: login(data),
      onSuccess: () => reset(),
      msgs: {
        loading: "Logging In",
        success: "Logged In Successfully",
      },
      isModal: false,
      id: "login-toast",
    });
  });

  return (
    <form data-testid="login-form" onSubmit={loginSubmitHandler} className="space-y-8 flex flex-col fadeInLogin">
      <div className="space-y-4 fadeInLogin">
        <Input
          label="Email Address"
          type="email"
          data-testid="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          data-testid="password"
          placeholder="Enter Password"
          {...register("password", { required: true })}
          error={errors.password?.message}
        />
      </div>
      <Button size="lg" loading={isSubmitting} data-testid="login">
        Login To Dashboard
      </Button>
    </form>
  );
};

export default LoginForm;
