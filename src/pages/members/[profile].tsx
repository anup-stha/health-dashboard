/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:38 PM
 *
 *
 */

import React from "react";

import { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";

import { MemberProfile } from "@/modules/members/MemberProfile";

const MemberProfilePage: NextPage<any> = () => {
  return (
    <MainLayout>
      <MemberProfile />
    </MainLayout>
  );
};

export default withAuth(withRole(MemberProfilePage));
