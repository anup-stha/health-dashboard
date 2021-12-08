import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";
import React, { useState } from "react";
import { Edit } from "react-feather";
import { NormalMemberAddForm } from "../form/NormalMemberAddForm";
import { OrgMemberAddForm } from "../form/OrgMemberAddForm";
import { memberStore } from "../memberStore";

interface MemberModalProps {
  type: "add" | "update";
  orgId?: number | string;
}

export const MemberModal: React.FC<MemberModalProps> = ({ type }) => {
  const { id, name } = memberStore.getState().selectedRole;
  const tabs = ["normal", "org"];
  const [selectedTab, setSelectedTab] = useState<string>("normal");

  return (
    <>
      <Modal>
        <Modal.Button type="open">
          {type === "add" ? (
            <Button disabled={id === 0}>Add {id !== 0 && name} User</Button>
          ) : (
            <Edit
              name="edit"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
          )}
        </Modal.Button>

        <Modal.Content>
          <Modal.Title>Add {name} User</Modal.Title>
          <div className="flex flex-col space-y-4 ">
            <div className="w-full flex relative">
              {tabs.map((tab) => (
                <div
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`cursor-pointer text-xl font-medium flex border-gray-800 transition-all duration-200`}
                >
                  <div
                    className={`transition-all duration-200  ${
                      selectedTab === tab
                        ? "border-b-4 py-2 border-green-600 h-full font-semibold mr-8 text-gray-600"
                        : "pr-8 py-2 text-gray-500"
                    }`}
                  >
                    {tab === "org" ? "Organisation User " : "Normal User"}
                  </div>
                </div>
              ))}
              <div className="w-full h-0.5 bg-gray-100 absolute bottom-0 z-[-1]"></div>
            </div>

            {selectedTab === "org" ? (
              <OrgMemberAddForm />
            ) : (
              <NormalMemberAddForm />
            )}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
