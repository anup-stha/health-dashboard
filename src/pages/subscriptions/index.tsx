/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { Loader } from "@/components/Loader";

import { MainHead } from "@/layout/MainHead";
import SubscriptionPage from "@/modules/subscriptions";
import { getCurrentUserProfile } from "@/services/requests/authRequests";
import { useRoleList } from "@/services/requests/roleRequests";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const Subscription: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const { isLoading } = useRoleList();

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      await getCurrentUserProfile()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    };

    getProfile();
  }, []);

  if (isLoading || loading) return <Loader />;

  return (
    <>
      <MainHead title="Subscriptions" />
      <SubscriptionPage />
    </>
  );
};

export default withAuth(withRole(Subscription));
