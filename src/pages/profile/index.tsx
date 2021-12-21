/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import withAuth from "@/shared/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { ProfilePage } from "@/modules/profile";
import { useEffect, useState } from "react";
import { getCurrentUserProfile } from "@/services/requests/authRequests";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      await getCurrentUserProfile()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    };

    getProfile();
  }, []);

  return <MainLayout>{loading ? "Loading" : <ProfilePage />}</MainLayout>;
};
export default withAuth(Profile);
