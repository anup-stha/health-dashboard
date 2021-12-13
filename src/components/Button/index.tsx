/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 1:46 AM
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
    buttonSize === "small" ? "px-8 py-4 shadow-md" : "px-12 py-4 shadow-E400";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={`flex items-center ${buttonPadding} ${
        width ? "w-full justify-center py-4" : ""
      } cursor-pointer text-center text-xl font-medium text-white bg-green-500 rounded-sm disabled:opacity-80 gap-x-2 hover:bg-green-600 shadow-E400 disabled:cursor-not-allowed`}
    >
      {loading ? <div className="loading"></div> : null}
      {children}
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
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex  ${
        width && "w-full justify-center py-4"
      } capitalize items-center px-12 py-4 text-center text-xl font-medium text-white bg-neutral-700 rounded-md disabled:opacity-80 gap-x-2 hover:bg-neutral-800 shadow-lg disabled:cursor-not-allowed`}
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

export const LineButton: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
  width,
  type = "submit",
  buttonSize = "large",
  variant = "normal",
}: ButtonProps) => {
  const buttonPadding = buttonSize === "small" ? "px-8 py-4" : "px-12 py-4";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled ?? loading}
      className={`flex items-center ${buttonPadding} ${
        width ? "w-full justify-center py-4" : ""
      } cursor-pointer text-center text-xl font-medium text-neutral-700 border-neutral-700 border-2 bg-transparent rounded-lg disabled:opacity-80 gap-x-2 hover:bg-neutral-700 hover:text-white disabled:cursor-not-allowed transition-all duration-200`}
    >
      {loading ? <div className="loading"></div> : null}
      {children}
    </button>
  );
};
