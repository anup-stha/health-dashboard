/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:23 AM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";
import { memberStore } from "@/modules/members/memberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import SubscriptionPage from "@/modules/subscriptions";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { listRole } from "@/services/requests/roleRequests";
import { useSubscriptionList } from "@/services/requests/subscriptionRequests";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Subscription = () => {
  const { selectedRole } = memberStore();
  const { setLoading, loading } = useSubscriptionStore();
  const router = useRouter();
  const { data } = useSubscriptionList(Number(selectedRole.id));

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    getRoles();
  }, [selectedRole.id]);

  return (
    <MainLayout>
      {!data && loading ? <div></div> : <SubscriptionPage />}
    </MainLayout>
  );
};

export default withAuth(withRole(Subscription));
