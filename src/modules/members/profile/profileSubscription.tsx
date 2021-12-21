/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 5:31 PM
 *
 *
 */

import React, { useEffect, useState } from "react";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { memberStore } from "@/modules/members/memberStore";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import { GrayButton, WarningButton } from "@/components/Button";
import { alert } from "@/components/Alert";
import { removeSubscriptionFromMember } from "@/services/requests/subscriptionRequests";
import { useRouter } from "next/router";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ProfileSubscriptionProps = {
  memberId: number;
};

export const ProfileSubscription: React.FC<ProfileSubscriptionProps> = ({
  memberId,
}) => {
  const { subscriptionList } = useSubscriptionStore();
  const { selectedMemberSubscription } = memberStore();
  const router = useRouter();
  const { start_date, end_date } = selectedMemberSubscription;

  const start = moment(start_date * 1000);
  const end = moment(end_date * 1000);
  console.log(start, end);
  const leftDays = end.diff(new Date(), "days");
  const totalDays = end.diff(start, "days");
  const [options, setOptions] = useState<ApexOptions>({
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
              return `${
                end.diff(new Date(), "days") === 0
                  ? end.diff(new Date(), "hours")
                  : end.diff(new Date(), "days")
              }`;
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
    series: [(leftDays / totalDays) * 100],
    labels: [`${end.diff(new Date(), "days") === 0 ? "Hours" : "Days"} Left`],
  });

  useEffect(() => {
    setOptions({
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
                return `${
                  end.diff(new Date(), "days") === 0
                    ? end.diff(new Date(), "hours")
                    : end.diff(new Date(), "days")
                }`;
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
      series: [(leftDays / totalDays) * 100],
      labels: [`${end.diff(new Date(), "days") === 0 ? "Hours" : "Days"} Left`],
    });
  }, [selectedMemberSubscription.start_date]);

  return subscriptionList.list.length === 0 ||
    Object.keys(selectedMemberSubscription).length === 0 ? null : (
    <div className=" w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
      <div className="p-6 space-y-4">
        <div className="flex items-center">
          <div className="w-full text-xl rounded-lg flex flex-col items-center sm:w-full">
            <div className="px-4 flex items-center justify-center -mt-6">
              {typeof window !== "undefined" && (
                <Chart
                  options={options}
                  type={"radialBar"}
                  series={options.series}
                  width="200"
                  height="225"
                />
              )}
            </div>
            <div className="p-6 bg-gray-100 w-full text-xl rounded-lg flex flex-col items-center gap-4 sm:w-full ">
              <h1 className="text-gray-900 font-semibold text-2xl tracking-wider sm:text-2xl">
                {selectedMemberSubscription.plan.name}
              </h1>

              <div className="space-y-1 flex flex-col items-center">
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl flex items-center space-x-2">
                    <span>Start Date:</span>
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {moment(
                      selectedMemberSubscription.start_date * 1000
                    ).format("MMMM Do YYYY")}
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl flex items-center space-x-2">
                    <span>End Date:</span>
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {moment(selectedMemberSubscription.end_date * 1000).format(
                      "MMMM Do YYYY"
                    )}
                  </h1>
                </div>
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
                    Test Limit:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.plan.test_limit} times
                  </h1>
                </div>
                <div className="flex space-x-4 items-center">
                  <p className="text-gray-700 font-semibold text-xl tracking-wider sm:text-2xl">
                    Test Count:
                  </p>
                  <h1 className="text-gray-500 font-semibold text-xl tracking-wider sm:text-2xl">
                    {selectedMemberSubscription.total_test_count} times
                  </h1>
                </div>
                <div className={"w-full flex space-x-4 pt-8"}>
                  {Object.keys(selectedMemberSubscription).length !== 0 && (
                    <GrayButton>Renew</GrayButton>
                  )}
                  <WarningButton
                    onClick={async () => {
                      await alert({
                        type: "promise",
                        promise: removeSubscriptionFromMember(
                          Number(router.query.id)
                        ),
                        msgs: {
                          loading: "Removing",
                        },
                        id: "remove-subs",
                      });
                    }}
                  >
                    Unlink
                  </WarningButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
