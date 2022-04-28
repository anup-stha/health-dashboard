/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/13/22, 7:03 PM
 *
 *
 */

import { useRouter } from "next/router";
import { Warning } from "phosphor-react";
import React from "react";

import { Button } from "@/components/Button";
import { BooleanTag } from "@/components/others/BooleanTag";

import { useRoleStore } from "../useRoleStore";

type RoleCardPropsType = {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  permissionCount: number;
  memberLimit: number;
  isPublic: boolean;
};

export const RoleCard: React.FC<RoleCardPropsType> = ({
  id,
  title,
  description,
  permissionCount,
  memberLimit,
  isPublic,
  slug,
}) => {
  const router = useRouter();
  return permissionCount !== 0 ? (
    <div
      data-testid={`${title}-card`}
      className=" relative flex flex-col items-start justify-between overflow-hidden h-64 bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200"
    >
      <div className="space-y-2 w-full">
        <div className="flex flex-col justify-between w-full space-y-1">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-medium text-gray-800 line-clamp-1 capitalize">{title}</h1>
            <h1 className="whitespace-nowrap text-base">
              <BooleanTag type="info" trueStatement={`Slug: ${slug}`} />
            </h1>
          </div>

          <div className="self-start text-lg text-gray-500 font-normal" data-testid={`${title}-card-data`}>
            Member Limit: {memberLimit} | Permissions: {permissionCount} | {isPublic ? "Public" : "Not Public"}
          </div>
        </div>

        <p className="text-lg font-medium text-gray-500 w-4/5 line-clamp-2">
          {description} {/** 92 CHARS */}
        </p>
      </div>
      {/*   <div className="absolute -right-10 -bottom-4">
        <div className="w-44 h-44 relative">
          <Image
            src={`/assets/avatar${1}.svg`}
            alt="Super User Admin Image"
            layout="fill"
          />
        </div>
      </div> */}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          <Button
            data-testid={`${title}-button`}
            size="sm"
            onClick={() => {
              router.push(`/roles/${slug}?id=${id}`);
              useRoleStore.getState().setSelectedId(Number(id));
            }}
          >
            Edit Permissions
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div
      data-testid={`${title}-card`}
      className="relative flex flex-col items-start justify-between overflow-hidden h-64  bg-red-50  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200 bg-opacity-40 ring-1 ring-red-500 ring-opacity-10"
    >
      <div className="space-y-2 w-full">
        <div className="flex flex-col justify-between space-y-2 w-full">
          <div className="flex justify-between items-center w-full ">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize">{title}</h1>
            <h1 className="whitespace-nowrap text-base">
              <BooleanTag type="info" trueStatement={`Slug: ${slug}`} />
            </h1>
          </div>
          <div className="font-bold text-lg text-red-500 flex gap-x-1 items-center" data-testid={`${title}-card-data`}>
            <Warning size={24} weight="duotone" />
            <span>Please add permission to this user to activate it</span>
          </div>
        </div>

        <p className="text-lg font-medium text-gray-700 w-4/5 line-clamp-2">{description}</p>
      </div>
      {/*  <div className="absolute -right-10 -bottom-4">
        <div className="w-44 h-44 relative">
          <Image
            src={`/assets/avatar${1}.svg`}
            alt="Super User Admin Image"
            layout="fill"
          />
        </div>
      </div> */}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          <Button
            data-testid={`${title}-button`}
            size="sm"
            onClick={() => {
              router.push(`/roles/${slug}?id=${id}`);
              useRoleStore.getState().setSelectedId(Number(id));
            }}
          >
            Edit Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};
