/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/3/22, 3:09 PM
 *
 *
 */

import { InvoiceRequestBody } from "@/types";
import { alert } from "@/components/Alert";
import { postInvoice } from "@/services/requests/invoiceRequest";
import { useMemberStore } from "@/modules/member/utils/useMemberStore";

export const postInvoiceToast = (body: InvoiceRequestBody) => {
  const postInvoiceToastPromise = new Promise((resolve, reject) =>
    postInvoice(body)
      .then((response) => {
        useMemberStore
          .getState()
          .setInvoiceId(`${response.data.data.invoice_no}`);
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
