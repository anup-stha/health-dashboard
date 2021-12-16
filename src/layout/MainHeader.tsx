/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { ImageAvatar } from "@/components/Avatar";
import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";
import { useRouter } from "next/router";
import Breadcrumbs from "./BreadCrumb";

export const MainHeader: React.FC = () => {
  const router = useRouter();
  const { open } = useSideBarStore();

  return (
    <header
      className={`fixed   top-0 left-0 w-full z-20  bg-white shadow-E200 ${
        !open ? "pl-24" : "pl-[18%]"
      } `}
    >
      <div className="h-20 flex items-center justify-between px-12">
        <div>{/* Put Logo Her */}</div>

        <ImageAvatar />
      </div>
      {router.asPath !== "/dashboard" && (
        <div className="bg-white h-12 w-full flex border-t-2 border-gray-100 px-10">
          <Breadcrumbs />
        </div>
      )}
    </header>
  );
};
