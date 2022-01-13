/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/13/22, 1:16 PM
 *
 *
 */

import React from "react";
import LoaderComponent from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="h-[55vh] flex items-center justify-center">
      <LoaderComponent type={"Bars"} />
    </div>
  );
};

export const MainLoader = () => {
  return (
    <div
      className="h-screen flex items-center justify-center"
      data-testid="loader"
    >
      <LoaderComponent type={"Bars"} />
    </div>
  );
};
