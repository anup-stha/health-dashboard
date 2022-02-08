/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/8/22, 12:21 PM
 *
 *
 */

import { NextPage } from "next";
import { MemberListPage } from "@/modules/member";
import { useRoleList } from "@/services/requests/roleRequests";
import { Loader } from "@/components/Loader";
import { MainHead } from "@/layout/MainHead";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const MemberPage: NextPage = () => {
  const { isLoading } = useRoleList();

  return !isLoading ? (
    <>
      <MainHead title={`Members`} />
      <MemberListPage />
    </>
  ) : (
    <Loader />
  );
};

export default withAuth(withRole(MemberPage));
