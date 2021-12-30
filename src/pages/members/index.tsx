/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/30/21, 10:19 AM
 *
 *
 */

import type { NextPage } from "next";
import Head from "next/head";

import { withAuth } from "@/shared/hoc/withAuth";
import { MemberPage } from "@/modules/members";
import { withRole } from "@/shared/hoc/withRole";
import { useRoleList } from "@/services/requests/roleRequests";
import { MainLayout } from "@/layout/MainLayout";
import { Loader } from "@/components/Loader";

const Members: NextPage = () => {
  const { isLoading } = useRoleList();

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <MainLayout>{!isLoading ? <MemberPage /> : <Loader />}</MainLayout>
    </>
  );
};

export default withRole(withAuth(Members));
