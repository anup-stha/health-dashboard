/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 7:21 PM
 *
 *
 */

import React from "react";
import LoaderComponent from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <LoaderComponent type={"MutatingDots"} />
    </div>
  );
};
