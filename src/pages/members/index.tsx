/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/12/21, 9:46 AM
 *
 *
 */

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";

import withAuth from "@/hoc/withAuth";
import { MemberPage } from "@/modules/members";
import { withRole } from "@/hoc/withRole";
import { getMemberList } from "@/services/requests/memberRequests";
import { memberStore } from "@/modules/members/memberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { listRole } from "@/services/requests/roleRequests";
import { MainLayout } from "@/layout/MainLayout";

const Members: NextPage = () => {
  const { setMemberList, toggleLoading, setError, selectedRole } =
    memberStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listMember = async () => {
      toggleLoading();
      await getMemberList(selectedRole.id)
        .then((response) => {
          setMemberList(response.data);
          toggleLoading();
        })
        .catch((error) => {
          toggleLoading();
          setError(error);
        });
    };
    const getRoles = async () => {
      setLoading(true);
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    useRoleStore.getState().roleList.length === 0 && getRoles();

    listMember();
  }, [selectedRole]);

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      {!loading ? <MemberPage /> : <MainLayout></MainLayout>}
    </>
  );
};

export default withRole(withAuth(Members));
