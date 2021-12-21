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
import { listTests } from "@/services/requests/testRequests";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SubsDescriptionPage } from "@/modules/subscriptions/subsDescriptionPage";

const SubscriptionDetailsPage: NextPage = ({ role, slug, id }: any) => {
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

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
    const getTests = async () => {
      setTestLoading(true);
      await listTests()
        .then(() => setTestLoading(false))
        .catch(() => setTestLoading(false));
    };
    getTests();
  }, []);

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
