/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 3:39 PM
 *
 *
 */

import Skeleton from "react-loading-skeleton";
import React from "react";

export const ProfileSubsLoadingState = () => {
  return (
    <div className=" space-y-4">
      <div className="w-2/3">
        <Skeleton count={1} duration={2} />
      </div>
      <div>
        <Skeleton count={1} duration={2} />
        <Skeleton count={1} duration={2} /> <Skeleton count={1} duration={2} />
        <Skeleton count={1} duration={2} />
      </div>
    </div>
  );
};

export const ProfileListLoadingState = () => {
  return (
    <div className=" print:hidden self-start flex flex-col w-full  space-y-4">
      <div className="w-1/5">
        <Skeleton count={1} duration={2} height={"1rem"} />
      </div>
      <div>
        <Skeleton count={1} duration={2} />
      </div>
      <Skeleton count={1} duration={2} height={"32rem"} />
    </div>
  );
};
