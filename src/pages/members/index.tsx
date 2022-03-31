/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 9:54 AM
 *
 *
 */

import React from "react";

import { MainHead } from "@/layout/MainHead";
import { MembersModule } from "@/modules/members";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

/**
 *
 * @constructor
 */
const MembersListNextPage = () => {
  return (
    <>
      <MainHead title="Members" />
      <MembersModule.MemberListPage />
    </>
  );
};

export default withAuth(withRole(MembersListNextPage));
