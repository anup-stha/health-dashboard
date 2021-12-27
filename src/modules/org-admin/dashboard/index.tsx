/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/27/21, 4:49 PM
 *
 *
 */

import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";

export const OrgAdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="px-10 -mt-2 pb-8 sm:px-4 space-y-8 w-full dashboard-bg-2">
      <div>
        <h1 className="text-[2.5rem] text-gray-800 font-semibold ">
          Hello, {user.name}
        </h1>
        <p className="text-xl text-gray-500 font-medium">
          Welcome Back To Dashboard!
        </p>
      </div>
    </div>
  );
};
