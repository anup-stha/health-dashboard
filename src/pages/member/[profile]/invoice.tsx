/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/2/22, 6:30 PM
 *
 *
 */

import { withAuth } from "@/shared/hoc/withAuth";
import { withRole } from "@/shared/hoc/withRole";
import React from "react";
import { MemberInvoicePage } from "@/modules/member/invoice";

const MemberInvoice = () => {
  return <MemberInvoicePage />;
};

export default withAuth(withRole(MemberInvoice));
