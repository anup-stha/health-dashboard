import React from "react";
import clsx from "clsx";

// Default Button props
interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

// Custom Props
type ButtonSize = "sm" | "md" | "base" | "lg";
type ButtonVariant = "fill" | "outline" | "icon";
type ButtonColor = "primary" | "warning" | "secondary";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

const buttonConfig = {
  primary: {
    fill: "bg-green-500 text-white",
    outline:
      "border-2 border-green-500 text-green-500 bg-opacity-0 hover:bg-opacity-10",
  },
  secondary: {
    fill: "bg-blue-500 text-white",
    outline:
      "border-2 border-blue-500 hover:bg-blue-500 text-blue-500 bg-opacity-0 hover:bg-opacity-10",
  },
  warning: {
    fill: "bg-red-500 text-white",
    outline:
      "border-2 border-red-500 text-red-500 bg-opacity-0 hover:bg-opacity-10",
  },

  sm: "px-6 py-3",
  md: "px-4 py-2",
  base: "px-4 py-4",
  lg: "px-5 py-2",
};

export const Button = ({
  children,
  size = "base",
  color = "primary",
  variant = "fill",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx(
        "cursor-pointer rounded-xl disabled:cursor-not-allowed",
        buttonConfig[size],
        {
          [buttonConfig[color].fill]: variant === "fill",
          [buttonConfig[color].outline]: variant === "outline",
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};
