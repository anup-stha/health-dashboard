import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";

import withAuth from "@/hoc/withAuth";
import OrganisationPage from "@/modules/member";
import { withRole } from "@/hoc/withRole";
import { getMemberList } from "@/services/requests/userRequests";
import { memberStore } from "@/modules/member/memberStore";

const Members: NextPage = () => {
  const { memberList, setMemberList, toggleLoading, setError } = memberStore();

  useEffect(() => {
    const listMember = async () => {
      toggleLoading();
      await getMemberList(1)
        .then((response) => {
          setMemberList(response.data);
          toggleLoading();
        })
        .catch((error) => {
          toggleLoading();
          setError(error);
        });
    };

    listMember();
  }, []);

  console.log(memberList);

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <OrganisationPage />
    </>
  );
};

export default withRole(withAuth(Members));
