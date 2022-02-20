/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/16/22, 2:39 PM
 *
 *
 */

import { TrashSimple } from "phosphor-react";
import React from "react";
import { Trash } from "react-feather";

import { Modal } from "./useModal";
import { WarningButton } from "../Button";

type DeleteModalProps = {
  onDelete?: () => void;
  title?: string;
  subTitles?: string[];
  closeButton?: React.ReactNode;
  disabled?: boolean;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  onDelete,
  title,
  subTitles,
  closeButton,
  disabled = true,
}) => {
  return (
    <Modal>
      {!disabled ? (
        <Modal.Button type="open">
          <div className={`${disabled && "cursor-not-allowed"}`}>
            {closeButton ?? (
              <Trash
                name="delete"
                className="text-gray-400 hover:text-gray-800"
              />
            )}
          </div>
        </Modal.Button>
      ) : (
        closeButton ?? (
          <Trash name="delete" className="text-gray-400 hover:text-gray-800" />
        )
      )}

      <Modal.Content width="max-w-3xl">
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
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
              <div className="p-4 text-xl font-bold text-gray-500 hover:text-gray-700 cursor-pointer">
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
