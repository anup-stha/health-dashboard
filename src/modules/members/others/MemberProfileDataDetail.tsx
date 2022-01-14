/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 4:42 PM
 *
 *
 */

import React from "react";

type ProfileDataDetailProps = {
  icon: React.ReactNode;
  detail: string;
  href?: string;
};
export const ProfileDataDetail: React.FC<ProfileDataDetailProps> = ({
  icon,
  detail,
  href,
}) => {
  return !href ? (
    <div className="flex gap-x-4 text-xl items-center">
      <div className="text-gray-800 ">{icon}</div>
      <span>{detail}</span>
    </div>
  ) : (
    <a href={href} className="flex gap-x-4 text-xl items-center">
      <div className="text-gray-800 ">{icon}</div>
      <span>{detail}</span>
    </a>
  );
};
