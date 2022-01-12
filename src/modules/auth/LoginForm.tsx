/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/12/22, 9:45 AM
 *
 *
 */

import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { PrimaryInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { alert } from "@/components/Alert";
import { login } from "@/services/requests/authRequests";

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Not a valid Email"
    )
    .email("Not a Valid Email")
    .required("Required field"),
});

const LoginForm: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <form
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
      className="space-y-8"
    >
      <div className="space-y-4">
        <PrimaryInput
          label="Email"
          type="email"
          data-testid="email"
          placeholder="Enter email"
          {...register("email")}
          error={errors.email?.message}
        />
        <PrimaryInput
          label="Password"
          type="password"
          data-testid="password"
          placeholder="Enter Password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <Button loading={isSubmitting} data-testid="login">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
