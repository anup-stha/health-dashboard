/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 3/2/22, 5:17 PM
 *
 *
 */

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { toast } from "react-hot-toast";

import { useModal } from "./useModal";
import { Button as UIButton } from "../Button";

export type IModalProps = {
  title?: string;
  children: React.ReactNode;
  width?: "max-w-2xl" | "max-w-3xl" | "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl" | "max-w-8xl";
  opacity?: string;
  onClose?: () => void;
};

export const ModalContent: React.FC<IModalProps> = React.memo(
  ({ children, width = "max-w-3xl", opacity = "opacity-30", onClose }) => {
    const { setIsOpen, isOpen } = useModal();

    const closeModal = () => {
      onClose && onClose();
      setIsOpen(false);
    };

    return (
      <Transition appear show={isOpen} as={Fragment} data-testid="modal">
        <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModal}>
          <Dialog.Overlay className={`fixed inset-0 bg-black ${opacity}`} />
          <div className="min-h-screen md:px-16 sm:px-4 text-center">
            <Transition.Child as={Fragment}>
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
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
                className={`inline-block w-full ${width} px-8 py-6 sm:px-4 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl`}
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

ModalContent.displayName = "ModalContent";

export interface IButtonProps {
  type: "close" | "open";
  children: React.ReactNode;
  onClick?: any;
  width?: "full" | "auto";
  async?: boolean;
  variant?: "button" | "div" | "icon";
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({ children, type, onClick, width, variant, async, disabled }) => {
  const { setIsOpen } = useModal();

  const onClickFn = async (e: any) => {
    e.preventDefault();
    await onClick().then(() => setIsOpen(false));
  };

  if (async === true)
    return (
      <UIButton
        data-testid="modal_close_btn"
        disabled={disabled}
        onClick={async (e) => await onClick(e).then(() => setIsOpen(false))}
        type="submit"
      >
        {children}
      </UIButton>
    );

  return variant === "button" ? (
    <UIButton
      type="submit"
      disabled={disabled}
      onSubmit={onClick ? (e: any) => onClickFn(e) : () => (type === "open" ? setIsOpen(true) : setIsOpen(false))}
    >
      {children}
    </UIButton>
  ) : !disabled ? (
    <div
      onClick={onClick ? (e) => onClickFn(e) : () => (type === "open" ? setIsOpen(true) : setIsOpen(false))}
      className={`w-${width}`}
    >
      {children}
    </div>
  ) : (
    <div className={`w-${width}`}>{children}</div>
  );
};

export interface IModalTitleProps {
  children: React.ReactNode;
}

export const ModalTitle: React.FC<IModalTitleProps> = ({ children }) => {
  return <div className="text-4xl font-medium text-primary_gray-900">{children}</div>;
};

export interface IScrollableProps {
  children: React.ReactNode;
}

export const Scrollable: React.FC<IScrollableProps> = ({ children }) => {
  return <div className="overflow-y-auto max-h-[50vh] px-2 pb-4 scrollbar-1 z-[-1]">{children}</div>;
};

export interface IModalFormProps {
  onSubmit: (e?: any) => Promise<any>;
  children: React.ReactNode;
  className?: string;
  encType?: string;
}

export const Form: React.FC<IModalFormProps> = React.memo(({ onSubmit, children, encType, className }) => {
  const { setIsOpen } = useModal();

  const onSubmitFn = async (e: any) => {
    e.preventDefault();
    try {
      await onSubmit();
      setIsOpen(false);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <form onSubmit={(e) => onSubmitFn(e)} className={className ?? `space-y-8`} encType={encType}>
      {children}
    </form>
  );
});

export const AsyncForm: React.FC<IModalFormProps> = React.memo(({ onSubmit, children, encType, className }) => {
  const { setIsOpen } = useModal();

  const onSubmitFn = async (e: any) => {
    e.preventDefault();
    try {
      await onSubmit();
    } catch (e) {
      toast.error(e.message);
      return;
    }
    setIsOpen(false);
  };

  return (
    <form onSubmit={(e) => onSubmitFn(e)} className={className ?? `space-y-8`} encType={encType}>
      {children}
    </form>
  );
});

AsyncForm.displayName = "AsyncForm";
Form.displayName = "Form";
