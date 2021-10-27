import React from "react";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type?: "loading" | string;
  loading?: boolean;
};

export const Button = ({ children, type, loading, onClick }: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex items-center px-12 py-3 text-lg font-medium text-white bg-green-500 rounded-sm disabled:opacity-80 gap-x-2 hover:bg-green-600 shadow-E400"
    >
      {loading ? <div className="loading"></div> : null}
      {children}
    </button>
  );
};
