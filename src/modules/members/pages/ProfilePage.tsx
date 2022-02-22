/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/22/22, 7:56 PM
 *
 *
 */

import React from "react";

import { Loader } from "@/components/Loader";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useDashboardQuery } from "@/modules/dashboard/hooks/useDashboardQuery";
import { MembersModule } from "@/modules/members";
import { useRoleDetails } from "@/services/requests/roleRequests";

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { data: role } = useRoleDetails(user.role.id);

  /*   const {  isLoading } = useRoleDetails(user.role.id); */

  /*   const onLogOut = async () => {
      await alert({
        promise: logoutUser(),
        msgs: {
          loading: "Logging Out",
          success: "Logged Out Successfully",
        },
        id: "Login Toast",
      });
    }; */
  /*
    if (isLoading) return <Loader />;
  */
  const { data } = useDashboardQuery();

  return role?.data.data ? (
    <>
      <MembersModule.MemberProfilePage member={user} role={role?.data?.data} />
    </>
  ) : (
    <Loader />
  );
};
