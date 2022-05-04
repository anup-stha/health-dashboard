/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/3/22, 3:58 PM
 *
 */

import isEmpty from "lodash/isEmpty";
import React from "react";

import { Loader } from "@/components/Loader";

import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { MemberProfilePage } from "@/modules/members/pages/MemberProfilePage";
import { useRoleDetails } from "@/services/requests/roleRequests";

export const OrganizationDetailPage = () => {
  const member = useCurrentMemberStore((state) => state.member);
  const { data: role } = useRoleDetails(member.role.id);

  return isEmpty(member) || !role ? <Loader /> : <MemberProfilePage member={member} role={role.data.data} />;
};
