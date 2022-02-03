/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/3/22, 2:32 PM
 *
 *
 */

import { InvoiceRequestBody, InvoiceResponse } from "@/types";
import { privateAgent } from "@/services/requests/index";

export const postInvoice = (invoice_data: InvoiceRequestBody) => {
  return privateAgent.post<InvoiceResponse>(`invoice`, {
    ...invoice_data,
    subcription_detail: JSON.stringify(invoice_data.subscription_detail),
  });
};
