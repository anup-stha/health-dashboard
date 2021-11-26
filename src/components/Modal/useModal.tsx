import React, { useMemo, useState } from "react";
import { Button, IButtonProps, IModalProps, ModalContainer } from ".";

interface IModalContext {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface IModalComposition {
  Container: React.FC<IModalProps>;
  Button: React.FC<IButtonProps>;
}

const ModalContext = React.createContext<IModalContext | undefined>(undefined);

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

Modal.Container = ModalContainer;
Modal.Button = Button;

export { Modal };
