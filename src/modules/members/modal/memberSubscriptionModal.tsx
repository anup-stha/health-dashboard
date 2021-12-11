/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { useSubscriptionStore } from "@/modules/subscriptions/subscriptionStore";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

export const SubscriptionDropdown = ({ rolId }: any) => {
  const subscriptionList = useSubscriptionStore
    .getState()
    .subscriptionList.map((element) => ({
      id: element.id,
      name: element.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const { selectedSubscription: selected, setSubscription: setSelected } =
    useSubscriptionStore();

  return (
    <div className="w-64 capitalize z-50">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-[1.125rem] px-6 text-left bg-white rounded-sm shadow-E500 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-green-500 text-xl font-semibold text-gray-500">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-2 overflow-auto text-lg bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {subscriptionList.map((role) => (
                <Listbox.Option
                  key={role.id}
                  className={({ active }) =>
                    `${active ? "text-green-900 bg-green-100" : "text-gray-900"}
                          cursor-default select-none relative py-4 pl-10 pr-4`
                  }
                  value={role}
                >
                  {({ selected, active }) => {
                    return (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate capitalize`}
                        >
                          {role.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-green-600" : "text-green-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
