/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { action } from "@storybook/addon-actions";
import React from "react";
import { Toaster } from "react-hot-toast";

import { alert, toastProps } from "./index";

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
