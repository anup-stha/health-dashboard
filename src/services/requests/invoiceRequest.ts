/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/6/22, 10:24 AM
 *
 *
 */

import { Invoice, InvoiceListResponse, InvoiceResponse } from "@/types";
import { privateAgent } from "@/services/requests/index";

export const postInvoice = (invoice_data: Omit<Invoice, "invoice_no">) => {
  return privateAgent.post<InvoiceResponse>(`invoice`, {
    ...invoice_data,
    subcription_detail: JSON.stringify(invoice_data.subscription_detail),
  });
};

export const getInvoiceList = (member_id: number) => {
  return privateAgent.get<InvoiceListResponse>(`invoice/member/${member_id}`);
};
