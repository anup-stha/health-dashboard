/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 10:53 AM
 *
 *
 */

import type { NextPage } from "next";
import Head from "next/head";

import withAuth from "@/shared/hoc/withAuth";
import { MemberPage } from "@/modules/members";
import { withRole } from "@/shared/hoc/withRole";
import { useRoleList } from "@/services/requests/roleRequests";
import { MainLayout } from "@/layout/MainLayout";

const Members: NextPage = () => {
  const { isLoading } = useRoleList();

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <MainLayout>
        {!isLoading ? <MemberPage /> : <div>Loading</div>}
      </MainLayout>
    </>
  );
};

export default withRole(withAuth(Members));
