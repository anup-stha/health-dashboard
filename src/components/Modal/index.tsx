import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "./useModal";

export type IModalProps = {
  title?: string;
  children: React.ReactNode;
  width?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl";
};

export const ModalContent: React.FC<IModalProps> = ({
  title,
  children,
  width = "3xl",
}) => {
  const { setIsOpen, isOpen } = useModal();

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
            enterFrom="opacity-0 scale-95 -translate-y-32"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-90 -translate-y-32"
          >
            <div
              className={`trans inline-block w-full max-w-${width} px-10 py-10 sm:px-8 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export interface IButtonProps {
  type: "close" | "open";
  children: React.ReactNode;
  onClick?: any;
}

export const Button: React.FC<IButtonProps> = ({ children, type, onClick }) => {
  const { setIsOpen } = useModal();

  const onClickFn = async () => {
    await onClick().then(() => setIsOpen(false));
  };

  return (
    <span
      onClick={
        onClick
          ? () => onClickFn()
          : () => (type === "open" ? setIsOpen(true) : setIsOpen(false))
      }
    >
      {children}
    </span>
  );
};

export interface IModalTitleProps {
  children: React.ReactNode;
}

export const ModalTitle: React.FC<IModalTitleProps> = ({ children }) => {
  return (
    <div className="text-4xl font-medium tracking-wider text-gray-900">
      {children}
    </div>
  );
};
