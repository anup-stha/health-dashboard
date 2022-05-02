/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import { MembersModule } from "@/modules/members";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const PatientTestReportPage = () => {
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
      <MainHead title={`${currentMember.name.split(" ")[0]} Patient Report`} />
      <MembersModule.TestReportPage current_member={currentMember} />
    </>
  );
};

export default withAuth(withRole(PatientTestReportPage));
