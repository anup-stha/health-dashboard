/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/12/22, 5:36 PM
 *
 *
 */

import { Popover } from "@headlessui/react";
import React, { useState } from "react";
import { AlertTriangle } from "react-feather";

export const InputErrorPop: React.FC<any> = ({ error }: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
      }}
      data-testid="input-error"
      className="absolute text-red-600 -translate-y-1/2 right-6 top-1/2 no_animation"
    >
      <Popover className="relative flex no_animation">
        <Popover.Button className="cursor-pointer">
          <AlertTriangle size={20} onClick={() => setIsOpen((prevState) => !prevState)} />
        </Popover.Button>

        {isOpen && (
          <Popover.Panel
            static
            className="absolute z-20 w-screen  p-2 text-base text-right text-gray-700 -right-8 -top-20 no_animation"
          >
            <div className="w-auto no_animation">
              <span className="w-full px-8 py-4 text-white bg-red-600 rounded-sm shadow-lg no_animation capitalize">
                {error}
              </span>
            </div>
          </Popover.Panel>
        )}
      </Popover>
    </div>
  );
};

export default InputErrorPop;
