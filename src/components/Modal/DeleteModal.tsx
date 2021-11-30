import { TrashSimple } from "phosphor-react";
import React from "react";
import { Trash } from "react-feather";
import { WarningButton } from "../Button";
import { Modal } from "./useModal";

type DeleteModalProps = {
  onDelete?: () => void;
  title?: string;
  subTitles?: string[];
  closeButton?: React.ReactNode;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onDelete,
  title,
  subTitles,
  closeButton,
}) => {
  return (
    <Modal>
      <Modal.Button type="open">
        {closeButton ?? (
          <Trash
            name="delete"
            className="text-gray-400 cursor-pointer hover:text-gray-800"
          />
        )}
      </Modal.Button>
      <Modal.Content width="3xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-8xl text-red-500">
            <TrashSimple />
          </div>

          <div className="space-y-1 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-black text-center">
              {title ?? "You are about to delete a organisation"}
            </h1>
            <div className="text-center text-xl font-semibold text-gray-500 space-y-1">
              {subTitles &&
                subTitles.map((subtitle) => <p key={subtitle}> {subtitle} </p>)}
            </div>
          </div>

          <div className="flex space-x-4 self-end pt-2">
            <Modal.Button type="close">
              <div className="p-4 text-xl font-bold text-gray-500 hover:text-gray-700">
                Cancel
              </div>
            </Modal.Button>
            <Modal.Button type="close">
              <WarningButton onClick={() => onDelete && onDelete()}>
                Delete
              </WarningButton>
            </Modal.Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
