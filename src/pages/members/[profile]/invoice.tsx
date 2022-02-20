/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 1:19 PM
 *
 *
 */

import { useRouter } from "next/router";
import React from "react";

import { MembersModule } from "@/modules/members";
import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";

const MemberInvoice = () => {
  const { query } = useRouter();

  return (
    <MembersModule.InvoicePage
      invoice_id={isNaN(Number(query.id)) ? undefined : Number(query.id)}
    />
  );
};

export default withAuth(withRole(MemberInvoice));
