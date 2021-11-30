import React, { useMemo, useState } from "react";
import {
  Button,
  IButtonProps,
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
}

export const ModalContext = React.createContext<IModalContext | undefined>(
  undefined
);

const Modal: React.FC & IModalComposition = (props) => {
  const [isOpen, setIsOpen] = useState(false);
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

export { Modal };
