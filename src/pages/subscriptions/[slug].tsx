/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { SubsDescriptionPage } from "@/modules/subscriptions/subsDescriptionPage";
import { listSubscriptionDetail, useSubscriptionList } from "@/services/requests/subscriptionRequests";
import { useTestList } from "@/services/requests/testRequests";
import { withAuth } from "@/shared/hoc/withAuth";
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
  }, [router]);

  return (
    <>
      <MainHead title={`Subscriptions - ${slug}`} />

      {subsLoading || testLoading || loading ? <Loader /> : <SubsDescriptionPage selected={selectedSubscription} />}
    </>
  );
};

export default withAuth(withRole(SubscriptionDetailsPage));
