/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 3:49 PM
 *
 *
 */

import React from "react";

import { StatCardProps } from "@/modules/dashboard/cards/StatCard";

export const StatCardRect: React.FC<StatCardProps> = ({ icon, value, valueText }) => {
  return (
    <div
      className=" w-full bg-white rounded-lg shadow-sm py-8 flex items-center px-8 sm:py-4 justify-between hover:scale-105 hover:shadow-lg transition-all
                duration-200"
    >
      <div className="flex items-center gap-6 sm:gap-4">
        {icon}
        <div className="flex flex-col">
          <h1 className="text-3xl text-primary_gray-800 font-medium sm:text-xl">{valueText[0]}</h1>
          <p className="text-lg text-primary_gray-500 font-medium text-center sm:text-left">{valueText[1]}</p>
        </div>
      </div>
      <p className="text-5xl text-primary_gray-800 font-medium">{value} </p>
    </div>
  );
};
