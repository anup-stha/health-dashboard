/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/25/22, 9:18 PM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberAddEditForm } from "@/modules/member/form/MemberAddEditForm";

export const ProfileUpdateModal = () => {
  const { user } = useAuthStore();

  return (
    <Modal>
      <Modal.Button type="open">
        <div className="hover:text-gray-850 p-6 border-b-2 border-gray-200 text-gray-500 text-xl font-semibold cursor-pointer">
          Update Public Profile Info
        </div>
      </Modal.Button>

      <Modal.Content>
        <Modal.Title>Update Profile</Modal.Title>
        <div className="flex flex-col space-y-4 ">
          <MemberAddEditForm initialData={user} type={"edit"} />
        </div>
      </Modal.Content>
    </Modal>
  );
};
