/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/28/22, 6:11 PM
 *
 *
 */

import { NextPage } from "next";
import { MemberListPage } from "@/modules/member";
import { useRoleList } from "@/services/requests/roleRequests";
import { Loader } from "@/components/Loader";
import { MainHead } from "@/layout/MainHead";

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

export default MemberPage;
