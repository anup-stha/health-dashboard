/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 6:16 PM
 *
 *
 */

import Skeleton from "react-loading-skeleton";
import React from "react";

export const ProfileSubsLoadingState = () => {
  return (
    <div className=" print:hidden self-start flex flex-col w-full  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
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
    <div className=" print:hidden self-start flex flex-col w-full  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
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
