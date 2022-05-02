/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import React from "react";
import Skeleton from "react-loading-skeleton";

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
        <Skeleton count={1} duration={2} height="1rem" />
      </div>
      <div>
        <Skeleton count={1} duration={2} />
      </div>
      <Skeleton count={1} duration={2} height="32rem" />
    </div>
  );
};
