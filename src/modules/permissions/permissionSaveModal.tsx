import { Button, GrayButton } from "@/components/Button";
import Image from "next/image";
import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { permissions } from ".";

type PermissionSaveModalPropType = {
  modalOpenButton: React.ReactNode;
};

const PermissionSaveModal: React.FC<PermissionSaveModalPropType> = ({
  modalOpenButton,
}) => {
  return (
    <Modal>
      <Modal.Button type="open">{modalOpenButton}</Modal.Button>
      <Modal.Content width="6xl">
        <div className="space-y-2">
          <Modal.Title>Save Permission</Modal.Title>
          <p className="text-xl font-semibold text-gray-500">
            You are about to save the following permissions
          </p>
        </div>
        <Modal.Scrollable>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-6 ">
            {permissions.map((permission) => (
              <div
                className="flex items-center justify-center h-full space-x-4  p-4 shadow-E500 rounded-sm"
                key={permission.id}
              >
                <div>
                  <Image
                    src="/assets/permission1.png"
                    alt={permission.name}
                    width={64}
                    height={64}
                    objectFit="cover"
                    layout="fixed"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl text-gray-850 font-semibold line-clamp-1">
                    {permission.name}
                  </span>
                  <span className="text-base text-gray-500 font-medium w-4/5 line-clamp-3">
                    {permission.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Modal.Scrollable>
        <div className="flex space-x-2">
          <Modal.Button type="close">
            <Button>Save Permissions</Button>
          </Modal.Button>
          <Modal.Button type="close">
            <GrayButton>Cancel</GrayButton>
          </Modal.Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default PermissionSaveModal;
