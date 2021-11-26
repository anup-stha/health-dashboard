import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "./useModal";

export type IModalProps = {
  title?: string;
  children: React.ReactNode;
};

export const ModalContainer: React.FC<IModalProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="min-h-screen md:px-16 text-center">
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-3xl p-10 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-4xl font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export interface IButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({ children }) => {
  const { setIsOpen } = useModal();

  return <button onClick={() => setIsOpen(true)}>{children}</button>;
};
