/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 9:23 AM
 *
 *
 */

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { memberStore } from "@/modules/members/memberStore";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import SubscriptionPage from "@/modules/subscriptions";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { listRole } from "@/services/requests/roleRequests";
import { useEffect } from "react";
import { listSubscription } from "@/services/requests/subscriptionRequests";

const Subscription = () => {
  const { selectedRole, loading, setLoadingTrue, setLoadingFalse } =
    memberStore();

  const {
    setLoading: setSubsLoading,
    loading: subsLoading,
    subscriptionList,
  } = useSubscriptionStore();

  useEffect(() => {
    const getRoles = async () => {
      setLoadingTrue();
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
          setLoadingFalse();
        })
        .catch(() => {
          setLoadingTrue();
        });
    };
    const getSubscription = async () => {
      setSubsLoading(true);
      await listSubscription(Number(selectedRole.id))
        .then(() => {
          useSubscriptionStore
            .getState()
            .setSubscriptionRole(Number(selectedRole.id));
          setSubsLoading(false);
        })
        .catch(() => setSubsLoading(false));
    };

    if (selectedRole.id !== subscriptionList.roleId) {
      useSubscriptionStore.getState().setSubscriptionList([]);
      getSubscription();
    }

    useRoleStore.getState().roleList.length === 0 && getRoles();
  }, [selectedRole.id]);

  return loading ? <div></div> : <SubscriptionPage loading={subsLoading} />;
};

export default withAuth(withRole(Subscription));
