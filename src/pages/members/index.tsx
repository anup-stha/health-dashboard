/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/18/22, 4:06 PM
 *
 *
 */

import type { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";
import { MemberPage } from "@/modules/members";
import { withRole } from "@/shared/hoc/withRole";
import { useRoleList } from "@/services/requests/roleRequests";
import { MainLayout } from "@/layout/MainLayout";
import { Loader } from "@/components/Loader";
import { NextSeo } from "next-seo";
import React from "react";

const Members: NextPage = () => {
  const { isLoading } = useRoleList();

  return (
    <>
      <NextSeo title={`Sunya Health | Members`} />
      <MainLayout>{!isLoading ? <MemberPage /> : <Loader />}</MainLayout>
    </>
  );
};

export default withAuth(withRole(Members));
