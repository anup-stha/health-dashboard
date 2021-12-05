import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { HookInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
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
        <HookInput
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
          error={errors.email?.message}
        />
        <HookInput
          label="Password"
          type="password"
          placeholder="Enter Password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <Button loading={isSubmitting}>Log In</Button>
    </form>
  );
};

export default LoginForm;
