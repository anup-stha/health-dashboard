/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/28/22, 6:17 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { SubMemberProfile } from "@/modules/member/profile/SubMemberProfile";
import { useRouter } from "next/router";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import toast from "react-hot-toast";
import { Loader } from "@/components/Loader";
import { MainHead } from "@/layout/MainHead";

const MemberProfilePage = () => {
  const router = useRouter();
  const member = useCurrentMemberStore((state) => state.user);

  useEffect(() => {
    if (isEmpty(member)) {
      router.push("/member");
      toast.error("Please select a member first");
    }
  }, [JSON.stringify(member)]);

  return isEmpty(member) ? (
    <Loader />
  ) : (
    <>
      <MainHead title={`${member.role.name}`} />

      <SubMemberProfile />
    </>
  );
};

export default withAuth(withRole(MemberProfilePage));
