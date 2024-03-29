/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

/* eslint-disable require-jsdoc */
import Image from "next/image";
import React from "react";

import Avatar from "./Ed.png";

type AvatarProps = {
  name?: string;
  image?: string;
  email?: string;
};

export const DefaultAvatar: React.FC<AvatarProps> = ({ name, image }) => {
  return (
    <div className="flex items-center space-x-4">
      {image ? (
        <Image src={image} alt={name} className="rounded-full" height="48" width="48" />
      ) : (
        <Image src={Avatar} alt={name} className="rounded-full" height="48" width="48" />
      )}

      <span className="truncate sm:text-lg sm:font-medium sm:text-gray-700">{name}</span>
    </div>
  );
};

export const AvatarWithEmail: React.FC<AvatarProps> = ({ name, image, email }) => {
  return (
    <div className="flex items-center space-x-4">
      {image ? (
        <Image src={image} alt={name} className="rounded-full" height="48" width="48" />
      ) : (
        <Image src={Avatar} alt={name} className="rounded-full" height="48" width="48" />
      )}
      <div className="flex flex-col gap-y-1">
        <span className="sm:text-xl sm:font-medium sm:text-gray-800">{name}</span>
        <span className="sm:text-base sm:font-medium sm:text-gray-600">{email}</span>
      </div>
    </div>
  );
};
