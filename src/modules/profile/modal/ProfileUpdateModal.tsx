/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 3:43 PM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import { MemberAddForm } from "@/modules/members/form/MemberAddForm";
import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";

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
          <MemberAddForm initialData={user} type={"edit"} />
        </div>
      </Modal.Content>
    </Modal>
  );
};
