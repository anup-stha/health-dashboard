/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 9:28 PM
 *
 *
 */

import { NextPage } from "next";
import React from "react";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import SubscriptionPage from "@/modules/subscriptions";
import { useRoleList } from "@/services/requests/roleRequests";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const Subscription: NextPage = () => {
  const { isLoading } = useRoleList();

  return !isLoading ? (
    <>
      <MainHead title="Subscriptions" />
      <SubscriptionPage />
    </>
  ) : (
    <Loader />
  );
};

export default withAuth(withRole(Subscription));
