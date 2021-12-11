/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
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
import { listSubscription } from "@/services/requests/subscriptionRequests";
import { useEffect } from "react";

const Subscription = () => {
  const { selectedRole } = memberStore();
  const { setLoading, setSubscriptionList } = useSubscriptionStore();

  useEffect(() => {
    const listSubscriptionFn = async (id: any) => {
      setLoading(true);

      await listSubscription(id)
        .then((res) => {
          setSubscriptionList(res.data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
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
    listSubscriptionFn(selectedRole.id);
  }, [selectedRole.id]);

  return (
    <MainLayout>
      <SubscriptionPage />
    </MainLayout>
  );
};

export default withAuth(withRole(Subscription));
