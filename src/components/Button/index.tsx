/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/10/22, 10:29 AM
 *
 *
 */

import React from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  width?: "full";
  type?: any;
  extraClassName?: string;
  buttonSize?: "small" | "large";
  variant?: "info" | "warning" | "normal";
  state?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
  width,
  type = "submit",
  buttonSize = "large",
}: ButtonProps) => {
  const buttonPadding =
    buttonSize === "small"
      ? "px-8 py-4 sm:px-8 shadow-md"
      : "px-12 py-4 sm:px-8 shadow-E400";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={`flex items-center ${buttonPadding} ${
        width ? "w-full justify-center py-4" : ""
      } uppercase cursor-pointer text-center text-xl  font-semibold  text-white bg-green-500 rounded-sm disabled:opacity-80 gap-x-2 hover:bg-green-600 shadow-E400 disabled:cursor-not-allowed`}
    >
      {loading ? <div className="loading" /> : null}
      <span className={"sm:line-clamp-1"}>{children}</span>
    </button>
  );
};

export const IconButton: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center px-3 py-3 text-lg font-medium text-white bg-green-500 rounded-sm disabled:opacity-80 gap-x-2 hover:bg-green-600 shadow-E400 disabled:cursor-not-allowed"
      disabled={disabled ?? loading}
    >
      {loading ? <div className="loading_md"></div> : null}
      {children}
    </button>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  extraClassName,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${extraClassName} flex items-center  font-medium text-white bg-green-500 rounded-sm disabled:opacity-80 hover:bg-green-600 shadow-E400 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export const GrayButton: React.FC<ButtonProps> = ({
  children,
  extraClassName,
  onClick,
  width,
  buttonSize = "large",
}) => {
  const buttonPadding =
    buttonSize === "small"
      ? "px-8 py-3  sm:px-8 shadow-md"
      : "px-12 py-4 sm:px-8 shadow-E400";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex  ${
        width && "w-full justify-center py-4"
      } capitalize items-center ${buttonPadding} text-center text-xl font-medium text-white bg-gray-700 rounded-md disabled:opacity-80 gap-x-2 hover:bg-gray-800 shadow-lg disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export const WarningButton: React.FC<ButtonProps> = ({
  children,
  extraClassName,
  onClick,
  width,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center  ${
        width && "w-full justify-center py-4"
      } capitalize px-12 py-4  text-center text-xl font-medium text-white bg-red-600 rounded-md disabled:opacity-80 gap-x-2 hover:bg-red-800 shadow-lg disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export const InfoButton: React.FC<ButtonProps> = ({
  children,
  extraClassName,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center px-12 py-4  text-center text-xl font-medium text-white bg-green-500 rounded-sm disabled:opacity-80 gap-x-2 hover:bg-green-600 shadow-E200 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

export const RedLineButton: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
  width,
  type = "submit",
  buttonSize = "large",
  variant = "normal",
  state,
}: ButtonProps) => {
  const buttonPadding = buttonSize === "small" ? "px-8 py-4" : "px-12 py-4";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={`flex items-center ${buttonPadding} ${
        width ? "w-full justify-center py-4" : ""
      } capitalize cursor-pointer text-center text-xl font-medium text-red-700 border-red-500 border-2 bg-transparent rounded-lg disabled:opacity-80 gap-x-2 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed transition-all duration-200`}
    >
      {loading ? <div className="loading"></div> : null}
      {children}
    </button>
  );
};

export const GreenLineButton: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
  width,
  type = "submit",
  buttonSize = "large",
  variant = "normal",
  state,
}: ButtonProps) => {
  const buttonPadding = buttonSize === "small" ? "px-8 py-4" : "px-12 py-4";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={`flex items-center ${buttonPadding} ${
        width ? "w-full justify-center py-4" : ""
      } capitalize cursor-pointer text-center text-xl font-medium text-green-700 border-green-600 border-2 bg-transparent rounded-lg disabled:opacity-80 gap-x-2 hover:bg-green-600 hover:text-white disabled:cursor-not-allowed transition-all duration-200`}
    >
      {loading ? <div className="loading"></div> : null}
      {children}
    </button>
  );
};
