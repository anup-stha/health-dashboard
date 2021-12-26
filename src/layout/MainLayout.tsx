/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/26/21, 10:14 PM
 *
 *
 */

import { Sidebar } from "@/routes/SideBar";
import { SideBarToggleButton as ToggleButton } from "../routes/SideBar/SidebarToggleButton";
import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";
import { MainHeader } from "./MainHeader";

export const MainLayout = ({ children }: any) => {
  const { open } = useSideBarStore();

  return (
    <div suppressHydrationWarning={true}>
      <Sidebar />
      <ToggleButton />
      <div
        className={`${
          open
            ? " relative w-full pl-[18%] md:w-full md:ml-0 sm:pl-0"
            : "relative w-full pl-24 sm:pl-0"
        } transition-all duration-200 h-full `}
      >
        <MainHeader />
        <div className="3xl:flex 3xl:items-center 3xl:justify-center pt-36 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
