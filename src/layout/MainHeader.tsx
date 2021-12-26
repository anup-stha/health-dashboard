/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/26/21, 10:16 PM
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
        !open ? "pl-24 sm:pl-0" : "pl-[18%]"
      } `}
    >
      <div className="h-24 flex items-center justify-between px-12">
        <div>{/* Put Logo Her */}</div>

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
