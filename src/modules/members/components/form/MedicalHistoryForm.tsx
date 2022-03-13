/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 9:28 AM
 *
 *
 */

import React from "react";

import { PrimaryInput, RadioInputController } from "@/components/Input";

export const MedicalHistoryForm = ({ id, slug, name, control, watch, register }: any) => {
  const note = watch(`${id}-${slug}`);

  return (
    <>
      <label className="text-xl font-medium text-primary_gray-700 w-1/3">{name}</label>
      <div className="w-2/3 space-y-4">
        <RadioInputController
          name={`${id}-${slug}`}
          labelOptions={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
          control={control}
        />
        {note === 1 && (
          <div className="col-span-2">
            <PrimaryInput placeholder={`Note for ${name} `} defaultValue="" {...register(`${id}-${slug}-note`)} />
          </div>
        )}
      </div>
    </>
  );
};
