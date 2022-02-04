/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/4/22, 4:20 PM
 *
 *
 */

import { useInvoiceList } from "@/modules/member/api/hooks/useInvoiceList";
import React, { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { BooleanTag } from "@/components/others/BooleanTag";
import { CaretDown, CaretUp } from "phosphor-react";
import { Invoice } from "@/types";
import { useRouter } from "next/router";

interface IPropsInvoiceHistory {
  member_id: number;
}

export const InvoiceHistory = ({ member_id }: IPropsInvoiceHistory) => {
  const { data } = useInvoiceList(member_id, 1);

  return data ? (
    <div className="print:hidden self-start flex flex-col w-full  bg-white rounded-xl ring-1 ring-black ring-opacity-10 py-6 px-8 space-y-4">
      <span className="font-semibold text-2xl text-gray-900">
        Invoice History
      </span>
      <div className="divide-y-[1px] divide-gray-400/40">
        {data.data.data.map((invoice, index) => {
          if (index > 2) return;

          return (
            <Fragment key={invoice.invoice_no}>
              <InvoiceHistoryItem invoice={invoice} />
            </Fragment>
          );
        })}
      </div>
      {data.data.data.length > 3 ? (
        <Disclosure className={"w-full"} as={"div"}>
          {({ open }) => (
            <div
              className={`${
                !open
                  ? "flex flex-col"
                  : "flex flex-col-reverse -my-4 border-t border-gray-400/40"
              }`}
            >
              <Disclosure.Button className={"w-full"}>
                <div
                  className={`w-full flex justify-between items-center py-4 border-t border-gray-400/60 ${
                    !open && "-my-4"
                  }`}
                >
                  <span className={"text-lg font-semibold text-gray-700"}>
                    {!open ? "Show More" : "Show Less"}
                  </span>
                  <span className={"bg-green-400 rounded-full text-white p-2"}>
                    {!open ? (
                      <CaretDown size={14} weight={"bold"} />
                    ) : (
                      <CaretUp size={14} weight="bold" />
                    )}
                  </span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className={"divide-y-[1px] divide-gray-400/40"}>
                {data.data.data.map((invoice, index) => {
                  if (index < 2) return;

                  return (
                    <Fragment key={invoice.invoice_no}>
                      <InvoiceHistoryItem invoice={invoice} />
                    </Fragment>
                  );
                })}
              </Disclosure.Panel>{" "}
            </div>
          )}
        </Disclosure>
      ) : null}
    </div>
  ) : null;
};

const InvoiceHistoryItem = ({ invoice }: { invoice: Invoice }) => {
  const router = useRouter();

  return (
    <div className="py-3 flex w-full items-center justify-between">
      <div
        className="flex flex-col cursor-pointer"
        onClick={() =>
          router.push(`/member/org_admin/invoice?id=${invoice.invoice_no}`)
        }
      >
        <span className="font-semibold text-xl text-gray-700">
          INV-0{invoice.invoice_no}
        </span>
        <span className="font-semibold text-base text-gray-600">
          {invoice.subcription_detail.plan.name}
        </span>
      </div>
      <div>
        <BooleanTag
          type={"error"}
          condition={!!invoice.paid}
          trueStatement={"PAID"}
          falseStatement={"NOT PAID"}
        />
      </div>
    </div>
  );
};
