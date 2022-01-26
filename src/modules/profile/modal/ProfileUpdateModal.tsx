/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/26/22, 10:17 AM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import React from "react";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { useForm } from "react-hook-form";
import moment from "moment";
import { MemberAddEditForm } from "@/modules/member/form/MemberAddEditForm";

export const ProfileUpdateModal = () => {
  const user = useAuthStore((state) => state.user);
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      ...user,
      dob_ad: moment(Number(user?.dob_ad) * 1000).format("YYYY-MM-DD"),
    },
  });

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
          <MemberAddEditForm
            type="edit"
            initialData={user}
            handleSubmit={handleSubmit}
            control={control}
            register={register}
            reset={reset}
            watch={watch}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
};
