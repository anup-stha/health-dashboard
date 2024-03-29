/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import Image from "next/image";
import React from "react";

export type CheckBoxCardProps = {
  title: string;
  subtitle: string;
  checked: boolean;
  onCheckChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const CheckBoxCard: React.FC<CheckBoxCardProps> = ({ title, subtitle, checked, onCheckChange }) => {
  return (
    <div className="flex items-center justify-between h-full space-x-4">
      <div className="flex items-center space-x-4">
        <div>
          <Image src="/assets/permission1.png" alt={title} width={64} height={64} objectFit="cover" layout="fixed" />
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-2xl text-gray-800 font-medium line-clamp-1 ">{title}</span>
          <span className="text-lg text-gray-500 font-medium w-3/4 line-clamp-2">{subtitle}</span>
        </div>
      </div>
      <div className="max-w-sm mx-auto">
        <label className="inline-flex items-center">
          <input
            data-testid={`${title
              ?.toLowerCase()
              .replace(/ /g, "_")
              .replace(/[^\w-]+/g, "")}-permission_checkbox`}
            className="text-primary-500 w-8 h-8 mr-2 cursor-pointer focus:ring-primary-400 focus:ring-opacity-25 border border-gray-300 rounded-lg"
            type="checkbox"
            checked={checked}
            onChange={onCheckChange}
          />
        </label>
      </div>
    </div>
  );
};
