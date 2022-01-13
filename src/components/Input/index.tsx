/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/12/22, 5:32 PM
 *
 *
 */

import { Eye, EyeClosed } from "phosphor-react";
import React from "react";
import InputErrorPop from "../PopOver";
import { Controller } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";

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
            autoComplete={props.autoComplete ?? "off"}
            required={props.required !== false}
            className={
              error
                ? "input_error relative shadow-E200"
                : "input_container shadow-E200"
            }
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

type HookSearchInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
};

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  HookSearchInputProps
>(({ label, error, ...props }, ref) => {
  return (
    <div className={` w-full input`}>
      <div className="relative w-full">
        <input
          {...props}
          autoComplete={props.autoComplete ?? "off"}
          required={props.required !== false}
          className={
            error
              ? "input_error relative pr-32 shadow-lg"
              : "input_container pr-32 shadow-sm ring-1 ring-gray-400/20"
          }
          ref={ref}
        />
      </div>

      <label htmlFor={props.id} className="input_label text-gray-700">
        {label}
      </label>
    </div>
  );
});

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

export const RadioInput = React.forwardRef<HTMLInputElement, HookInputProps>(
  ({ label, error, value, ...props }, ref) => {
    return (
      <div className="flex space-x-2">
        <input {...props} type="radio" value={value} ref={ref} />
        <div className="text-xl capitalize">{label}</div>
      </div>
    );
  }
);

type RadioInputProps = {
  name: string;
  control: any;
  labelOptions: {
    label: string;
    value: string | number;
  }[];
};

export const RadioInputController: React.FC<RadioInputProps> = ({
  name,
  control,
  labelOptions,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <RadioGroup
          value={field.value}
          onChange={field.onChange}
          className={"flex space-x-6 focus-visible:outline-amber-800"}
        >
          {labelOptions.map((labelOption, index) => (
            <RadioGroup.Option
              value={labelOption.value}
              key={index}
              className={({ active }) => `${active ? "outline-0" : ""}`}
            >
              {({ checked }) => (
                <div className="flex space-x-2">
                  <input checked={checked} type="radio" readOnly />
                  <div className="text-xl capitalize">{labelOption.label}</div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      )}
    />
  );
};

PrimaryInput.displayName = "PrimaryInput";
SwitchInput.displayName = "SwitchInput";
RadioInput.displayName = "RadioInput";
SearchInput.displayName = "SearchInput";
