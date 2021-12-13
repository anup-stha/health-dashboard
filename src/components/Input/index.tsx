/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 4:59 PM
 *
 *
 */

import { Eye, EyeClosed } from "phosphor-react";
import React from "react";
import InputErrorPop from "../PopOver";

type ExtraInputProps = {
  label?: string;
  error?: string;
};

type HookInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  ExtraInputProps;

export const PrimaryInput = React.forwardRef<HTMLInputElement, HookInputProps>(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className={` w-full input`}>
        <div className="relative w-full">
          <input
            {...props}
            required={props.required}
            className={error ? "input_error relative" : "input_container"}
            ref={ref}
            type={
              props.type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : props.type
            }
          />
          {props.type === "password" && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-6 top-1/2 hover:text-gray-600 nofadeInLogin"
            >
              <div className="relative flex ">
                <div
                  className={`${
                    !showPassword ? "absolute opacity-100" : "opacity-0"
                  }`}
                >
                  <Eye size={18} weight="bold" />
                </div>
                <div
                  className={`${
                    showPassword ? "absolute opacity-100" : "opacity-0"
                  } `}
                >
                  <EyeClosed size={18} weight="bold" />
                </div>
              </div>
            </button>
          )}
          {error && <InputErrorPop error={error} />}
        </div>

        {/* // {showLabel && ( */}
        <label htmlFor={props.id} className="input_label text-gray-700">
          {label}
        </label>
        {/* // )} **/}
      </div>
    );
  }
);

export const SwitchInput = React.forwardRef<HTMLInputElement, HookInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="  mb-12">
        <label htmlFor={label} className="flex items-center cursor-pointer">
          <div className="input_label capitalize mr-4">{label}</div>

          <div className="relative">
            <input
              {...props}
              id={label}
              type="checkbox"
              className="sr-only"
              checked={props.checked}
              ref={ref}
            />
            <div className="w-14 h-6 bg-gray-400 rounded-full shadow-inner" />

            <div className="dot absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition" />
          </div>
        </label>
      </div>
    );
  }
);

PrimaryInput.displayName = "PrimaryInput";
SwitchInput.displayName = "SwitchInput";
