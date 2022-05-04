/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import React from "react";

import Input, { RadioInputController } from "@/components/Input";

export const MedicalHistoryForm = ({ id, slug, name, control, watch, register }: any) => {
  const note = watch(`${id}-${slug}`);

  return (
    <>
      <label className="text-xl font-medium text-gray-700 w-1/3">{name}</label>
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
            <Input placeholder={`Note for ${name} `} defaultValue="" {...register(`${id}-${slug}-note`)} />
          </div>
        )}
      </div>
    </>
  );
};
