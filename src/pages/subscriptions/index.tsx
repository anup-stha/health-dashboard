/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/6/22, 11:59 AM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import SubscriptionPage from "@/modules/subscriptions";
import { NextPage } from "next";
import React from "react";
import { MainHead } from "@/layout/MainHead";

const Subscription: NextPage = () => (
  <>
    <MainHead title={`Subscriptions`} />
    <SubscriptionPage />
  </>
);

export default withAuth(withRole(Subscription));
