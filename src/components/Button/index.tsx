import clsx from "clsx";
import React from "react";

// Default Button props
interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

// Custom Props
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "fill" | "outline";
type ButtonColor = "primary" | "warning" | "secondary" | "error";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean;
}

const buttonConfig = {
  primary: {
    fill: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white hover:text-gray-100",
    outline: "border-2 border-primary-500 text-primary-500  bg-opacity-0 hover:bg-primary-25",
  },
  secondary: {
    fill: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white hover:text-gray-100",
    outline: "border-2 border-gray-500 text-gray-500  bg-opacity-0 hover:bg-secondary-25",
  },
  error: {
    fill: "bg-error-500 hover:bg-error-600 active:bg-error-700 text-white hover:text-gray-100",
    outline: "border-2 border-error-500 text-error-500  bg-opacity-0 hover:bg-error-25",
  },
  warning: {
    fill: "bg-warning-500 hover:bg-warning-600 active:bg-warning-700 text-white hover:text-gray-100",
    outline: "border-2 border-warning-500 text-warning-500  bg-opacity-0 hover:bg-warning-25",
  },

  sm: "px-6 py-4 text-lg rounded-md active:shadow-sm",
  md: "px-10 py-5 text-xl rounded-md active:shadow-md",
  lg: "px-12 py-6 text-xl rounded-md active:shadow-md",
};

export const Button = ({
  children,
  size = "md",
  color = "primary",
  variant = "fill",
  loading = false,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx(
        "cursor-pointer flex items-center justify-center gap-2 transition-colors transition-shadow duration-200 font-primary disabled:cursor-not-allowed disabled:bg-opacity-70",
        buttonConfig[size],
        {
          [buttonConfig[color].fill]: variant === "fill",
          [buttonConfig[color].outline]: variant === "outline",
        }
      )}
      {...props}
    >
      {loading ? <div className="loading" /> : null}
      {children}
    </button>
  );
};
