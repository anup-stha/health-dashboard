/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 4:11 PM
 *
 *
 */

import React from "react";

type ProfileDataDetailProps = {
  icon: React.ReactNode;
  detail: string;
};
export const ProfileDataDetail: React.FC<ProfileDataDetailProps> = ({ icon, detail }) => {
  return (
    <div className="flex gap-x-4 text-xl">
      <div className="text-gray-800 ">{icon}</div>
      <span>{detail}</span>
    </div>
  );
};
