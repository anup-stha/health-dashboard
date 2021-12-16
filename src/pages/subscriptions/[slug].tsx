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
  assignTestToSubscription,
  useSubscriptionList,
} from "@/services/requests/subscriptionRequests";

import withAuth from "@/hoc/withAuth";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useTestList } from "@/services/requests/testRequests";
import { useForm, useWatch } from "react-hook-form";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import React from "react";
import { testStore } from "@/modules/tests/testStore";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";

const SubscriptionDetailsPage: NextPage = ({ role, slug }: any) => {
  const { data } = useSubscriptionList(Number(role));
  const {} = useTestList();
  const selectedSubscription = useSubscriptionStore
    .getState()
    .subscriptionList.filter((subs) => subs.slug === slug)[0];
  const options = testStore.getState().testList.map((element) => ({
    value: `${element.id}-${element.name}`,
    label: element.name,
  }));

  const { handleSubmit, control } = useForm({
    reValidateMode: "onChange",
  });
  const test = useWatch({ control, name: "test", defaultValue: "" });

  const testId = Number(test.split("-")[0]);
  const subtest = testStore
    .getState()
    .testList.filter((element) => element.id === testId);

  const subtestOptions =
    subtest.length !== 0
      ? subtest[0].sub_categories.map((element) => ({
          value: `${element.id}-${element.name}`,
          label: element.name,
        }))
      : [];

  return data ? (
    <MainLayout>
      {data.length === 0 ? (
        <div>Data Not Found</div>
      ) : (
        <div className="px-10 py-10 overflow-visible sm:p-8">
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-4xl font-semibold text-gray-850 capitalize">
                {selectedSubscription.name}
              </h1>
              <p className="text-lg font-semibold text-gray-500">
                {selectedSubscription.slug}
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl font-semibold text-neutral-800 capitalize ">
                Select a test to assign
              </h1>
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
                className={"flex w-full space-x-4 lg:w-full w-1/2 items-end"}
              >
                <div className={"w-1/2"}>
                  <DropdownController
                    options={options}
                    name={"test"}
                    label={"Choose a test"}
                    control={control}
                  />
                </div>
                {subtestOptions.length !== 0 && (
                  <div className={"w-1/2"}>
                    <DropdownController
                      options={subtestOptions}
                      name={"sub_test"}
                      label={"Choose a sub test"}
                      control={control}
                    />
                  </div>
                )}
                <Button disabled={subtestOptions.length === 0}>Assign</Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  ) : (
    <MainLayout>Loading</MainLayout>
  );
};

export default withAuth(SubscriptionDetailsPage);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      role: context.query.role,
      slug: context.query.slug,
    },
  };
};
