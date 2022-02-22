/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/22/22, 10:06 PM
 *
 *
 */

import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { Sliders } from "phosphor-react";
import React, { Fragment, useEffect, useState } from "react";
import LetteredAvatar from "react-avatar";
import { useForm } from "react-hook-form";

import { Button, GrayButton, PrimaryButton } from "@/components/Button";
import { Heading } from "@/components/Headings";
import { PrimaryInput } from "@/components/Input";
import { Loader } from "@/components/Loader";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useInvoiceList } from "@/modules/members/hooks/query/useInvoiceList";
import { useMemberStore } from "@/modules/members/hooks/zustand/useMemberStore";
import { Member } from "@/modules/members/types";
import {
  postInvoiceToast,
  putInvoiceAsPaidToast,
} from "@/modules/members/utils/invoiceToast";
import { useMemberSubsDetails } from "@/services/requests/subscriptionRequests";

import { Invoice } from "@/types";

interface IMemberInvoicePage {
  invoice_id?: number;
  selectedMember: Member;
}

export const InvoicePage = ({
  invoice_id,
  selectedMember,
}: IMemberInvoicePage) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const invoiceId = useMemberStore((state) => state.invoice_id);
  const { data: selectedSubscription } = useMemberSubsDetails(
    selectedMember.member_id ?? selectedMember.id
  );
  const [paid, setPaid] = useState(false);

  const [vat, setVat] = useState(13);
  const [discount, setDiscount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const { data: invoiceList, isFetching } = useInvoiceList(
    selectedMember.member_id ?? selectedMember.id,
    invoice_id
  );

  const [invoiceData, setInvoiceData] = useState({
    gross_amount: 0,
    vat_amount: 0,
    discount_amount: 0,
    net_amount: 0,
  });

  const { handleSubmit, register } = useForm({
    defaultValues: {
      vat,
      discount,
    },
  });

  const getInvoiceData = (discount_per: number, vat_per: number) => {
    if (!selectedSubscription) return;
    const price = +selectedSubscription.plan.price;
    return {
      gross_amount: price,
      discount_amount: price * (discount_per / 100),
      vat_amount: price * (vat_per / 100),
      net_amount:
        price - price * (discount_per / 100) + price * (vat_per / 100),
    };
  };

  const closeModal = () => setIsOpen(false);

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (invoiceList && invoice_id) {
      console.table(invoiceList);
      const selectedInvoice = invoiceList.data.data.find(
        (invoice) => invoice.invoice_no === invoice_id
      );

      if (selectedInvoice) {
        setSelectedInvoice(selectedInvoice);
        console.log(selectedInvoice);
        setInvoiceData({
          gross_amount: selectedInvoice.gross_amount,
          discount_amount: selectedInvoice.discount_amount,
          vat_amount: selectedInvoice.vat_amount,
          net_amount: selectedInvoice.net_amount,
        });
        setPaid(!!selectedInvoice.paid);
        useMemberStore
          .getState()
          .setInvoiceId(`0${selectedInvoice.invoice_no}`);
      } else {
        !isFetching && router.push("/404");
      }
    } else {
      const data = getInvoiceData(discount, vat);
      data && setInvoiceData(data);
    }
  }, [selectedSubscription, invoice_id, invoiceList, isFetching]);

  useEffect(() => {
    !invoice_id && useMemberStore.getState().setInvoiceId("__");
  }, []);

  return !selectedSubscription ? (
    <Loader />
  ) : (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col gap-y-8">
        <Heading
          title={
            !invoice_id ? "Generate New Invoice" : `Invoice INV-0${invoice_id}`
          }
          subtitle={
            !invoice_id
              ? "Select discount and vat amount to generate a new invoice"
              : "Details of Invoice"
          }
        />

        <div className="w-full flex items-start gap-8 md:flex-col">
          <div className="rounded-lg bg-white w-3/4 shadow-md p-8 flex flex-col gap-10 md:w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <div className="relative h-20 w-20 cursor-pointer">
                  {user.id === 1 && user.image ? (
                    <div className="w-20 h-20 rounded-full object-contain overflow-hidden relative">
                      <Image
                        src={user.image}
                        layout="fill"
                        objectFit="cover"
                        alt="profile"
                      />
                    </div>
                  ) : (
                    <LetteredAvatar
                      name="Sunya Health"
                      size="60"
                      round={true}
                      maxInitials={2}
                    />
                  )}
                </div>
                <div className="ml-4 flex flex-col gap-1">
                  <div className="text-[1.3rem] font-bold text-slate-800  capitalize cursor-pointer">
                    Sunya Health
                  </div>
                  <a
                    href="mailto: contact@sunya.health"
                    className="text-lg font-medium text-gray-500 hover:text-gray-800"
                  >
                    contact@sunya.health
                  </a>
                </div>
              </div>
              <div className="text-lg font-medium text-gray-500 gap-1 flex flex-col text-right">
                <span>Kathmandu - 44700</span>
                <span>Bagmati Province</span>
                <span> Nepal</span>
              </div>
            </div>
            <div className="invoice-top-bg shadow-lg rounded-xl text-white w-full text-lg p-10 flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <span className="font-semibold">Invoice Number</span>
                <span className="font-medium">INV-{invoiceId}</span>
                <div className="flex gap-1">
                  <span className="text-gray-100">Issued Date:</span>
                  <span className="font-medium">
                    {moment().format("DD MMM YYYY")}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="text-gray-100">Due Date:</span>
                  <span className="font-medium">
                    {moment().add(15, "days").format("DD MMM YYYY")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <span className="font-semibold">Billed to</span>
                <span>{selectedMember.name}</span>
                <span>{selectedMember.address}</span>
                <span>{selectedMember.phone}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-xl text-gray-800">
                  Subscription Details
                </span>
                <span className="text-gray-400 font-medium">
                  Check below for subscriptions
                </span>
              </div>

              <button
                onClick={openModal}
                disabled={!!invoice_id}
                className="flex items-center gap-2 px-4 py-2 text-lg  rounded-xl text-emerald-600 font-bold bg-gray-100 relative disabled:cursor-not-allowed"
              >
                <Sliders size={24} />
                <span>Customize</span>
              </button>
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-40"
                  onClose={closeModal}
                >
                  <div className=" px-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-100"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="inline-block w-full max-w-md p-6 my-[29vh] ml-[28vw] text-left align-middle transition-all transform bg-white shadow-lg rounded-xl ring-1 ring-gray-200">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-semibold leading-6 text-gray-900"
                        >
                          Customize Invoice
                        </Dialog.Title>
                        <form
                          className="mt-6 grid grid-cols-2 gap-4"
                          onSubmit={handleSubmit((value) => {
                            setDiscount(+value.discount);
                            setVat(+value.vat);
                            const data = getInvoiceData(
                              +value.discount,
                              +value.vat
                            );
                            data && setInvoiceData(data);
                            closeModal();
                          })}
                        >
                          <PrimaryInput
                            min={0}
                            max={100}
                            label="Discount"
                            type="number"
                            placeholder="Enter Discount %"
                            {...register("discount")}
                          />
                          <PrimaryInput
                            min={0}
                            max={100}
                            label="VAT"
                            type="number"
                            placeholder="Enter VAT %"
                            {...register("vat")}
                          />
                          <div className="mt-2">
                            <Button buttonSize="small">Customize</Button>
                          </div>
                        </form>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
            </div>
            <div className="flex flex-col -mt-6">
              <div className="w-full border-t-[1px] border-b-[1px] border-gray-400/40 text-gray-500/70 flex p-4 text-lg gap-8">
                <span className="font-medium w-2/3">Subscription Name</span>

                <span className="font-medium w-1/5">Total Tests</span>
                <span className="font-medium w-1/5 ">Period</span>
                <span className="font-medium w-1/3 text-right">
                  Subscription Price
                </span>
              </div>
              <div className="w-full border-b-[1px] border-gray-400/40 flex items-center px-4 py-6 gap-8 text-lg">
                <div className="font-semibold flex flex-col gap-2 text-gray-800 w-2/3">
                  <span className="text-xl">
                    {selectedSubscription.plan.name}
                  </span>
                  <span className="text-gray-400 font-medium md:text-sm">
                    Acuity, Vitals, ECG, BMI, Urine, Glucose
                  </span>
                </div>

                <span className="font-semibold text-gray-700 w-1/5 ">
                  5 tests
                </span>
                <span className="font-semibold text-gray-700 w-1/5 ">
                  365 days
                </span>
                <span className="font-semibold text-gray-700 w-1/3 text-right">
                  Rs. {selectedSubscription?.plan?.price}
                </span>
              </div>
              <div className="w-full flex px-4 py-12 text-lg gap-8 md:flex-col-reverse md:relative">
                <div className="w-2/3 flex flex-col gap-4 md:w-full">
                  <div className="w-full flex item-center justify-between">
                    <span className="font-semibold text-xl text-gray-800">
                      Payment Information
                    </span>
                    <button
                      disabled
                      className="text-green-600 font-semibold disabled:cursor-not-allowed"
                    >
                      Select Payment
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-xl shadow-sm w-full p-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 pb-3">
                        Cash Payment
                      </span>
                      <div className="font-medium text-gray-500 pb-2">
                        Name:{" "}
                        <span className="font-semibold text-gray-600">
                          {selectedMember.name}{" "}
                        </span>
                      </div>
                      <div className="font-medium text-gray-500 pb-2">
                        Phone:{" "}
                        <span className="font-semibold text-gray-600">
                          {selectedMember.phone}{" "}
                        </span>
                      </div>
                      <div className="font-medium text-gray-500">
                        Payment Received:{" "}
                        <span className="font-semibold text-gray-600">
                          Rs. {invoiceData.net_amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-1/5 md:w-0" />

                <div className="w-1/5 md:w-full font-semibold text-gray-800 flex flex-col gap-4 md:absolute md:top-12">
                  <span className="font-semibold text-gray-800 ">
                    Sub Total
                  </span>
                  <div className="flex flex-col gap-4">
                    <span className="font-semibold text-gray-400 whitespace-nowrap">
                      Discount Amt.
                    </span>
                    <span className="font-semibold text-gray-400">
                      Total Tax
                    </span>
                  </div>
                  <span className="font-semibold mt-10 pt-6 border-t-[1px] md:border-0 border-gray-400/40 text-gray-400">
                    Total Amount
                  </span>
                </div>

                <div className="font-semibold flex flex-col text-gray-700 w-1/3 gap-4 text-right md:w-full  ">
                  <span> Rs. {invoiceData.gross_amount}</span>
                  <div className="flex flex-col gap-4">
                    <span className="font-semibold text-gray-700">
                      Rs. {invoiceData.discount_amount}
                    </span>
                    <span className="font-semibold text-gray-700">
                      Rs. {invoiceData.vat_amount}
                    </span>
                  </div>
                  <span className="font-semibold mt-10 pt-4 border-t-[1px] border-gray-400/40 text-gray-800 -ml-8 text-2xl">
                    Rs.{" "}
                    <span className="font-Inter">{invoiceData.net_amount}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 gap-8 flex flex-col md:w-full">
            <div className=" rounded-lg bg-white shadow-md p-6 flex flex-col gap-4">
              <span className="font-semibold text-xl text-gray-800">
                Customer Details
              </span>
              <div className="flex items-center ">
                <div className="relative h-20 w-20 cursor-pointer">
                  {selectedMember.image ? (
                    <div className="w-20 h-20 rounded-full object-contain overflow-hidden relative">
                      <Image
                        src={selectedMember.image}
                        layout="fill"
                        objectFit="cover"
                        alt="profile"
                      />
                    </div>
                  ) : (
                    <LetteredAvatar
                      name={selectedMember.name}
                      size="50"
                      round={true}
                      maxInitials={2}
                    />
                  )}
                </div>
                <div className="ml-4 flex flex-col gap-1">
                  <div className="text-[1.3rem] font-bold text-slate-800  capitalize cursor-pointer">
                    {selectedMember.name}
                  </div>
                  <a
                    href={`mailto: ${selectedMember.email}`}
                    className="text-lg font-medium text-gray-500 hover:text-gray-800"
                  >
                    {selectedMember.email}
                  </a>
                </div>
              </div>
              <hr className="border-t-[1px] border-gray-400/40" />
              <div className="flex flex-col">
                <span className="font-semibold text-xl text-gray-800">
                  Phone: {selectedMember.phone}
                </span>
                <span className="font-medium text-xl text-gray-400">
                  {selectedMember.address}
                </span>
              </div>
            </div>

            {selectedInvoice ? (
              <div className=" rounded-lg bg-white shadow-md p-6 flex flex-col gap-4">
                <div className="text-lg capitalize flex gap-1">
                  <span className="font-semibold text-gray-900">
                    Amount {paid ? "Paid" : "Due"}{" "}
                  </span>
                  <span className="font-medium text-gray-400">(NPR)</span>
                </div>
                <div className="text-xl capitalize flex items-end gap-1">
                  <span className="font-semibold text-3xl leading-7 font-Inter text-slate-900">
                    Rs. {invoiceData.net_amount}
                  </span>
                  <span className="font-medium text-base text-gray-400">
                    (Tax Incl.)
                  </span>
                </div>
                <div
                  className={`py-3 px-6 rounded-xl ${
                    paid
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }  text-lg font-semibold shadow-sm self-start`}
                >
                  {paid ? "Paid" : "Due"} on{" "}
                  {selectedInvoice && paid
                    ? moment
                        .unix(selectedInvoice.transaction_date / 1000)
                        .format("DD MMM YYYY")
                    : moment().add(15, "days").format("DD MMM YYYY")}
                </div>
                {!paid && user.id === 1 ? (
                  <>
                    <hr className="border-t-[1px] border-gray-400/40" />
                    <div>
                      <GrayButton
                        width="full"
                        onClick={() => {
                          invoice_id &&
                            putInvoiceAsPaidToast(selectedInvoice.id);
                        }}
                      >
                        Mark as Paid
                      </GrayButton>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
            {invoice_id ? null : (
              <PrimaryButton
                className="py-5 rounded-xl flex items-center justify-center text-xl"
                onClick={() => {
                  postInvoiceToast({
                    ...invoiceData,
                    member_id: selectedMember.id,
                    paid: 0,
                    subscription_detail: selectedSubscription,
                    transaction_date: Date.now(),
                    due_days: 15,
                  });
                }}
              >
                Generate Invoice
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
