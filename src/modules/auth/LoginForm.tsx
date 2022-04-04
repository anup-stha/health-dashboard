/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:18 PM
 *
 *
 */

import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input from "@/components/Input";

import { login } from "@/services/requests/authRequests";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <form
      data-testid="login-form"
      onSubmit={handleSubmit(async (data) => {
        await alert({
          promise: login(data).then(() => reset()),
          msgs: {
            loading: "Logging In",
            success: "Logged In Successfully",
          },
          id: "Login Toast",
        });
      })}
      className="space-y-8 flex flex-col fadeInLogin"
    >
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
