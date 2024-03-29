/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { CaretDown, CaretUp, WarningOctagon } from "phosphor-react";
import React, { Fragment } from "react";

import { BooleanTag } from "@/components/others/BooleanTag";
import { ProfileSubsLoadingState } from "@/components/state/ProfileSubsLoadingState";

import { useInvoiceList } from "@/modules/members/hooks/query/useInvoiceList";
import { useCurrentMemberStore } from "@/modules/members/hooks/zustand/useCurrentMemberStore";

import { Invoice } from "@/types";

interface IPropsInvoiceHistory {
  member_id: number;
}

export const InvoiceHistory = ({ member_id }: IPropsInvoiceHistory) => {
  const { data, isLoading } = useInvoiceList(member_id, 1);

  if (isLoading) return <ProfileSubsLoadingState />;

  return data && data.data.data.length !== 0 ? (
    <div className="print:hidden self-start flex flex-col w-full space-y-4">
      <span className="font-medium text-2xl text-gray-900">Invoice History</span>
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
        <Disclosure className="w-full" as="div">
          {({ open }) => (
            <div className={`${!open ? "flex flex-col" : "flex flex-col-reverse -my-4 border-t border-gray-400/40"}`}>
              <Disclosure.Button className="w-full">
                <div
                  className={`w-full flex justify-between items-center py-4 border-t border-gray-400/60 ${
                    !open && "-my-4"
                  }`}
                >
                  <span className="text-lg font-medium text-gray-700">{!open ? "Show More" : "Show Less"}</span>
                  <span className="bg-primary-400 rounded-full text-white p-2">
                    {!open ? <CaretDown size={14} weight="bold" /> : <CaretUp size={14} weight="bold" />}
                  </span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="divide-y-[1px] divide-gray-400/40">
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
  ) : (
    <div className="print:hidden self-start flex flex-col w-full space-y-4">
      <span className="font-medium text-2xl text-gray-900">Invoice History</span>
      <div className="print:hidden flex items-center text-red-500 space-x-4">
        <WarningOctagon size={40} />
        <span className="font-medium text-xl">No Invoices Found</span>
      </div>
    </div>
  );
};

const InvoiceHistoryItem = ({ invoice }: { invoice: Invoice }) => {
  const router = useRouter();
  const selectedMember = useCurrentMemberStore((state) => state.member);

  return (
    <div className="py-3 flex w-full items-center justify-between">
      <div
        className="flex flex-col cursor-pointer"
        onClick={() => {
          !router.asPath.includes("profile")
            ? router.push(`/members/${selectedMember.role.slug}/invoice?id=${invoice.invoice_no}`)
            : router.push(`/profile/invoice?id=${invoice.invoice_no}`);
        }}
      >
        <span className="font-medium text-xl text-gray-700">INV-0{invoice.invoice_no}</span>
        <span className="font-medium text-base text-gray-500">{invoice.subscription_detail.plan.name}</span>
      </div>
      <div>
        <BooleanTag type="error" condition={!!invoice.paid} trueStatement="PAID" falseStatement="NOT PAID" />
      </div>
    </div>
  );
};
