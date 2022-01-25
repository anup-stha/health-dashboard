/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 9:28 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import SubscriptionPage from "@/modules/subscriptions";
import { NextPage } from "next";
import React from "react";
import { MainHead } from "@/layout/MainHead";
import { useRoleList } from "@/services/requests/roleRequests";
import { Loader } from "@/components/Loader";

const Subscription: NextPage = () => {
  const { isLoading } = useRoleList();

  return !isLoading ? (
    <>
      <MainHead title={`Subscriptions`} />
      <SubscriptionPage />
    </>
  ) : (
    <Loader />
  );
};

export default withAuth(withRole(Subscription));
