/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
        className={`z-50 fixed w-11 h-11 top-6 bg-primary-500 text-2xl ${
          !open ? "left-28 sm:hidden" : "left-[26rem] translate-x-[-50%] sm:hidden md:left-[37.5%] lg:left-[28%]"
        } print:hidden rounded-full flex justify-center items-center text-white shadow-E200 cursor-pointer transition-all duration-100`}
      >
        {!open ? <CaretRight weight="bold" /> : <CaretLeft weight="bold" />}
      </div>

      {open ? (
        <div
          className="hidden sm:flex z-50 fixed top-8 cursor-pointer right-8 text-primary rounded-full bg-white shadow-E200 transition-all duration-100"
          onClick={() => toggleOpen()}
        >
          <XCircle size={52} weight="fill" color="#111" />
        </div>
      ) : (
        <div
          className="hidden sm:flex z-50 fixed top-10 cursor-pointer -right-64 text-primary rounded-full bg-white shadow-E200 transition-all duration-100"
          onClick={() => toggleOpen()}
        >
          <XCircle size={52} weight="fill" color="#111" />
        </div>
      )}
    </>
  );
};
