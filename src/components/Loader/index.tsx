/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import React from "react";
import LoaderComponent from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="h-[55vh] flex items-center justify-center">
      <LoaderComponent type="Bars" />
    </div>
  );
};

export const MainLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center" data-testid="loader">
      <LoaderComponent type="Bars" />
    </div>
  );
};
