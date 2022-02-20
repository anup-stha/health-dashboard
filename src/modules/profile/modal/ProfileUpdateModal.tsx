/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/20/22, 2:20 PM
 *
 *
 */

import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/Modal/useModal";

import { MemberAddEditForm } from "@/modules/members/components/form/MemberAddEditForm";
import { Member } from "@/modules/members/types";
import { useRoleDetails } from "@/services/requests/roleRequests";

interface IProfileUpdateModal {
  user: Member;
}

export const ProfileUpdateModal = ({ user }: IProfileUpdateModal) => {
  const { data } = useRoleDetails(user.role ? user.role.id : 0);

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
          {data && (
            <MemberAddEditForm
              selectedRole={data?.data.data}
              type="edit"
              initialData={user}
              handleSubmit={handleSubmit}
              control={control}
              register={register}
              reset={reset}
              watch={watch}
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};
