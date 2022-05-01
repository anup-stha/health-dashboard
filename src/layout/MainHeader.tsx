/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/1/22, 12:53 PM
 *
 *
 */

import { HambergerMenu } from "iconsax-react";
import { useRouter } from "next/router";
import { Question } from "phosphor-react";
import React from "react";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { adminWelcomeSlides } from "@/modules/dashboard/adminWelcomeSlides";
import { WelcomeModal } from "@/modules/dashboard/modal/WelcomeModal";
import { orgAdminWelcomeSlides } from "@/modules/org-admin/dashboard";
import { useSideBarStore } from "@/routes/SideBar/useSideBarStore";
import { ImageAvatar } from "@/services/Avatar";

import Breadcrumbs from "./BreadCrumb";

export const MainHeader: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { open, toggleOpen } = useSideBarStore();

  return (
    <header
      className={`print:hidden fixed top-0 left-0 w-full z-30  bg-white shadow-E200 transition-all duration-200 ${
        !open ? "pl-24 sm:pl-0" : "pl-[23rem] sm:pl-0"
      } `}
    >
      <div className="h-24 flex items-center justify-between px-12 sm:px-4">
        <div>
          <HambergerMenu
            variant="Broken"
            className="cursor-pointer hidden sm:flex"
            size={44}
            onClick={() => toggleOpen()}
          />
          {open && (
            <div
              className="hidden sm:flex sm:fixed sm:inset-0 sm:bg-black sm:opacity-40"
              onClick={() => toggleOpen()}
            />
          )}
        </div>

        <div className="flex items-center gap-8">
          <WelcomeModal images={user?.role?.id === 1 ? adminWelcomeSlides : orgAdminWelcomeSlides}>
            <div className="text-gray-600 hover:text-gray-900 cursor-pointer" title="How to Use">
              <Question size={32} />
            </div>
          </WelcomeModal>

          <ImageAvatar />
        </div>
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
