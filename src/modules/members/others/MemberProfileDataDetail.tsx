/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 2:53 PM
 *
 *
 */

import React from "react";

type ProfileDataDetailProps = {
  icon: React.ReactNode;
  detail: string;
};
export const ProfileDataDetail: React.FC<ProfileDataDetailProps> = ({
  icon,
  detail,
}) => {
  return (
    <div className="flex gap-x-4 text-xl items-center">
      <div className="text-gray-800 ">{icon}</div>
      <span>{detail}</span>
    </div>
  );
};
