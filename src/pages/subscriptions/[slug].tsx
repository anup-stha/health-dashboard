/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 9:54 PM
 *
 *
 */

import { GetServerSidePropsContext, NextPage } from "next";
import { MainLayout } from "@/layout/MainLayout";
import {
  listSubscriptionDetail,
  useSubscriptionList,
} from "@/services/requests/subscriptionRequests";

import withAuth from "@/shared/hoc/withAuth";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useTestList } from "@/services/requests/testRequests";
import React, { useEffect, useState } from "react";
import { SubsDescriptionPage } from "@/modules/subscriptions/subsDescriptionPage";

const SubscriptionDetailsPage: NextPage = ({ role, slug, id }: any) => {
  const [loading, setLoading] = useState(false);

  const selectedSubscription = useSubscriptionStore
    .getState()
    .subscriptionList.list.filter((subs) => subs.slug === slug)[0];

  const { isLoading: testLoading } = useTestList();
  const { isLoading: subsLoading } = useSubscriptionList(Number(role));

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
      {subsLoading || testLoading || loading ? (
        <div>loading</div>
      ) : (
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
