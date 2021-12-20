/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/16/21, 1:18 PM
 *
 *
 */

import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "@/layout/MainLayout";
import {
  listSubscription,
  listSubscriptionDetail,
} from "@/services/requests/subscriptionRequests";

import withAuth from "@/hoc/withAuth";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useTestList } from "@/services/requests/testRequests";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubsDescriptionPage } from "@/modules/subscriptions/subsDescriptionPage";

const SubscriptionDetailsPage: NextPage = ({ role, slug, id }: any) => {
  const [loading, setLoading] = useState(false);

  const { data } = useTestList();
  const {
    setLoading: setSubsLoading,
    loading: subsLoading,
    subscriptionList,
  } = useSubscriptionStore();
  const router = useRouter();

  const selectedSubscription = useSubscriptionStore
    .getState()
    .subscriptionList.list.filter((subs) => subs.slug === slug)[0];

  useEffect(() => {
    const getSubscription = async () => {
      setSubsLoading(true);
      await listSubscription(Number(role))
        .then(() => setSubsLoading(false))
        .catch(() => router.push("/404"));
    };
    subscriptionList.list.length === 0 && getSubscription();
  }, []);

  useEffect(() => {
    const getSubscriptionTestDetails = async () => {
      setLoading(true);
      await listSubscriptionDetail(Number(id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    };
    getSubscriptionTestDetails();
  }, []);

  return (
    <MainLayout>
      {subsLoading || !data || loading ? (
        <div>loading</div>
      ) : (
        /*  <div className="px-10 py-10 overflow-visible sm:p-8">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <h1 className="text-4xl font-semibold text-gray-850 capitalize">
                {selectedSubscription ? selectedSubscription.name : ""}
              </h1>
            </div>
            <div className="space-y-2">
              <form
                onSubmit={handleSubmit(
                  async (data) =>
                    await alert({
                      type: "promise",
                      promise: assignTestToSubscription(
                        Number(data.test.split("-")[0]),
                        Number(data.sub_test.split("-")[0]),
                        Number(selectedSubscription.id)
                      ),
                      msgs: {
                        loading: "Assigning",
                      },
                      id: "Test-assign",
                    })
                )}
                className={"flex w-full space-x-4 lg:w-full w-1/3 items-end"}
              >
                <div className={"w-1/2"}>
                  <DropdownController
                    options={options}
                    name={"test"}
                    label={""}
                    control={control}
                  />
                </div>
                {subtestOptions.length !== 0 && (
                  <div className={"w-1/2"}>
                    <DropdownController
                      options={subtestOptions}
                      name={"sub_test"}
                      label={""}
                      control={control}
                    />
                  </div>
                )}
                <Button disabled={subtestOptions.length === 0}>Assign</Button>
              </form>
              <SubscriptionDetails />
            </div>
          </div>
        </div> */
        <SubsDescriptionPage selected={selectedSubscription} />
      )}
    </MainLayout>
  );
};

export default withAuth(SubscriptionDetailsPage);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      id: context.query.id,
      role: context.query.role,
      slug: context.query.slug,
    },
  };
};
