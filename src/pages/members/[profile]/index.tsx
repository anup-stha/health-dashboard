/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 10:29 AM
 *
 *
 */

import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import { MembersModule } from "@/modules/members";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const MemberProfilePage = () => {
  const router = useRouter();
  const member = useCurrentMemberStore((state) => state.member);
  const role = useCurrentMemberStore((state) => state.role);

  useEffect(() => {
    if (isEmpty(member)) {
      router.push("/members");
      toast.error("Please select a member first");
    }
  }, [JSON.stringify(member)]);

  return isEmpty(member) ? (
    <Loader />
  ) : (
    <>
      <MainHead title={`${member.role.name}`} />

      <MembersModule.MemberProfilePage member={member} role={role} />
    </>
  );
};

export default withAuth(withRole(MemberProfilePage));
