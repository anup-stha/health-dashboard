/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
import { useRoleDetails } from "@/services/requests/roleRequests";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const MemberProfilePage = () => {
  const router = useRouter();
  const member = useCurrentMemberStore((state) => state.user);
  const { data: role } = useRoleDetails(member.role.id);

  useEffect(() => {
    if (isEmpty(member)) {
      router.push("/members");
      toast.error("Please select a member first");
    }
  }, [JSON.stringify(member)]);

  return isEmpty(member) || !role ? (
    <Loader />
  ) : (
    <>
      <MainHead title={`${member.role.name}`} />

      <MembersModule.MemberProfilePage member={member} role={role?.data.data} />
    </>
  );
};

export default withAuth(withRole(MemberProfilePage));
