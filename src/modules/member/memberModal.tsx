import React, { Fragment, useState } from "react";

// import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";

import { OrganisationIntialFormDataType } from "@/modules/member";
import { Modal } from "@/components/Modal/useModal";
import { useForm } from "react-hook-form";
import { HookInput } from "@/components/Input";
import { alert } from "@/components/Alert";
import {
  postNormalMember,
  postOrgMember,
} from "@/services/requests/memberRequests";
import { memberStore } from "./memberStore";
import { Edit } from "react-feather";

interface MemberModalProps {
  type: "add" | "update";
  initialValues?: OrganisationIntialFormDataType;
  orgId?: number | string;
}

export const MemberModal: React.FC<MemberModalProps> = ({ type }) => {
  const { register, handleSubmit, reset } = useForm();
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
                    {tab === "normal" ? "Normal User" : "Organisation User"}
                  </div>
                </div>
              ))}
              <div className="w-full h-0.5 bg-gray-100 absolute bottom-0 z-[-1]"></div>
            </div>

            {selectedTab === "normal" ? (
              <form className="space-y-8">
                <div className="space-y-4">
                  <HookInput
                    label="Name"
                    type="text"
                    placeholder="Enter Name"
                    {...register("name")}
                  />
                  <HookInput
                    label="Address"
                    type="text"
                    placeholder="Enter Address"
                    {...register("address")}
                  />
                  <HookInput
                    label="Phone"
                    type="text"
                    placeholder="Enter Phone"
                    {...register("phone")}
                  />
                  <HookInput
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                  />
                  <HookInput
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    {...register("password")}
                  />
                </div>
                <Modal.Button
                  type="close"
                  variant="button"
                  onClick={handleSubmit(async (data) => {
                    console.log(data);
                    await alert({
                      promise: postNormalMember({
                        name: data.name,
                        address: data.address,
                        email: data.email,
                        password: data.password,
                        phone: data.phone,
                        role_id: id,
                      }).then(() => reset()),
                      msgs: {
                        loading: "Adding Member",
                        success: "Added Successfully",
                      },
                      id: "Login Toast",
                    });
                  })}
                >
                  Add User
                </Modal.Button>
              </form>
            ) : (
              <OrgMemberAddForm />
            )}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const OrgMemberAddForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = memberStore.getState().selectedRole;

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <HookInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        <HookInput
          label="Address"
          type="text"
          placeholder="Enter Address"
          {...register("address")}
        />
        <HookInput
          label="Phone"
          type="text"
          placeholder="Enter Phone"
          {...register("phone")}
        />
      </div>
      <Modal.Button
        type="close"
        variant="button"
        onClick={handleSubmit(async (data) => {
          console.log(data);
          await alert({
            promise: postOrgMember({
              name: data.name,
              address: data.address,
              phone: data.phone,
              role_id: id,
            }).then(() => reset()),
            msgs: {
              loading: "Adding Member",
              success: "Added Successfully",
            },
            id: "Member Add Toast",
          });
        })}
      >
        Add User
      </Modal.Button>
    </form>
  );
};
