/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import times from "lodash/times";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

type MemberTableLoadingStateProps = {
  count: number;
};

export const RolePageLoadingState: React.FC<MemberTableLoadingStateProps> = ({ count }) => {
  const rows: any = [];
  times(count, (i) => {
    rows.push(
      <React.Fragment key={i}>
        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <div className="w-1/6">
              <Skeleton count={1} duration={2} height="4rem" className="rounded-xl" />
            </div>
            <div className="w-1/3">
              <Skeleton count={1} duration={2} height="2rem" className="rounded-xl" />
            </div>
          </div>
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 3xl:flex 3xl:flex-wrap gap-8">
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />{" "}
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
              <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return rows;
};

export const RoleGridLoadingState: React.FC<MemberTableLoadingStateProps> = ({ count }) => {
  const rows: any = [];
  times(count, (i) => {
    rows.push(
      <React.Fragment key={i}>
        <SkeletonTheme baseColor="#fff" highlightColor="#eee">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 3xl:flex 3xl:flex-wrap gap-8">
            <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
            <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />
            <Skeleton count={1} duration={2} height="14rem" className="rounded-2xl" />{" "}
          </div>
        </SkeletonTheme>
      </React.Fragment>
    );
  });

  return rows;
};
