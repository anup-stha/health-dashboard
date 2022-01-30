/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/30/22, 10:14 AM
 *
 *
 */

import { NextPage } from "next";
import {
  listSubscriptionDetail,
  useSubscriptionList,
} from "@/services/requests/subscriptionRequests";

import { withAuth } from "@/shared/hoc/withAuth";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useTestList } from "@/services/requests/testRequests";
import React, { useEffect, useState } from "react";
import { SubsDescriptionPage } from "@/modules/subscriptions/subsDescriptionPage";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/router";
import { MainHead } from "@/layout/MainHead";
import { withRole } from "@/shared/hoc/withRole";

const SubscriptionDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id, role, slug } = router.query;

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
    router.isReady && getSubscriptionTestDetails();
  }, []);

  return (
    <>
      <MainHead title={`Subscriptions - ${slug}`} />

      {subsLoading || testLoading || loading ? (
        <Loader />
      ) : (
        <SubsDescriptionPage selected={selectedSubscription} />
      )}
    </>
  );
};

export default withAuth(withRole(SubscriptionDetailsPage));
