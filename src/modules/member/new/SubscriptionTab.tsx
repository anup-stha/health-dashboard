/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/16/22, 2:41 PM
 *
 *
 */

import React from "react";
import {
  assignSubscriptionToMember,
  removeSubscriptionFromMember,
  useMemberSubsDetails,
  useSubscriptionList,
} from "@/services/requests/subscriptionRequests";
import { Loader } from "@/components/Loader";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import isEmpty from "lodash/isEmpty";
import { WarningOctagon } from "phosphor-react";
import { SubscriptionDropdown } from "@/modules/member/modal/memberSubscriptionModal";
import { Button, GrayButton, WarningButton } from "@/components/Button";
import { alert } from "@/components/Alert";
import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { useMemberStore } from "@/modules/member/utils/useMemberStore";
import { useRouter } from "next/router";
import { SubscriptionChart } from "@/modules/member/others/SubscriptionChart";
import moment from "moment";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "react-feather";
import { InvoiceHistory } from "@/modules/member/invoice/InvoiceHistory";
import { DeleteModal } from "@/components/Modal/DeleteModal";

interface ISubscriptionTab {
  member_id: number;
  role_id: number;
}

/**
 *
 * @param {number} role_id - id of role of selected member
 * @param {number} member_id - id of member in member list or member_id if it's there
 * @return {JSX.Element}
 */
export function SubscriptionTab({ member_id, role_id }: ISubscriptionTab) {
  const router = useRouter();
  const { isLoading, data } = useMemberSubsDetails(member_id);
  const { isLoading: subsLoading } = useSubscriptionList(role_id);
  const user = useAuthStore((state) => state.user);
  const { subscriptionList, selectedSubscription } = useSubscriptionStore();
  const { selectedMemberSubscription } = useMemberStore();
  const { start_date, end_date } = selectedMemberSubscription;

  console.log(data);

  if (isLoading || subsLoading) return <Loader />;

  return (
    <div className="flex items-start gap-4">
      <div className="bg-white w-2/3 rounded-2xl shadow-sm p-8 flex flex-col relative">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Member Subscriptions
            </h1>
          </div>
          <div className="h-[0.4px] bg-slate-200 -mx-8" />
          {isEmpty(selectedMemberSubscription) ? (
            <>
              {(subscriptionList.list.length === 0 || user.id !== 1) &&
              isEmpty(selectedSubscription) ? (
                <div className="print:hidden flex items-center text-red-500 space-x-4">
                  <WarningOctagon size={40} />{" "}
                  {user.id === 1 ? (
                    <span className={"font-semibold"}>
                      No Subscription Found. Please add a subscription to this
                      role{" "}
                      <span
                        onClick={() => router.push("/subscriptions")}
                        className="cursor-pointer"
                      >
                        here
                      </span>
                    </span>
                  ) : (
                    <span className={"font-semibold"}>
                      No Subscription Found. Please contact Sunya Health
                      Administrator
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center  space-x-4 w-full">
                    <div className={"w-[58%]"}>
                      <SubscriptionDropdown />
                    </div>
                    <div className={"w-1/2"}>
                      <GrayButton
                        onClick={async () => {
                          await alert({
                            promise: assignSubscriptionToMember(
                              Number(member_id),
                              Number(selectedSubscription.id)
                            ),
                            msgs: {
                              loading: "Assigning Subscription",
                            },
                            id: "assign-subscription",
                          });
                        }}
                      >
                        Link
                      </GrayButton>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="mt-1">
                <div className="flex flex-col">
                  <div className="flex items-center -translate-x-14 -translate-y-4">
                    <SubscriptionChart
                      start_date={start_date}
                      end_date={end_date}
                    />
                    <div className="flex flex-col space-y-4 ">
                      <h1 className="text-3xl font-semibold text-gray-800">
                        {selectedSubscription.name}
                      </h1>
                      <div className="flex flex-col space-y-1">
                        <div className="flex align-baseline gap-2">
                          <span className="text-xl font-medium text-gray-400">
                            Duration:
                          </span>
                          <span className="text-xl font-semibold text-gray-600">
                            {" "}
                            {moment(
                              selectedMemberSubscription.start_date * 1000
                            ).format("MMM Do, YYYY")}{" "}
                            -{" "}
                            {moment(
                              selectedMemberSubscription.end_date * 1000
                            ).format("MMM Do, YYYY")}{" "}
                          </span>
                        </div>

                        <div className="flex align-baseline gap-2">
                          <span className="text-xl font-medium text-gray-400">
                            Paid Price:
                          </span>
                          <span className="text-xl font-semibold text-gray-600">
                            {selectedSubscription.price}{" "}
                            {selectedSubscription.currency}
                          </span>
                        </div>
                        <div className="flex align-baseline gap-2">
                          <span className="text-xl font-medium text-gray-400">
                            Grace Period:
                          </span>
                          <span className="text-xl font-semibold text-gray-600">
                            {selectedSubscription.grace_period} days
                          </span>
                        </div>
                        <div className="flex align-baseline gap-2">
                          <span className="text-xl font-medium text-gray-400">
                            Test Limits:
                          </span>
                          <span className="text-xl font-semibold text-gray-600">
                            {selectedSubscription.test_limit} times
                          </span>
                        </div>
                      </div>
                      <div className="self-start">
                        <Button
                          buttonSize="small"
                          onClick={() => {
                            router.push("/member/org_admin/invoice");
                          }}
                        >
                          Get New Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="h-[0.4px] -mx-4 bg-slate-200 " />

                  <div className="flex flex-col space-y-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      Tests Included In This Subscription
                    </h1>
                    <div className={"text-lg grid grid-cols-2 gap-4"}>
                      {selectedMemberSubscription.plan.test_categories.map(
                        (category) => (
                          <div
                            className="self-start py-2 px-6 bg-gray-100 w-full text-lg rounded-lg flex flex-col items-start sm:w-full sm:items-center"
                            key={category.id}
                          >
                            <Disclosure>
                              <Disclosure.Button className="py-2 w-full flex items-center justify-between font-semibold text-xl tracking-wider capitalize text-gray-800">
                                {category.name}
                                <span>
                                  <ChevronDown />
                                </span>
                              </Disclosure.Button>
                              <Disclosure.Panel>
                                <div
                                  className={"flex flex-wrap gap-x-4 gap-y-2"}
                                >
                                  {category.sub_categories.map(
                                    (sub_category) => (
                                      <span
                                        key={sub_category.id}
                                        className="text-gray-500 font-medium text-lg text-gray-500 line-clamp-1 capitalize  "
                                      >
                                        {sub_category.name}
                                      </span>
                                    )
                                  )}
                                </div>
                              </Disclosure.Panel>
                            </Disclosure>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="h-[0.4px] -mx-4 bg-slate-200 " />
                  <div className="self-end pt-4">
                    {user.id === 1 && (
                      <>
                        <DeleteModal
                          disabled={false}
                          subTitles={[
                            "Please be careful. If you unlink, this member will lose access to everything.",
                          ]}
                          closeButton={
                            <WarningButton>Unlink Subscription</WarningButton>
                          }
                          title={"You are about to unlink an subscription"}
                          onDelete={async () => {
                            await alert({
                              type: "promise",
                              promise: removeSubscriptionFromMember(
                                Number(member_id)
                              ),
                              msgs: {
                                loading: "Removing",
                              },
                              id: "remove-subs",
                            });
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-1/3 flex-col">
        <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col relative">
          <InvoiceHistory member_id={member_id} />
        </div>
      </div>
    </div>
  );
}