/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { CaretLeft, CaretRight } from "phosphor-react";
import { useSideBarStore } from "./useSideBarStore";

export const SideBarToggleButton = () => {
  const { open, toggleOpen } = useSideBarStore();

  return (
    <div
      onClick={() => toggleOpen()}
      className={`z-50 fixed w-11 h-11 top-6 bg-green-500 text-2xl ${
        !open
          ? "left-28 sm:left-[6.5rem]"
          : "left-[20%] translate-x-[-50%] sm:left-[55%] md:left-[37.5%] lg:left-[28%]"
      }  rounded-full flex justify-center items-center text-white shadow-E200 cursor-pointer transition-all duration-100`}
    >
      {!open ? <CaretRight weight="bold" /> : <CaretLeft weight="bold" />}
    </div>
  );
};
