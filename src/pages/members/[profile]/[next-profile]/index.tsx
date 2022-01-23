/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/23/22, 9:19 PM
 *
 *
 */

import React, { useEffect } from "react";
import { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import { SubMemberProfile } from "@/modules/members/SubMemberProfile";
import { useRouter } from "next/router";
import { MainHead } from "@/layout/MainHead";
import { useMemberStore } from "@/modules/members/useMemberStore";

const MemberProfilePage: NextPage<any> = () => {
  const router = useRouter();

  const parentId = useMemberStore((state) => state.parent_id);
  const roleId = useMemberStore((state) => state.parent_role);
  const parentPage = useMemberStore((state) => state.parent_page);
  const role = useMemberStore((state) => state.member_role_name);
  const parentRole = useMemberStore((state) => state.parent_role_name);
  const mainRole = useMemberStore((state) => state.main_role);

  useEffect(() => {
    console.log(router);

    if (!router.query.id) {
      router.isReady &&
        router.replace(
          {
            query: {
              profile: parentRole,
              "next-profile": role,
              id: parentId,
              p_id: mainRole,
              p_role: "2",
              p_page: parentPage,
              role: roleId,
            },
          },
          undefined,
          {
            shallow: true,
          }
        );
    }
  }, [router]);

  return (
    <>
      <MainHead title={`Members - ${router.query["next-profile"]}`} />
      <>
        <SubMemberProfile />
      </>
    </>
  );
};

export default withAuth(withRole(MemberProfilePage));
