/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/27/22, 3:48 PM
 *
 *
 */
import { Dialog, Transition } from "@headlessui/react";
import { WarningOctagon, X } from "phosphor-react";
import React, { Fragment, useState } from "react";

export const UnVerifiedModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Transition appear show={isOpen} as={Fragment} data-testid="modal">
      <Dialog as="div" className="fixed inset-0 z-50" onClose={() => setIsOpen(false)} open={true}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
        <div className="min-h-screen md:px-16 sm:px-4 text-center">
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-top" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95 -translate-y-32"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-90 -translate-y-32"
          >
            <div className="w-full   inline-block w-full max-w-2xl mt-8 px-4 py-4 sm:px-4 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-sm">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4 w-3/4 ">
                  <div className="text-red-500">
                    <WarningOctagon size={48} weight="light" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-red-600 font-medium text-2xl">Verification Error</div>
                    <div className="text-gray-500 font-regular text-lg">
                      You haven&apos;t been verified yet. Please contact Sunya Health to get verified.
                    </div>
                  </div>
                </div>
                <div className="text-gray-500 cursor-pointer" onClick={() => setIsOpen(false)}>
                  <X size={32} />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
