/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/1/22, 4:47 PM
 *
 *
 */

import React from "react";

import { Loader } from "@/components/Loader";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { adminWelcomeSlides } from "@/modules/dashboard/adminWelcomeSlides";
import {
  StatCardGroup,
  StatCardGroupVariant2,
} from "@/modules/dashboard/cards/StatCardGroup";
import { useDashboardQuery } from "@/modules/dashboard/hooks/useDashboardQuery";
import { WelcomeModal } from "@/modules/dashboard/modal/WelcomeModal";

export const AdminDashboard: React.FC = () => {
  const user = useAuthStore().user;
  const { data, isLoading, error } = useDashboardQuery();

  if (isLoading || error) return <Loader />;

  return (
    <div className="px-10 pb-8 sm:px-6 sm:py-6 -mt-2 space-y-8 w-full sm:-mt-12 dashboard-bg">
      <div>
        <h1 className="text-[2.5rem] text-primary_gray-800 font-medium sm:text-2xl ">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-primary_gray-500 font-medium">
          Welcome Back To Dashboard!
        </p>
      </div>

      <div className="w-full flex items-start gap-6 md:flex-col relative sm:gap-4">
        <div className="w-5/6 h-full flex flex-col gap-6 md:w-full md:gap-4">
          <StatCardGroup data={data} />
          <StatCardGroupVariant2 data={data} />
        </div>
      </div>
      <WelcomeModal images={adminWelcomeSlides} />
    </div>
  );
};
