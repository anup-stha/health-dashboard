/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/7/22, 12:52 PM
 *
 *
 */

import React, { useMemo, useState } from "react";

import {
  Button,
  Form,
  IButtonProps,
  IModalFormProps,
  IModalProps,
  IModalTitleProps,
  IScrollableProps,
  ModalContent,
  ModalTitle,
  Scrollable,
} from ".";

interface IModalContext {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface IModalComposition {
  Content: React.FC<IModalProps>;
  Button: React.FC<IButtonProps>;
  Title: React.FC<IModalTitleProps>;
  Scrollable: React.FC<IScrollableProps>;
  Form: React.FC<IModalFormProps>;
}

export const ModalContext = React.createContext<IModalContext | undefined>(
  undefined
);

interface IModalContainerProps {
  open?: boolean;
}

const Modal: React.FC<IModalContainerProps> & IModalComposition = (props) => {
  const [isOpen, setIsOpen] = useState(props.open ?? false);
  const memoizedContextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen]
  );

  return (
    <ModalContext.Provider value={memoizedContextValue}>
      {props.children}
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalContext => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("This component must be used within a <Modal> component.");
  }
  return context;
};

Modal.Content = ModalContent;
Modal.Button = Button;
Modal.Title = ModalTitle;
Modal.Scrollable = Scrollable;
Modal.Form = Form;

export { Modal };
