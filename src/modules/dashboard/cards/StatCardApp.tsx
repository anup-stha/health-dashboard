/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 12:37 PM
 *
 *
 */

import { GooglePlay, UserCirlceAdd, UserTick } from "iconsax-react";
import CountUp from "react-countup";
import React from "react";

export const StatCardApp: React.FC = () => {
  return (
    <div className="h-full h-full bg-white rounded-lg shadow-sm p-8 sm:p-6 space-y-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl text-gray-700 font-semibold ">Mvitals</h1>
        <p className="text-xl text-gray-500 font-medium">
          Statistics Related To Mvitals From Google Play.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 sm:flex sm:flex-wrap sm:justify-center">
        <div className="flex flex-col items-center justify-start shadow-E500 rounded-lg py-6 space-y-4 hover:scale-105 transition-all duration-200 sm:w-2/5">
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
        <div className="flex flex-col items-center justify-start shadow-E500 rounded-lg py-6 space-y-4  hover:scale-105 transition-all duration-200 sm:w-2/5 ">
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
        <div className="flex flex-col items-center justify-start shadow-E500 rounded-lg py-6 space-y-4 hover:scale-105 transition-all duration-200 sm:w-2/5">
          <div className="bg-blue-500 p-4 rounded-full shadow-md">
            <UserTick variant="Broken" size={28} color={"#fff"} />{" "}
          </div>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-4xl text-gray-800 font-semibold">
              <CountUp start={0} end={Number(139)} />
            </p>
            <h1 className="text-lg text-gray-500 font-semibold sm:text-xl text-center ">
              Total Users
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
