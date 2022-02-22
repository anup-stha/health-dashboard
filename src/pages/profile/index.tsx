/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/22/22, 9:45 PM
 *
 *
 */

import React, { useEffect, useState } from "react";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MembersModule } from "@/modules/members";
import { getCurrentUserProfile } from "@/services/requests/authRequests";
import { useMemberSubsDetails } from "@/services/requests/subscriptionRequests";
import { withAuth } from "@/shared/hoc/withAuth";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      await getCurrentUserProfile()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    };

    getProfile();
  }, []);

  const { isLoading } = useMemberSubsDetails(user.member_id ?? 0);

  return (
    <>
      <MainHead title="Profile" />

      {loading && isLoading ? <Loader /> : <MembersModule.ProfilePage />}
    </>
  );
};
export default withAuth(Profile);
