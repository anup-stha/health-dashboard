import React from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled ?? loading}
      className="flex items-center px-12 py-3 text-lg font-medium text-white bg-green-500 rounded-sm disabled:opacity-80 gap-x-2 hover:bg-green-600 shadow-E400 disabled:cursor-not-allowed"
    >
      {loading ? <div className="loading"></div> : null}
      {children}
    </button>
  );
};
