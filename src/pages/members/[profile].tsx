/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/13/21, 8:02 AM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { PasswordModal } from "@/modules/profile/passwordModal";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { listSubscription } from "@/services/requests/subscriptionRequests";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useRouter } from "next/router";
import { listRole, listRoleDetails } from "@/services/requests/roleRequests";
import { getMemberList } from "@/services/requests/memberRequests";
import { memberStore } from "@/modules/members/memberStore";
import { Member, Role } from "@/types";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { ProfileSubscription } from "@/modules/members/profile/profileSubscription";
import { MemberDetailAddModal } from "@/modules/members/profile/memberDetailAddModal";
import { MemberToggle } from "@/modules/members/profile/memberToggle";
import { MemberProfileData } from "@/modules/members/profile/memberProfile";

const MemberProfile: NextPage<any> = ({ idX }) => {
  const [role, setRole] = useState<any>({} as Role);
  const [roleLoading, setRoleLoading] = useState(false);
  const [selectedRoleLoading, setSelectedRoleLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [verified, setVerified] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState(
    {} as Member
  );
  const router = useRouter();

  const {
    toggleLoading,
    setError,
    loading: memberLoading,

    setMemberList,
  } = memberStore();

  const { setLoading, setSubscriptionList, loading } = useSubscriptionStore();

  useEffect(() => {
    const listSubscriptionFn = async (id: any) => {
      setLoading(true);
      setRoleLoading(true);

      await listSubscription(id)
        .then((res) => {
          console.log(res);
          setSubscriptionList(res.data.data);
          setLoading(false);
        })
        .catch(() => {
          router.push("/404");
          setLoading(false);
        });

      await listRoleDetails(Number(idX.role))
        .then((res) => {
          setRoleLoading(false);
          setRole(res.data.data);
        })
        .catch(() => {
          setRoleLoading(false);
          router.push("/404");
        });
    };

    listSubscriptionFn(Number(idX.role));
  }, []);

  useEffect(() => {
    const listMember = async () => {
      toggleLoading();
      await getMemberList(idX.role)
        .then((response) => {
          const details = response.data.data.list.filter(
            (member) => member.id === Number(idX.id)
          )[0];

          setMemberList(response.data);
          setSelectedMemberDetails(details);
          setActive(details.active);
          setVerified(details.verified);
          toggleLoading();
        })
        .catch((error) => {
          toggleLoading();
          setError(error);
        });
    };

    const getRoles = async () => {
      setSelectedRoleLoading(true);
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);

          useRoleStore
            .getState()
            .setSelectedRole(
              response.data.data.filter(
                (role) => role.id === Number(idX.role)
              )[0]
            );

          setSelectedRoleLoading(false);
        })
        .catch(() => {
          setSelectedRoleLoading(false);
        });
    };
    getRoles().catch(() => {});
    listMember().catch(() => {});
  }, []);

  return (
    <MainLayout>
      {loading || roleLoading || memberLoading || selectedRoleLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="flex gap-8 p-8 sm:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-4">
            <div className="w-3/4 space-y-8">
              <MemberProfileData
                selectedMemberDetails={selectedMemberDetails}
                role={role}
                active={active}
                verified={verified}
              />
              <ProfileSubscription memberId={Number(idX.id)} />
            </div>
            <div className="w-1/4 h-auto bg-white rounded-xl sm:w-full ring-1 ring-black ring-opacity-10 py-2 px-4 self-start">
              <MemberToggle
                toggle={"active"}
                memberId={Number(idX.id)}
                currentState={active}
                setCurrentState={setActive}
                selectedMemberDetails={selectedMemberDetails}
              />
              <MemberToggle
                toggle={"verified"}
                memberId={Number(idX.id)}
                currentState={verified}
                setCurrentState={setVerified}
                selectedMemberDetails={selectedMemberDetails}
              />

              <PasswordModal />
              <MemberDetailAddModal
                memberData={selectedMemberDetails}
                selectedRole={role}
              />
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default withAuth(withRole(MemberProfile));

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      idX: context.query,
    },
  };
};
