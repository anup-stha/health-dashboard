/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 7:00 PM
 *
 *
 */

import { CaretLeft, CaretRight, XCircle } from "phosphor-react";

import { useSideBarStore } from "./useSideBarStore";

export const SideBarToggleButton = () => {
  const { open, toggleOpen } = useSideBarStore();

  return (
    <>
      <div
        onClick={() => toggleOpen()}
        className={`z-50 fixed w-11 h-11 top-6 bg-green-500 text-2xl ${
          !open
            ? "left-28 sm:hidden"
            : "left-[19.6%] translate-x-[-50%] sm:hidden md:left-[37.5%] lg:left-[28%]"
        } print:hidden rounded-full flex justify-center items-center text-white shadow-E200 cursor-pointer transition-all duration-100`}
      >
        {!open ? <CaretRight weight="bold" /> : <CaretLeft weight="bold" />}
      </div>

      {open ? (
        <div
          className="hidden sm:flex z-50 fixed top-8 cursor-pointer right-8 text-green rounded-full bg-white shadow-E200 transition-all duration-100"
          onClick={() => toggleOpen()}
        >
          <XCircle size={52} weight="fill" color="#111" />
        </div>
      ) : (
        <div
          className="hidden sm:flex z-50 fixed top-10 cursor-pointer -right-64 text-green rounded-full bg-white shadow-E200 transition-all duration-100"
          onClick={() => toggleOpen()}
        >
          <XCircle size={52} weight="fill" color="#111" />
        </div>
      )}
    </>
  );
};
