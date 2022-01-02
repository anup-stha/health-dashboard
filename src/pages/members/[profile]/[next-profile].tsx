/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/2/22, 4:52 PM
 *
 *
 */

import React from "react";
import { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";

import { MainLayout } from "@/layout/MainLayout";
import { withRole } from "@/shared/hoc/withRole";
import { SubMemberProfile } from "@/modules/members/SubMemberProfile";

const MemberProfilePage: NextPage<any> = () => {
  return (
    <MainLayout>
      <SubMemberProfile />
    </MainLayout>
  );
};

export default withAuth(withRole(MemberProfilePage));
