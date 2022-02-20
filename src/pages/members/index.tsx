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

/**
 *
 * @constructor
 */
export default function MembersListNextPage() {
  return (
    <>
      <MainHead title="Members" />
      <MembersModule.MemberListPage />
    </>
  );
}
