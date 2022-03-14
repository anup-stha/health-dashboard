/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 10:03 AM
 *
 *
 */

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";

export interface ListBoxProps {
  items: Array<any>;
  selected: string | number;
  setSelected: React.Dispatch<React.SetStateAction<string | number>>;
  onlyMobile?: boolean;
}

export const ListBox: React.FC<ListBoxProps> = ({ items, selected, setSelected, onlyMobile = false }) => {
  const [defaultSelected, setDefaultSelected] = useState(items[0]);

  // Default States for Storybook
  selected = !selected ? defaultSelected : selected;
  setSelected = !setSelected ? setDefaultSelected : setSelected;

  return (
    <div className={`w-1/3 p-4 pl-0 ${onlyMobile && "sm:block hidden"} `}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className=" relative w-full py-4 pl-4 pr-10 text-left bg-white rounded-sm cursor-default shadow-E200 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-lg">
            <span className="block capitalize truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-primary_gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute w-full py-1 mt-4 overflow-auto text-base bg-white rounded-sm shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg">
              {items.map((item: any, itemIdx: any) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `${active ? "text-primary_gray-800 bg-primary_gray-100" : "text-primary_gray-900"}
                          cursor-default select-none relative py-2 pl-10 pr-4 `
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? "font-medium" : "font-normal"} block capitalize`}>{item}</span>
                      {selected ? (
                        <span
                          className={`${active ? "text-amber-600" : "text-amber-600"}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
