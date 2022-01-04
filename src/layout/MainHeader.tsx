/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/4/22, 3:20 PM
 *
 *
 */

import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";
import { useRouter } from "next/router";
import Breadcrumbs from "./BreadCrumb";
import { HambergerMenu } from "iconsax-react";
import { ImageAvatar } from "@/services/Avatar";

export const MainHeader: React.FC = () => {
  const router = useRouter();
  const { open, toggleOpen } = useSideBarStore();

  return (
    <header
      className={`print:hidden fixed top-0 left-0 w-full z-30  bg-white shadow-E200 transition-all duration-200 ${
        !open ? "pl-24 sm:pl-0" : "pl-[18%] sm:pl-0"
      } `}
    >
      <div className="h-24 flex items-center justify-between px-12 sm:px-4">
        <div>
          <HambergerMenu
            variant={"Broken"}
            className={"cursor-pointer hidden sm:flex"}
            size={44}
            onClick={() => toggleOpen()}
          />
          {open && (
            <div
              className={
                "hidden sm:flex sm:fixed sm:inset-0 sm:bg-black sm:opacity-40"
              }
              onClick={() => toggleOpen()}
            />
          )}
        </div>

        <ImageAvatar />
      </div>
      <hr className="border-t-[1px] border-gray-200" />{" "}
      {router.asPath !== "/dashboard" && (
        <div className="bg-white h-12 w-full flex px-10 sm:px-6">
          <Breadcrumbs />
        </div>
      )}
    </header>
  );
};
