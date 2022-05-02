/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
  const { data: role } = useRoleDetails(user?.role.id ?? 0);

  /*   const {  isLoading } = useRoleDetails(user?.role.id); */

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

  return role?.data.data && user ? (
    <>
      <MembersModule.MemberProfilePage member={user} role={role?.data?.data} />
    </>
  ) : (
    <Loader />
  );
};
