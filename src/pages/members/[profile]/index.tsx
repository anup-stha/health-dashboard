/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/21/22, 12:15 PM
 *
 *
 */

import React, { useEffect } from "react";
import { NextPage } from "next";

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

import { MainLayout } from "@/layout/MainLayout";

import { MemberProfile } from "@/modules/members/MemberProfile";
import { useRouter } from "next/router";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { MainHead } from "@/layout/MainHead";

const MemberProfilePage: NextPage<any> = () => {
  const router = useRouter();
  const parentId = useMemberStore((state) => state.parent_id);
  const roleId = useMemberStore((state) => state.parent_role);
  const parentPage = useMemberStore((state) => state.parent_page);

  useEffect(() => {
    if (!router.query.id) {
      router.isReady &&
        router.replace(
          `${router.query.profile}?id=${parentId}&role=${roleId}&p_page=${parentPage}`
        );
    }
  }, [router]);

  return (
    <>
      <MainHead title={`Members - ${router.query.profile}`} />

      <MainLayout>
        <MemberProfile />
      </MainLayout>
    </>
  );
};

export default withAuth(withRole(MemberProfilePage));
