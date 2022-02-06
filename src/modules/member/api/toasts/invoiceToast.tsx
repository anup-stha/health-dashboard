/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/6/22, 12:38 PM
 *
 *
 */

import { Invoice } from "@/types";
import { alert } from "@/components/Alert";
import {
  postInvoice,
  putInvoiceAsPaid,
} from "@/services/requests/invoiceRequest";
import { useMemberStore } from "@/modules/member/utils/useMemberStore";
import { queryClient } from "@/pages/_app";
import Router from "next/router";

export const postInvoiceToast = (body: Omit<Invoice, "invoice_no" | "id">) => {
  const postInvoiceToastPromise = new Promise((resolve, reject) =>
    postInvoice(body)
      .then((response) => {
        useMemberStore
          .getState()
          .setInvoiceId(`${response.data.data.invoice_no}`);
        queryClient.invalidateQueries("invoice-list");
        Router.push(
          `/member/org_admin/invoice?id=${response.data.data.invoice_no}`
        );
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    promise: postInvoiceToastPromise,
    msgs: {
      loading: "Generating Invoice",
      success: "Invoice Generated",
    },
    id: "invoice",
  });
};

export const putInvoiceAsPaidToast = (invoice_no: number) => {
  const putInvoiceToastPromise: any = new Promise((resolve, reject) =>
    putInvoiceAsPaid(invoice_no)
      .then((response) => {
        queryClient.invalidateQueries("invoice-list");
        resolve(response.data.message);
      })
      .catch((error) => {
        reject(error.response);
      })
  );

  return alert({
    promise: putInvoiceToastPromise,
    msgs: {
      loading: "Updating Status",
      success: "Invoice Paid",
    },
    id: "invoice",
  });
};
