/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/1/22, 12:53 PM
 *
 *
 */

import { SideBarToggleButton as ToggleButton } from "../routes/SideBar/SidebarToggleButton";
import { MainHeader } from "./MainHeader";
import { Sidebar } from "@/routes/SideBar";
import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";
import React, { useCallback, useEffect, useState } from "react";

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
    <div>
      <ToggleButton />
      <Sidebar />
      <div
        className={`${
          open
            ? "relative w-full pl-[23rem] md:w-full md:ml-0 sm:pl-0"
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
  ) : null;
};

export const MainLayout = React.memo(Layout);
