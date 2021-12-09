import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";

import withAuth from "@/hoc/withAuth";
import { MemberPage } from "@/modules/members";
import { withRole } from "@/hoc/withRole";
import { getMemberList } from "@/services/requests/memberRequests";
import { memberStore } from "@/modules/members/memberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { listRole } from "@/services/requests/roleRequests";

const Members: NextPage = () => {
  const { setMemberList, toggleLoading, setError, selectedRole } =
    memberStore();

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
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
        })
        .catch(() => {});
    };
    getRoles();

    listMember();
  }, [selectedRole]);

  useEffect(() => {
    const getRoles = async () => {
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
        })
        .catch(() => {});
    };
    getRoles();
  }, []);

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <MemberPage />
    </>
  );
};

export default withRole(withAuth(Members));
