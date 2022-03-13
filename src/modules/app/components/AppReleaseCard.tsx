/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/3/22, 8:03 PM
 *
 *
 */

import React from "react";

import { Button } from "@/components/Button";

import { AppReleaseModal } from "@/modules/app/components/AppReleaseModal";
import { AppRelease } from "@/services/requests/app.service";

export const AppReleaseCard = (props: AppRelease) => {
  return (
    <div className="relative flex flex-col h-52 items-start justify-between overflow-hidden bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200">
      <div className="space-y-1 w-full">
        <div className="flex flex-col justify-between w-full space-y-1">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-medium text-primary_gray-800 capitalize">
              {props.name}
            </h1>
          </div>
        </div>

        <p className="text-lg font-medium text-primary_gray-500 w-4/5 line-clamp-2">
          Code: {props.code}
        </p>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          <a href={props.app_url} download>
            <Button size="sm">Download</Button>
          </a>
          <AppReleaseModal type="edit" defaultValues={props} id={props.id} />
        </div>
      </div>
    </div>
  );
};
