/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 7:08 PM
 *
 *
 */

import { Sidebar } from "@/routes/SideBar";
import { SideBarToggleButton as ToggleButton } from "../routes/SideBar/SidebarToggleButton";
import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";
import { MainHeader } from "./MainHeader";
import { useEffect } from "react";

import { isMobile } from "react-device-detect";

export const MainLayout = ({ children }: any) => {
  const { open } = useSideBarStore();

  useEffect(() => {
    if (open && isMobile) document.body.style.overflow = "hidden";
  }, [open]);

  return (
    <div suppressHydrationWarning={true}>
      <Sidebar />
      <ToggleButton />
      <div
        className={`${
          open
            ? " relative w-full pl-[18%] md:w-full md:ml-0 sm:pl-0"
            : "relative w-full pl-24 sm:pl-0"
        } transition-all duration-200 h-full print:pl-0`}
      >
        <MainHeader />
        <div
          className={`3xl:flex 3xl:items-center 3xl:justify-center pt-36 h-full print:pt-0`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
