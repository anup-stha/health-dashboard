/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/21/22, 11:55 AM
 *
 *
 */

import React from "react";
import { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";

import { MainLayout } from "@/layout/MainLayout";
import { withRole } from "@/shared/hoc/withRole";
import { SubMemberProfile } from "@/modules/members/SubMemberProfile";
import { useRouter } from "next/router";
import { MainHead } from "@/layout/MainHead";

const MemberProfilePage: NextPage<any> = () => {
  const router = useRouter();

  return (
    <>
      <MainHead title={`Members - ${router.query["next-profile"]}`} />
      <MainLayout>
        <SubMemberProfile />
      </MainLayout>
    </>
  );
};

export default withAuth(withRole(MemberProfilePage));
