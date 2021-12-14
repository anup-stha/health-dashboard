/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 7:49 PM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { PasswordModal } from "@/modules/profile/passwordModal";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  assignSubscriptionToMember,
  getMemberSubscriptionDetails,
  listSubscription,
} from "@/services/requests/subscriptionRequests";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useRouter } from "next/router";
import { listRole, listRoleDetails } from "@/services/requests/roleRequests";
import {
  getMemberDetails,
  getMemberList,
  getMemberTestList,
} from "@/services/requests/memberRequests";
import { memberStore } from "@/modules/members/memberStore";
import { Member, Role } from "@/types";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { ProfileSubscription } from "@/modules/members/profile/profileSubscription";
import { MemberDetailAddModal } from "@/modules/members/profile/memberDetailAddModal";
import { MemberProfileData } from "@/modules/members/profile/memberProfile";
import { MemberToggle } from "@/modules/members/profile/memberToggle";
import { WarningOctagon } from "phosphor-react";
import { SubscriptionDropdown } from "@/modules/members/modal/memberSubscriptionModal";
import { GrayButton, WarningButton } from "@/components/Button";
import { alert } from "@/components/Alert";
import { testStore } from "@/modules/tests/testStore";
import { listTest } from "@/services/requests/testRequests";
import { ProfileTest } from "@/modules/members/profile/ProfileTest";

const MemberProfile: NextPage<any> = ({ idX }) => {
  const [role, setRole] = useState<any>({} as Role);
  const [roleLoading, setRoleLoading] = useState(false);
  const [selectedRoleLoading, setSelectedRoleLoading] = useState(false);
  const [subscriptionDetailsLoading, setSubscriptionDetailsLoading] =
    useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [memberDetailsLoading, setMemberDetailsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [verified, setVerified] = useState(false);
  const [selectedMemberDetails, setSelectedMemberDetails] = useState(
    {} as Member
  );
  const router = useRouter();

  const { setTestList } = testStore();

  const {
    toggleLoading,
    setError,
    loading: memberLoading,
    selectedTestInProfile,
    setMemberList,
    selectedMemberSubscription,
  } = memberStore();

  const {
    setLoading,
    setSubscriptionList,
    loading,
    selectedSubscription,
    subscriptionList,
  } = useSubscriptionStore();

  useEffect(() => {
    const listSubscriptionFn = async (id: any) => {
      setLoading(true);
      setRoleLoading(true);

      await listSubscription(id)
        .then((res) => {
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

    const listMemberDetails = async () => {
      setMemberDetailsLoading(true);
      await getMemberDetails(Number(idX.id)).then(() =>
        setMemberDetailsLoading(false)
      );
    };

    const listSubscriptionDetails = async () => {
      setSubscriptionDetailsLoading(true);
      await getMemberSubscriptionDetails(Number(idX.id))
        .then(() => {
          setSubscriptionDetailsLoading(false);
        })
        .catch(() => {
          setSubscriptionDetailsLoading(false);
        });
    };

    const listTests = async () => {
      setTestLoading(true);
      await listTest()
        .then((res) => {
          setTestLoading(false);
          setTestList(res.data.data);
        })
        .catch(() => setTestLoading(false));
    };

    listTests().catch(() => {});
    listSubscriptionDetails().catch(() => {});
    listMemberDetails().catch(() => {});
    getRoles().catch(() => {});
    listMember().catch(() => {});
  }, [idX.id, idX.role]);

  useEffect(() => {
    const listTestFn = async () => {
      await getMemberTestList(Number(idX.id), Number(selectedTestInProfile.id));
    };

    selectedTestInProfile.id && listTestFn();
  }, [selectedTestInProfile.id]);

  return (
    <MainLayout>
      {loading ||
      roleLoading ||
      memberLoading ||
      selectedRoleLoading ||
      subscriptionDetailsLoading ||
      testLoading ||
      memberDetailsLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="  flex gap-8 p-8 sm:flex-col 3xl:max-w-8xl 3xl:justify-center sm:p-4">
            <div className="w-3/4 space-y-8">
              <MemberProfileData
                selectedMemberDetails={selectedMemberDetails}
                role={role}
                active={active}
                verified={verified}
              />

              <ProfileTest />
            </div>
            <div className=" w-1/4  h-auto sm:w-full flex flex-col space-y-8">
              <ProfileSubscription memberId={Number(idX.id)} />
              <div className="flex flex-col w-full  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">
                    Subscriptions
                  </h1>
                  <p className="text-lg font-semibold text-gray-500">
                    Please choose a subscription to{" "}
                    {Object.keys(selectedMemberSubscription).length !== 0
                      ? "unlink"
                      : "link"}
                  </p>
                </div>

                {subscriptionList.length === 0 ? (
                  <div className="flex items-center text-red-500">
                    <WarningOctagon size={40} />{" "}
                    <span className={"font-semibold"}>
                      No Subscription Found. Please add a subscription to this
                      role{" "}
                      <span
                        onClick={() => router.push("/subscriptions")}
                        className="cursor-pointer"
                      >
                        here
                      </span>
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center  space-x-4 w-full">
                      <div className={"w-[58%]"}>
                        <SubscriptionDropdown />
                      </div>
                      <div className={"w-1/2"}>
                        {Object.keys(selectedMemberSubscription).length !==
                        0 ? (
                          <WarningButton>Unlink</WarningButton>
                        ) : (
                          <GrayButton
                            onClick={async () => {
                              await alert({
                                promise: assignSubscriptionToMember(
                                  Number(idX.id),
                                  Number(selectedSubscription.id)
                                ),
                                msgs: {
                                  loading: "Assigning Subscription",
                                },
                                id: "assign-subscription",
                              });
                            }}
                          >
                            Link
                          </GrayButton>
                        )}
                      </div>
                    </div>
                    {Object.keys(selectedMemberSubscription).length !== 0 && (
                      <GrayButton width={"full"}>Renew Subscription</GrayButton>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-6 space-y-4">
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
              </div>

              <div className="w-full bg-white rounded-xl ring-1 ring-black ring-opacity-10 self-start py-2 px-4">
                <PasswordModal />
                <MemberDetailAddModal
                  memberData={selectedMemberDetails}
                  selectedRole={role}
                />
              </div>
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
