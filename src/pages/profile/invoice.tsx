/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useRouter } from "next/router";
import React from "react";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MembersModule } from "@/modules/members";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const ProfileInvoice = () => {
  const { query } = useRouter();
  const user = useAuthStore((state) => state.user);

  return user ? (
    <MembersModule.InvoicePage
      selectedMember={user}
      invoice_id={isNaN(Number(query.id)) ? undefined : Number(query.id)}
    />
  ) : null;
};

export default withAuth(withRole(ProfileInvoice));
