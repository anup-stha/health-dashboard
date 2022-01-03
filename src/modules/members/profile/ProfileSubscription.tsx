/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 8:09 AM
 *
 *
 */

import React, { useEffect, useState } from "react";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import { GrayButton, WarningButton } from "@/components/Button";
import { alert } from "@/components/Alert";
import {
  assignSubscriptionToMember,
  removeSubscriptionFromMember,
} from "@/services/requests/subscriptionRequests";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { WarningOctagon } from "phosphor-react";
import { SubscriptionDropdown } from "@/modules/members/modal/memberSubscriptionModal";
import { ProfileSubsData } from "@/modules/members/others/MemberProfileSubsData";
import { useAuthStore } from "@/modules/auth/useTokenStore";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ProfileSubscriptionProps = {
  member_id?: number;
};

export const ProfileSubscription: React.FC<ProfileSubscriptionProps> = ({ member_id: id }) => {
  const router = useRouter();

  const { subscriptionList, selectedSubscription } = useSubscriptionStore();
  const { selectedMemberSubscription } = useMemberStore();
  const { start_date, end_date } = selectedMemberSubscription;
  const start = moment(start_date * 1000);
  const end = moment(end_date * 1000);
  const leftDays = end.diff(new Date(), "days");
  const totalDays = end.diff(start, "days");
  const chartOptions: ApexOptions = {
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
            formatter: function () {
              return end.diff(new Date(), "hours") < 0
                ? "0"
                : `${
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
    labels: [
      end.diff(new Date(), "hours") < 0
        ? "Expired"
        : `${end.diff(new Date(), "days") === 0 ? "Hours" : "Days"} Left`,
    ],
  };

  const [options, setOptions] = useState<ApexOptions>(chartOptions);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setOptions(chartOptions);
  }, [selectedMemberSubscription.start_date]);

  if (!router.query.id === !(user.id !== 1)) return null;

  return isEmpty(selectedMemberSubscription) ? (
    <div className=" print:hidden self-start flex flex-col w-full  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">Subscriptions</h1>
        {user.id === 1 && (
          <p className="text-lg font-semibold text-gray-500">
            Please choose a subscription to{" "}
            {isEmpty(selectedMemberSubscription) ? "unlink" : "link"}
          </p>
        )}
      </div>

      {subscriptionList.list.length === 0 && isEmpty(selectedMemberSubscription) ? (
        <div className="print:hidden flex items-center text-red-500 space-x-4">
          <WarningOctagon size={40} />{" "}
          {user.id === 1 ? (
            <span className={"font-semibold"}>
              No Subscription Found. Please add a subscription to this role{" "}
              <span onClick={() => router.push("/subscriptions")} className="cursor-pointer">
                here
              </span>
            </span>
          ) : (
            <span className={"font-semibold"}>
              No Subscription Found. Please contact Sunya Health Adminstrator{" "}
            </span>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center  space-x-4 w-full">
            <div className={"w-[58%]"}>
              <SubscriptionDropdown />
            </div>
            <div className={"w-1/2"}>
              <GrayButton
                onClick={async () => {
                  await alert({
                    promise: assignSubscriptionToMember(
                      Number(router.query.id),
                      Number(selectedSubscription.id)
                    ),
                    msgs: {
                      loading: "Assigning Subscription",
                    },
                    id: "assign-subscription",
                  });
                }}
              >
                Link
              </GrayButton>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="print:hidden w-full bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10">
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
            <div className="p-6 bg-gray-100 w-full text-xl rounded-lg flex flex-col items-start gap-4 sm:w-full sm:items-center  ">
              <h1 className="text-gray-900 font-semibold text-2xl tracking-wider   ">
                {selectedMemberSubscription.plan.name}
              </h1>

              <div className="space-y-1 flex flex-col items-start">
                <ProfileSubsData
                  title={"Start Date: "}
                  value={moment(selectedMemberSubscription.start_date * 1000).format("MM/DD/YYYY")}
                />
                <ProfileSubsData
                  title={"End Date: "}
                  value={moment(selectedMemberSubscription.end_date * 1000).format("MM/DD/YYYY")}
                />
                <ProfileSubsData
                  title={"Total Price: "}
                  value={selectedMemberSubscription.plan.price}
                />
                <ProfileSubsData
                  title={"Grace Period: "}
                  value={`${selectedMemberSubscription.plan.grace_period} days`}
                />
                <ProfileSubsData
                  title={"Sync Limit: "}
                  value={`${selectedMemberSubscription.plan.sync_limit} times`}
                />
                <ProfileSubsData
                  title={"Test Limit: "}
                  value={`${selectedMemberSubscription.plan.test_limit} times`}
                />
                <ProfileSubsData
                  title={"Test Count: "}
                  value={`${selectedMemberSubscription.total_test_count} times`}
                />
              </div>
              {user.id === 1 && (
                <div className={"w-full flex space-x-4 mt-2 justify-center"}>
                  {Object.keys(selectedMemberSubscription).length !== 0 && (
                    <GrayButton>Renew</GrayButton>
                  )}
                  <WarningButton
                    onClick={async () => {
                      await alert({
                        type: "promise",
                        promise: removeSubscriptionFromMember(Number(router.query.id)),
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
