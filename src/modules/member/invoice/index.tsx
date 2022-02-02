/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/2/22, 11:31 PM
 *
 *
 */

import { useAuthStore } from "@/modules/auth/useTokenStore";
import Image from "next/image";
import LetteredAvatar from "react-avatar";
import React from "react";
import { useCurrentMemberStore } from "@/modules/member/utils/useCurrentMemberStore";
import { Sliders } from "phosphor-react";
import { PrimaryButton } from "@/components/Button";

export const MemberInvoicePage = () => {
  const user = useAuthStore((state) => state.user);
  const selectedMember = useCurrentMemberStore((state) => state.member);

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="w-full flex items-start gap-x-8">
        <div className=" rounded-lg bg-white w-3/4 shadow-md p-8 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <div className="relative h-20 w-20 cursor-pointer">
                {user.image ? (
                  <div
                    className={`w-20 h-20 rounded-full object-contain overflow-hidden relative`}
                  >
                    <Image
                      src={user.image}
                      layout={"fill"}
                      objectFit={"cover"}
                      alt={"profile"}
                    />
                  </div>
                ) : (
                  <LetteredAvatar
                    name={user.name}
                    size={"50"}
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
                  href={`mailto: contact@sunya.health`}
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
          <div className="bg-emerald-600 rounded-xl text-white w-full text-lg p-10 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <span className={"font-semibold"}>Invoice Number</span>
              <span>INV-2022-010</span>
              <div className="flex gap-1">
                <span className="text-gray-100">Issued Date:</span>
                <span>11 Jan 2022</span>
              </div>
              <div className="flex gap-1">
                <span className="text-gray-100">Due Date:</span>
                <span>22 Jan 2022</span>
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
                Check below for details.
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-lg  rounded-xl text-emerald-600 font-bold bg-gray-100">
              <Sliders size={24} />
              <span>Customize</span>
            </button>
          </div>
          <div className="flex flex-col -mt-6">
            <div className="w-full border-t-[1px] border-b-[1px] border-gray-400/40 text-gray-500 flex p-4 text-lg gap-8">
              <span className="font-medium w-2/3">Subscription Name</span>

              <span className="font-medium w-1/5">Total Tests</span>
              <span className="font-medium w-1/5 ">Period</span>
              <span className="font-medium w-1/3">Price</span>
            </div>
            <div className="w-full border-b-[1px] border-gray-400/40 flex items-center px-4 py-6 text-lg gap-8">
              <div className="font-semibold flex flex-col gap-2 text-gray-700 w-2/3">
                <span>Organization Yearly Subscription </span>
                <span className="text-gray-400 font-medium">
                  Acuity, Vitals, ECG, BMI, Urine, Glucose
                </span>
              </div>

              <span className="font-semibold text-gray-700 w-1/5">5 tests</span>
              <span className="font-semibold text-gray-700 w-1/5 ">
                365 days
              </span>
              <span className="font-semibold text-gray-700 w-1/3">
                Rs. 100000.00
              </span>
            </div>
            <div className=" w-full flex px-4 py-12 text-lg gap-8">
              <div className="w-2/3 flex flex-col gap-4">
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
                  <div className={"flex flex-col"}>
                    <span className="font-semibold text-gray-800 pb-3">
                      Cash Payment
                    </span>
                    <div className="font-medium text-gray-500 pb-2">
                      Name:{" "}
                      <span className={"font-semibold text-gray-600"}>
                        {selectedMember.name}{" "}
                      </span>
                    </div>
                    <div className="font-medium text-gray-500 pb-2">
                      Phone:{" "}
                      <span className={"font-semibold text-gray-600"}>
                        {selectedMember.phone}{" "}
                      </span>
                    </div>
                    <div className="font-medium text-gray-500">
                      Payment Received:{" "}
                      <span className={"font-semibold text-gray-600"}>
                        Rs. 100000/-
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="w-1/5" />

              <div className="w-1/5 font-semibold text-gray-800 flex flex-col  gap-4">
                <span className="font-semibold text-gray-800 ">Sub Total</span>
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-gray-400">
                    Discount Amt.
                  </span>
                  <span className="font-semibold text-gray-400">Total Tax</span>
                </div>
                <span className="font-semibold mt-10 pt-6 border-t-[1px] border-gray-400/40 text-gray-400">
                  Total Amount
                </span>
              </div>

              <div className="font-semibold flex flex-col text-gray-700 w-1/3 gap-4 text-right  ">
                <span> Rs. 100000.00</span>
                <div className="flex flex-col gap-4">
                  <span className="font-semibold text-gray-700">Rs. 25</span>
                  <span className="font-semibold text-gray-700">Rs. 1400</span>
                </div>
                <span className="font-semibold mt-10 pt-4 border-t-[1px] border-gray-400/40 text-gray-800 -ml-8 text-2xl font-Inter">
                  Rs. 1001425
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/4 gap-8 flex flex-col ">
          <div className=" rounded-lg bg-white shadow-md p-6 flex flex-col gap-4">
            <span className="font-semibold text-xl text-gray-800">
              Customer Details
            </span>
            <div className="flex items-center ">
              <div className="relative h-20 w-20 cursor-pointer">
                {selectedMember.image ? (
                  <div
                    className={`w-20 h-20 rounded-full object-contain overflow-hidden relative`}
                  >
                    <Image
                      src={selectedMember.image}
                      layout={"fill"}
                      objectFit={"cover"}
                      alt={"profile"}
                    />
                  </div>
                ) : (
                  <LetteredAvatar
                    name={selectedMember.name}
                    size={"50"}
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
          <PrimaryButton className="py-5 rounded-xl flex items-center justify-center text-xl">
            Send Invoice
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
