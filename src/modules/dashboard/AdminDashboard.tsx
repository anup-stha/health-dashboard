/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/22/21, 11:21 PM
 *
 *
 */

import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import {
  Box2,
  Buildings,
  ChemicalGlass,
  GooglePlay,
  Profile2User,
  SecurityUser,
  UserCirlceAdd,
  UserTick,
} from "iconsax-react";
import CountUp from "react-countup";
import Image from "next/image";
import { useDashboardData } from "@/services/requests/authRequests";

export const AdminDashboard: React.FC = () => {
  const user = useAuthStore().user;

  const { data } = useDashboardData();

  return data ? (
    <div className="px-10 -mt-2 pb-8 sm:p-8 space-y-8 w-full dashboard-bg">
      <div>
        <h1 className="text-[2.5rem] text-gray-800 font-semibold ">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Welcome Back To Dashboard!
        </p>
      </div>

      <div className="w-full flex items-start gap-6 sm:flex-col relative">
        <div className="w-5/6 h-full flex flex-col gap-6">
          <div className="  gap-6 h-auto grid grid-cols-5 lg:grid-cols-2 sm:grid-cols-2 sm:w-full">
            <StatCard
              icon={
                <div className="bg-purple-600 p-8 rounded-full">
                  <ChemicalGlass variant="Broken" size={36} color={"#fff"} />{" "}
                </div>
              }
              value={data.total_tests}
              valueText={"Total Tests"}
            />
            <StatCard
              icon={
                <div className="bg-orange-600 p-8 rounded-full">
                  <Profile2User variant="Broken" size={36} color={"#fff"} />{" "}
                </div>
              }
              value={data.total_members}
              valueText={"Total Members"}
            />{" "}
            <StatCard
              icon={
                <div className="bg-yellow-600 p-8 rounded-full">
                  <Buildings variant="Broken" size={36} color={"#fff"} />{" "}
                </div>
              }
              value={data.organization}
              valueText={"Total Organizations"}
            />
            <StatCard
              icon={
                <div className="bg-emerald-600 p-8 rounded-full">
                  <Box2 variant="Broken" size={36} color={"#fff"} />{" "}
                </div>
              }
              value={data.total_subscription}
              valueText={"Total Subscriptions"}
            />
            <StatCard
              icon={
                <div className="bg-blue-600 p-8 rounded-full">
                  <SecurityUser variant="Broken" size={36} color={"#fff"} />{" "}
                </div>
              }
              value={data.total_users}
              valueText={"Total Users"}
            />
          </div>
          <div className="w-full grid-cols-2 grid gap-6  ">
            <div className="flex flex-col gap-6 h-full">
              <StatCard2
                icon={
                  <div className=" h-28 w-28 relative flex-shrink-0">
                    <Image
                      src={"/sub_test.png"}
                      layout="fill"
                      objectFit="cover"
                      alt="Profile"
                    />
                  </div>
                }
                value={data.total_test_taken}
                valueText={[
                  "Total Tests",
                  "Total Tests taken through Sunya Apps",
                ]}
              />
              <StatCard2
                icon={
                  <div className=" h-28 w-28 relative flex-shrink-0">
                    <Image
                      src={"/sub_test.png"}
                      layout="fill"
                      objectFit="cover"
                      alt="Profile"
                    />
                  </div>
                }
                value={data.organization_operator}
                valueText={[
                  "Organization Operators",
                  "Total Operators added by Organizations",
                ]}
              />
            </div>
            <div className="h-full h-full bg-white rounded-lg shadow-sm px-8 py-8 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl text-gray-700 font-semibold ">
                  Mvitals
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                  Statistics Related To Mvitals From Google Play Store
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center justify-start shadow-E500 rounded-lg py-6 space-y-4 hover:scale-105 transition-all duration-200">
                  <div className="bg-green-500 p-4 rounded-full shadow-md">
                    <GooglePlay variant="Broken" size={28} color={"#fff"} />{" "}
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-4xl text-gray-800 font-semibold">
                      <CountUp start={0} end={Number(139)} />
                    </p>
                    <h1 className="text-lg text-gray-500 font-semibold sm:text-xl text-center">
                      Total Downloads
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start shadow-E500 rounded-lg py-6 space-y-4 hover:scale-105 transition-all duration-200">
                  <div className="bg-amber-500 p-4 rounded-full shadow-md">
                    <UserCirlceAdd variant="Broken" size={28} color={"#fff"} />{" "}
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-4xl text-gray-800 font-semibold">
                      <CountUp start={0} end={Number(139)} />
                    </p>
                    <h1 className="text-lg text-gray-500 font-semibold sm:text-xl text-center">
                      Total Reviews
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start shadow-E500 rounded-lg py-6 space-y-4 hover:scale-105 transition-all duration-200">
                  <div className="bg-blue-500 p-4 rounded-full shadow-md">
                    <UserTick variant="Broken" size={28} color={"#fff"} />{" "}
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-4xl text-gray-800 font-semibold">
                      <CountUp start={0} end={Number(139)} />
                    </p>
                    <h1 className="text-lg text-gray-500 font-semibold sm:text-xl text-center">
                      Total Verified Users
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

type StatCardProps = {
  icon: React.ReactNode;
  value: number | string;
  valueText: string | string[];
};

const StatCard: React.FC<StatCardProps> = ({ icon, value, valueText }) => {
  return (
    <div
      className=" bg-white rounded-lg shadow-sm px-4 py-8 flex flex-col items-center space-y-6 hover:scale-110
                     hover:shadow-lg transition-all duration-200"
    >
      {icon}

      <div className=" flex flex-col items-center space-y-2">
        <p className=" text-5xl text-gray-800 font-medium">{value}</p>
        <h1 className=" text-xl text-gray-500 font-semibold sm:text-xl text-center">
          {valueText}
        </h1>
      </div>
    </div>
  );
};

const StatCard2: React.FC<StatCardProps> = ({ icon, value, valueText }) => {
  return (
    <div
      className=" w-full bg-white rounded-lg shadow-sm py-8 flex items-center px-8 py-4 justify-between hover:scale-105 hover:shadow-lg transition-all
                duration-200"
    >
      <div className="flex items-center gap-6">
        {icon}
        <div className="flex flex-col">
          <h1 className="text-3xl text-gray-800 font-semibold sm:text-xl">
            {valueText[0]}
          </h1>
          <p className="text-lg text-gray-500 font-medium text-center">
            {valueText[1]}
          </p>
        </div>
      </div>
      <p className="text-5xl text-gray-800 font-medium">{value} </p>
    </div>
  );
};
