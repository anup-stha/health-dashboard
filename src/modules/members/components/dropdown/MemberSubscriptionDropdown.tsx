/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const SubscriptionDropdown = ({ rolId }: any) => {
  const subscriptionList = useSubscriptionStore
    .getState()
    .subscriptionList.list.sort((a, b) => a.name.localeCompare(b.name));

  const { selectedSubscription: selected, setSubscription: setSelected } = useSubscriptionStore();

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-4 pr-12 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-xl">
              <span className="flex items-center">
                <span className="ml-3 block truncate font-medium text-gray-700 capitalize">
                  {Object.keys(selected).length !== 0 ? selected.name : "Choose a subscription"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-lg">
                {subscriptionList.map((subscription) => (
                  <Listbox.Option
                    key={subscription.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-gray-600" : "text-gray-900",
                        "cursor-pointer select-none relative py-4 pl-3 pr-9"
                      )
                    }
                    value={subscription}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-medium" : "font-normal",
                              "ml-3 block truncate capitalize"
                            )}
                          >
                            {subscription.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
