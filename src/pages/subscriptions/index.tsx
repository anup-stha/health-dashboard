/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 9:47 PM
 *
 *
 */

import withAuth from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import SubscriptionPage from "@/modules/subscriptions";
import { useRoleList } from "@/services/requests/roleRequests";
import { useSubscriptionList } from "@/services/requests/subscriptionRequests";
import { memberStore } from "@/modules/members/memberStore";

const Subscription = () => {
  const { selectedRole } = memberStore();

  const { isLoading: subsLoading } = useSubscriptionList(
    Number(selectedRole.id)
  );
  const { isLoading: roleListLoading } = useRoleList();

  return !roleListLoading ? (
    <SubscriptionPage loading={subsLoading} />
  ) : (
    <div />
  );
};

export default withAuth(withRole(Subscription));
