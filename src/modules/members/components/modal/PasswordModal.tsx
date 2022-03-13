/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/22/22, 9:04 PM
 *
 *
 */

import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { PrimaryInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";

import { changePassword } from "@/services/requests/authRequests";

type ChangePasswordFormData = {
  newPassword: string;
  oldPassword: string;
  confirmNewPassword: string;
};

export const PasswordModal = ({ close }: { close: any }) => {
  const { handleSubmit, register, reset } = useForm<ChangePasswordFormData>();

  return (
    <Modal>
      <Modal.Button type="open">
        <button
          className={` hover:text-red-500 hover:bg-red-50 text-white text-primary_gray-700
               group flex rounded-md items-center w-full font-medium px-4 py-3 text-lg`}
        >
          Change Password
        </button>
      </Modal.Button>
      <Modal.Content width="max-w-6xl">
        <div className="flex flex-col space-y-16 sm:-space-y-12">
          <Modal.Title>Change Password</Modal.Title>
          <div className="flex items-center w-full space-x-8 sm:flex-col-reverse">
            <Modal.Form
              onSubmit={handleSubmit(async (values) => {
                if (values.oldPassword === values.newPassword) {
                  throw new Error(
                    "Old Password and New Password cannot be Same"
                  );
                }
                if (values.newPassword !== values.confirmNewPassword) {
                  throw new Error(
                    "New Password and Confirm New Password Doesn't Match"
                  );
                }

                await alert({
                  type: "promise",
                  promise: changePassword(
                    values.oldPassword,
                    values.newPassword
                  ).then(() => {
                    close();
                    reset();
                  }),
                  msgs: {
                    loading: "Changing Password",
                    success: "Password Changed Successfully",
                  },
                  id: "change-password-modal",
                });
              })}
              className="w-1/2 space-y-16 sm:w-full sm:space-y-8"
            >
              <div className="space-y-8">
                <PrimaryInput
                  label="Old Password"
                  type="password"
                  placeholder="Enter Old Password"
                  {...register("oldPassword")}
                />
                <PrimaryInput
                  label="New Password"
                  type="password"
                  placeholder="Enter New Password"
                  {...register("newPassword")}
                />{" "}
                <PrimaryInput
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword")}
                />
              </div>

              <div className="flex space-x-4">
                <Button>Change</Button>
                <Modal.Button type="close">
                  <Button color="error">Cancel</Button>
                </Modal.Button>
              </div>
            </Modal.Form>

            <div className="w-1/2 -mt-40 sm:mt-10 flex flex-col items-center -space-y-6  sm:space-y-0 sm:w-full">
              <div className="relative h-8xl w-full sm:h-7xl sm:-ml-12  ">
                <Image
                  src="/assets/change-password.svg"
                  alt="Change Password"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col items-center sm:hidden ">
                <h1 className="text-2xl sm:text-xl font-medium text-primary-600">
                  New Password must contain
                </h1>
                <div className=" text-xl sm:text-base sm:items-start font-medium text-primary_gray-600 flex flex-col items-center">
                  <p>At least six characters</p>
                  <p>At least one uppercase character</p>
                  <p>At least one number </p>
                  <p>At least one special characer </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
