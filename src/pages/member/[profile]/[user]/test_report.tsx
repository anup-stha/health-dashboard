/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/25/22, 6:57 PM
 *
 *
 */

import React, { useEffect } from "react";
import { MemberTest } from "@/modules/member/test";
import { MainHead } from "@/layout/MainHead";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import isEmpty from "lodash/isEmpty";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";

const PatientTestReport = () => {
  const router = useRouter();
  const currentMember = useCurrentMemberStore((state) => state.user);

  useEffect(() => {
    if (isEmpty(currentMember)) {
      router.push("/member");
      toast.error("Please select a member first");
    }
  }, [JSON.stringify(currentMember)]);

  return isEmpty(currentMember) ? (
    <Loader />
  ) : (
    <>
      <MainHead title={`Patient Report`} />
      <MemberTest current_member={currentMember} />
    </>
  );
};

export default withAuth(withRole(PatientTestReport));
