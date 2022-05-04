/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { privateAgent } from "@/services/requests/index";

import { Invoice, InvoiceListResponse, InvoiceResponse, NullDataResponse } from "@/types";

export const postInvoice = (invoice_data: Omit<Invoice, "invoice_no" | "id">) => {
  return privateAgent.post<InvoiceResponse>(`invoice`, {
    ...invoice_data,
    subscription_detail: JSON.stringify(invoice_data.subscription_detail),
  });
};

export const getInvoiceList = (member_id: number) => {
  return privateAgent.get<InvoiceListResponse>(`invoice/member/${member_id}`);
};

export const putInvoiceAsPaid = (invoice_id: number) => {
  return privateAgent.put<NullDataResponse>(`invoice/update/${invoice_id}`);
};
