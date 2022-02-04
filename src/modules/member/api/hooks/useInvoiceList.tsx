/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/4/22, 4:24 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getInvoiceList } from "@/services/requests/invoiceRequest";

export const useInvoiceList = (memberId: number, invoice_id?: number) => {
  return useQuery(["invoice-list", memberId], () => getInvoiceList(memberId), {
    enabled: !!invoice_id,
    staleTime: Infinity,
  });
};
