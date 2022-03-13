/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/3/22, 8:03 PM
 *
 *
 */

import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/Button";
import { BooleanTag } from "@/components/others/BooleanTag";

import { AppAddEditModal } from "@/modules/app/components/AppAddModal";

type AppCardProps = {
  id: number;
  name: string;
  slug: string;
  application_id: string;
  secret_key: string;
};

export const AppCard = ({
  id,
  name,
  secret_key,
  slug,
  application_id,
}: AppCardProps) => {
  const router = useRouter();

  return (
    <div className="relative flex flex-col h-52 items-start justify-between overflow-hidden bg-white  shadow-lg rounded-lg py-4 px-6 transition-shadow duration-200">
      <div className="space-y-1 w-full">
        <div className="flex flex-col justify-between w-full space-y-1">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-medium text-primary_gray-800 capitalize">
              {name}
            </h1>
            <h1 className="whitespace-nowrap text-base">
              <BooleanTag type="info" trueStatement={`Slug: ${slug}`} />
            </h1>
          </div>
        </div>

        <p className="text-lg font-medium text-primary_gray-500 w-4/5 line-clamp-2">
          {application_id}
        </p>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            onClick={() => router.push(`/app/release?id=${id}`)}
          >
            View App Releases
          </Button>

          <AppAddEditModal
            type="edit"
            defaultValues={{ name, secret_key, application_id }}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};
