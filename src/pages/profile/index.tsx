/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { ProfilePage } from "@/modules/profile";

const Profile = () => {
  return (
    <MainLayout>
      <ProfilePage />;
    </MainLayout>
  );
};
export default withAuth(Profile);
