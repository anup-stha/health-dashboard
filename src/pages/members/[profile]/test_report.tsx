/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/23/22, 9:18 PM
 *
 *
 */

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

  console.log(router);

  useEffect(() => {
    if (router.isReady && idX.member_role !== "5") router.push("/404");
    setParentId(
      "0",
      "0",
      "0",
      "0",
      "0",

      idX.member_role,
      idX.member_id,
      idX.member_page
    );
  }, [idX]);

  return (
    <>
      <MainHead title={`Patient Report`} />
      <MemberTest />
    </>
  );
};

export default withAuth(withRole(PatientTestReport));
