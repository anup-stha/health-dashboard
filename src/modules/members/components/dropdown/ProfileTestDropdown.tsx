/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 12:15 PM
 *
 *
 */

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

import { Test } from "@/types";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

interface ITestDropdown {
  testList: Test[];
  selectedTest: Test;
  setSelectedTest: (testList: Test) => void;
}

export const ProfileTestDropdown = ({
  testList,
  selectedTest,
  setSelectedTest,
}: ITestDropdown) => {
  return (
    <Listbox value={selectedTest} onChange={setSelectedTest}>
      {({ open }) => (
        <>
          <div className="relative w-80 print:hidden z-20">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-4 pr-12 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-xl">
              <span className="flex items-center">
                <span className="ml-3 block truncate font-semibold text-gray-700 capitalize">
                  {selectedTest && Object.keys(selectedTest).length !== 0
                    ? selectedTest.name
                    : "Please choose a test"}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-2 text-lg  ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                {testList.map((test) => (
                  <Listbox.Option
                    key={test.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-gray-600" : "text-gray-900",
                        "cursor-pointer select-none relative py-4 pl-3 pr-9 font-medium"
                      )
                    }
                    value={test}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate capitalize"
                            )}
                          >
                            {test.name}
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
