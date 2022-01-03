/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 12:14 PM
 *
 *
 */

import React from "react";

export type StatCardProps = {
  icon: React.ReactNode;
  value: number | string;
  valueText: string | string[];
};
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  valueText,
}) => {
  return (
    <div className=" bg-white rounded-lg shadow-sm px-4 py-8 flex flex-col items-center space-y-6 hover:scale-110 hover:shadow-lg transition-all duration-200 ">
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
