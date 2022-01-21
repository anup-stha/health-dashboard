/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/21/22, 9:54 PM
 *
 *
 */

import { MainLayout } from "@/layout/MainLayout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { MemberTest } from "@/modules/members/test";
import { MainHead } from "@/layout/MainHead";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const PatientTestReport = () => {
  const router = useRouter();
  const idX = {
    member_id: String(router.query.pat_id),
    member_role: String(router.query.role),
    member_page: String(router.query.p_page),
  };
  const setParentId = useMemberStore((state) => state.setParent);

  useEffect(() => {
    if (router.isReady && idX.member_role !== "5") router.push("/404");
    setParentId(idX.member_id, idX.member_role, idX.member_page);
  }, [idX]);

  return (
    <MainLayout>
      <MainHead title={`Patient Report`} />

      <MemberTest />
    </MainLayout>
  );
};

export default withAuth(withRole(PatientTestReport));
