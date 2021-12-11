/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

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
          alert({ type, promise: toastPromise(), id: "Test" });
        }}
      >
        Launch Toast
      </button>
    </div>
  );
};

export default AlertComponent;
