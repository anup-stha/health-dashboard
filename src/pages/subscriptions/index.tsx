/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 3:38 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import SubscriptionPage from "@/modules/subscriptions";
import { NextPage } from "next";

const Subscription: NextPage = () => <SubscriptionPage />;

export default withAuth(withRole(Subscription));
