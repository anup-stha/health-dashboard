/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/4/22, 3:47 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import React from "react";
import { MemberInvoicePage } from "@/modules/member/invoice";
import { useRouter } from "next/router";

const MemberInvoice = () => {
  const { query } = useRouter();

  return (
    <MemberInvoicePage
      invoice_id={isNaN(Number(query.id)) ? undefined : Number(query.id)}
    />
  );
};

export default withAuth(withRole(MemberInvoice));
