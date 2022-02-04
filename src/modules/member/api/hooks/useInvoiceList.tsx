/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/4/22, 12:23 PM
 *
 *
 */

import { useQuery } from "react-query";
import { getInvoiceList } from "@/services/requests/invoiceRequest";

export const useInvoiceList = (memberId: number) => {
  return useQuery(["invoice-list", memberId], () => getInvoiceList(memberId), {
    staleTime: Infinity,
  });
};
