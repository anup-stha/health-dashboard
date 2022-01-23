/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 8:51 PM
 *
 *
 */

import type { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";
import { MemberPage } from "@/modules/members";
import { withRole } from "@/shared/hoc/withRole";
import { useRoleList } from "@/services/requests/roleRequests";
import { Loader } from "@/components/Loader";
import { NextSeo } from "next-seo";
import React from "react";

const Members: NextPage = () => {
  const { isLoading } = useRoleList();

  return (
    <>
      <NextSeo title={`Sunya Health | Members`} />
      {!isLoading ? <MemberPage /> : <Loader />}
    </>
  );
};

export default withAuth(withRole(Members));
