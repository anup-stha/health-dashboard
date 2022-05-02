/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useRouter } from "next/router";
import React from "react";

import { MembersModule } from "@/modules/members";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const MemberInvoice = () => {
  const { query } = useRouter();
  const selectedMember = useCurrentMemberStore((state) => state.member);

  return (
    <MembersModule.InvoicePage
      invoice_id={isNaN(Number(query.id)) ? undefined : Number(query.id)}
      selectedMember={selectedMember}
    />
  );
};

export default withAuth(withRole(MemberInvoice));
