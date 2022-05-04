/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Switch as DefaultSwitch } from "@headlessui/react";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface ISwitchProps {
  name: string;
  control: Control<any>;
  label: string;
}

export const Switch = ({ name, control, label }: ISwitchProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div className="flex items-center">
            <div className="input_label capitalize mr-4">{label}</div>
            <DefaultSwitch
              checked={value}
              onChange={(formVal) => {
                onChange(formVal);
              }}
              className={`${!value ? "bg-gray-200" : "bg-gray-200"} 
          relative inline-flex flex-shrink-0 h-[2rem] w-[3.5rem] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                data-testid="switch-input"
                aria-hidden="true"
                className={`${value ? "translate-x-6 bg-primary-500" : "translate-x-0 bg-error-500"}
           ml-0.5 pointer-events-none inline-block h-6 w-6 rounded-full  shadow-lg transform ring-0 transition ease-in-out duration-200 shadow-sm`}
              />
            </DefaultSwitch>
          </div>
        );
      }}
    />
  );
};
