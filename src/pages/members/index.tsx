/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
