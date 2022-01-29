/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/29/22, 6:50 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { ProfilePage } from "@/modules/profile";
import React, { useEffect, useState } from "react";
import { getCurrentUserProfile } from "@/services/requests/authRequests";
import { Loader } from "@/components/Loader";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useMemberSubsDetails } from "@/services/requests/subscriptionRequests";
import { MainHead } from "@/layout/MainHead";

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
      <MainHead title={`Profile`} />

      {loading && isLoading ? <Loader /> : <ProfilePage />}
    </>
  );
};
export default withAuth(Profile);
