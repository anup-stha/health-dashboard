import React from "react";
import { Toaster } from "react-hot-toast";
import { alert, toastProps } from "./index";
import { action } from "@storybook/addon-actions";

const AlertComponent: React.FC<toastProps> = ({ type }) => {
  const toastPromise = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello");
      }, 2000);
    });

  return (
    <div>
      <Toaster />
      <button
        onClick={() => {
          action("Click")(type);
          alert({ type, promise: toastPromise() });
        }}
      >
        Launch Toast
      </button>
    </div>
  );
};

export default AlertComponent;
