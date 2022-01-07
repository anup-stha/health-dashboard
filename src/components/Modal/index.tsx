/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/7/22, 6:18 PM
 *
 *
 */

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModal } from "./useModal";
import { Button as UIButton } from "../Button";
import toast from "react-hot-toast";

export type IModalProps = {
  title?: string;
  children: React.ReactNode;
  width?: "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl";
};

export const ModalContent: React.FC<IModalProps> = ({
  children,
  width = "3xl",
}) => {
  const { setIsOpen, isOpen } = useModal();

  const closeModal = () => setIsOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModal}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="min-h-screen md:px-16 sm:px-4 text-center">
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
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95 -translate-y-32"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-90 -translate-y-32"
          >
            <div
              className={`trans inline-block w-full max-w-7xl px-10 py-10 sm:px-8 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl`}
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
  width?: "full" | "auto";
  async?: boolean;
  variant?: "button" | "div" | "icon";
}

export const Button: React.FC<IButtonProps> = ({
  children,
  type,
  onClick,
  width,
  variant,
  async,
}) => {
  const { setIsOpen } = useModal();

  const onClickFn = async (e: any) => {
    console.log(e);
    e.preventDefault();
    await onClick().then(() => setIsOpen(false));
  };

  if (async === true)
    return (
      <UIButton
        onClick={async (e) => await onClick(e).then(() => setIsOpen(false))}
        type="submit"
        buttonSize="small"
      >
        {children}
      </UIButton>
    );

  return variant === "button" ? (
    <UIButton
      type="submit"
      buttonSize="small"
      onSubmit={
        onClick
          ? (e: any) => onClickFn(e)
          : () => (type === "open" ? setIsOpen(true) : setIsOpen(false))
      }
    >
      {children}
    </UIButton>
  ) : (
    <div
      onClick={
        onClick
          ? (e) => onClickFn(e)
          : () => (type === "open" ? setIsOpen(true) : setIsOpen(false))
      }
      className={`w-${width}`}
    >
      {children}
    </div>
  );
};

export interface IModalTitleProps {
  children: React.ReactNode;
}

export const ModalTitle: React.FC<IModalTitleProps> = ({ children }) => {
  return <div className="text-4xl font-medium text-gray-900">{children}</div>;
};

export interface IScrollableProps {
  children: React.ReactNode;
}

export const Scrollable: React.FC<IScrollableProps> = ({ children }) => {
  return (
    <div className="overflow-y-scroll max-h-[50vh] p-0.5 sidebar">
      {children}
    </div>
  );
};

export interface IModalFormProps {
  onSubmit: () => Promise<any>;
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<IModalFormProps> = ({
  onSubmit,
  children,
  className,
}) => {
  const { setIsOpen } = useModal();

  const onSubmitFn = async (e: any) => {
    e.preventDefault();
    await onSubmit()
      .then(() => setIsOpen(false))
      .catch((error) => {
        error.message && toast.error(error.message);
      });
  };

  return (
    <form onSubmit={(e) => onSubmitFn(e)} className={className ?? `space-y-8`}>
      {children}
    </form>
  );
};
