/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:31 PM
 *
 *
 */

import React from "react";

type ProfileSubsDataProps = {
  title: string;
  value: string;
};
export const ProfileSubsData: React.FC<ProfileSubsDataProps> = ({ title, value }) => {
  return (
    <div className="flex space-x-4 items-center">
      <p className="text-gray-700 font-semibold text-xl tracking-wider  ">{title}:</p>
      <h1 className="text-gray-500 font-semibold text-xl tracking-wider  ">{value}</h1>
    </div>
  );
};
