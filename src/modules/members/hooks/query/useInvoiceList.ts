/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
