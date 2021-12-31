/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/31/21, 10:31 AM
 *
 *
 */

import React from "react";
import LoaderComponent from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="h-[55vh] flex items-center justify-center">
      <LoaderComponent type={"MutatingDots"} />
    </div>
  );
};
