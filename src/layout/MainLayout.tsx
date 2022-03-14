/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/9/22, 7:13 PM
 *
 *
 */

import React, { useCallback, useEffect, useState } from "react";

import { Sidebar } from "@/routes/SideBar";
import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";

import { MainHeader } from "./MainHeader";
import { SideBarToggleButton as ToggleButton } from "../routes/SideBar/SidebarToggleButton";

const Layout = ({ children }: any) => {
  const open = useSideBarStore(useCallback((state) => state.open, []));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setHydrated(useSideBarStore.persist.hasHydrated());
    } catch (error) {
      setHydrated(false);
    }
  }, [hydrated]);

  return hydrated ? (
    <div className="relative">
      {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? (
        <div className="bg-triangle fixed bg-black text-white w-32 h-32 z-50 text-4xl font-medium sm:w-24 sm:h-24 sm:text-3xl">
          <span className="-rotate-45 absolute top-[1.3rem] left-2 sm:top-3.5 sm:left-1">DEV</span>
        </div>
      ) : null}

      <ToggleButton />
      <Sidebar />

      <div
        className={`${
          open ? "relative w-full pl-[23rem] md:w-full md:ml-0 sm:pl-0" : "relative w-full pl-24 sm:pl-0"
        } transition-all duration-200 h-full print:pl-0`}
      >
        <MainHeader />
        <div className="3xl:flex 3xl:items-center 3xl:justify-center pt-36 print:pt-0 h-screen">{children}</div>
      </div>
    </div>
  ) : null;
};

export const MainLayout = React.memo(Layout);
