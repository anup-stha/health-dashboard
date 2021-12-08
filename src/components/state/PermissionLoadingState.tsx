import _ from "lodash";
import React from "react";
import Skeleton from "react-loading-skeleton";

type MemberTableLoadingStateProps = {
  count: number;
};

export const PermissionPageLoadingState: React.FC<MemberTableLoadingStateProps> =
  ({ count }) => {
    const rows: any = [];
    _.times(count, (i) => {
      rows.push(
        <React.Fragment key={i}>
          <div className="p-10 space-y-8">
            <div className="w-1/5">
              <Skeleton
                count={1}
                duration={2}
                height={"3rem"}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <div className="w-1/6 ">
                <Skeleton
                  count={1}
                  duration={2}
                  height={"2rem"}
                  className="rounded-xl"
                />
              </div>
              <div className="w-3/4">
                <Skeleton
                  count={1}
                  duration={2}
                  height={"2rem"}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 3xl:flex 3xl:flex-wrap gap-8">
                <Skeleton
                  count={1}
                  duration={2}
                  height={"11rem"}
                  className="rounded-2xl"
                />
                <Skeleton
                  count={1}
                  duration={2}
                  height={"11rem"}
                  className="rounded-2xl"
                />
                <Skeleton
                  count={1}
                  duration={2}
                  height={"11rem"}
                  className="rounded-2xl"
                />{" "}
                <Skeleton
                  count={1}
                  duration={2}
                  height={"11rem"}
                  className="rounded-2xl"
                />
                <Skeleton
                  count={1}
                  duration={2}
                  height={"11rem"}
                  className="rounded-2xl"
                />
                <Skeleton
                  count={1}
                  duration={2}
                  height={"11rem"}
                  className="rounded-2xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-1/6 ">
                <Skeleton
                  count={1}
                  duration={2}
                  height={"2rem"}
                  className="rounded-xl"
                />
              </div>
              <div className="w-3/4">
                <Skeleton
                  count={1}
                  duration={2}
                  height={"2rem"}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="w-3/4">
              <Skeleton
                count={1}
                duration={2}
                height={"11rem"}
                className="rounded-2xl"
              />
            </div>
          </div>
        </React.Fragment>
      );
    });

    return rows;
  };
