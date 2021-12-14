/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 3:51 PM
 *
 *
 */

import React, { useState } from "react";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { memberStore } from "@/modules/members/memberStore";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ProfileSubscriptionProps = {
  memberId: number;
};

export const ProfileSubscription: React.FC<ProfileSubscriptionProps> = ({
  memberId,
}) => {
  const { subscriptionList } = useSubscriptionStore();
  const { selectedMemberSubscription } = memberStore();

  const [options] = useState<ApexOptions>({
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "65%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,

          dropShadow: {
            enabled: true,
            color: "black",
            opacity: 0.01,
            blur: 4,
          },
        },
        track: {
          background: "#eee",
          strokeWidth: "100%",
          margin: 1, // margin is in pixels
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#aaa",
            fontSize: "17px",
          },
          value: {
            formatter: function (val) {
              return `${val}`;
            },
            color: "#555",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      colors: ["#16a34a"],
    },
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    series: [10],
    labels: ["Days Left"],
  });

  return subscriptionList.length === 0 ||
    Object.keys(selectedMemberSubscription).length === 0 ? null : (
    <div className=" w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
      <div className="p-6 space-y-4">
        <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
          Subscriptions
        </h1>
        <div className="flex items-center">
          <div className="p-6 bg-gray-50 w-3/5 text-xl rounded-lg flex flex-col gap-8 sm:w-full">
            <h1 className="text-gray-900 font-semibold text-2xl tracking-wider sm:text-2xl">
              {selectedMemberSubscription.plan.name}
            </h1>
            <div
              className={
                " grid grid-cols-2 divide-x divide-gray-400/40 w-11/12"
              }
            >
              <div className="px-4 space-y-2">
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl flex items-center space-x-2">
                    <span>Total Price:</span>
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.price}
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl">
                    Grace Period:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.grace_period} days
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl">
                    Sync Limit:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.sync_limit} times
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl">
                    Interval Type:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.interval_type} times
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl">
                    Interval Time:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.interval_value} days
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl">
                    Test Limit:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.test_limit} times
                  </h1>
                </div>
              </div>
              <div className="px-4 space-y-2 flex items-center justify-center">
                <div className={"absolute"}>
                  {typeof window !== "undefined" && (
                    <Chart
                      options={options}
                      type={"radialBar"}
                      series={options.series}
                      width="225"
                      height="225"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
