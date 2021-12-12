/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import _ from "lodash";
import React from "react";
import Skeleton from "react-loading-skeleton";

type MemberTableLoadingStateProps = {
  count: number;
};

export const MemberTableLoadingState: React.FC<
  MemberTableLoadingStateProps
> = ({ count }) => {
  const rows: any = [];
  _.times(count, (i) => {
    rows.push(
      <React.Fragment key={i}>
        <tr>
          <td className="flex space-x-2 items-center py-4">
            <div className=" inline-block">
              <Skeleton duration={2} circle={true} height="4rem" width="4rem" />
            </div>
            <div className="w-full space-y-2">
              <div>
                <Skeleton count={1} duration={2} />
              </div>
              <div className="w-2/3">
                <Skeleton count={1} duration={2} />
              </div>
            </div>
          </td>
          <td>
            <div className="pr-8">
              <Skeleton count={1} duration={2} />
            </div>
          </td>
          <td>
            <div className="pr-8">
              <Skeleton count={1} duration={2} />
            </div>
          </td>
          <td>
            <div className="pr-8">
              <Skeleton count={1} duration={2} />
            </div>
          </td>
          <td>
            <div className="w-full space-y-2 pr-4">
              <div>
                <Skeleton count={1} duration={2} />
              </div>
              <div className="w-2/3">
                <Skeleton count={1} duration={2} />
              </div>
            </div>
          </td>
          <td>
            <Skeleton count={1} duration={2} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return rows;
};
