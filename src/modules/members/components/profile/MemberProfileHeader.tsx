/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/28/22, 11:22 AM
 *
 *
 */

import { Dialog, Menu, Transition } from "@headlessui/react";
import { Location, ProfileCircle } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Camera, CircleWavyCheck, CircleWavyWarning, DotsThreeOutline, Envelope } from "phosphor-react";
import React, { Fragment, useState } from "react";
import LetteredAvatar from "react-avatar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input from "@/components/Input";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { MemberModal } from "@/modules/members/components/modal/MemberModal";
import { MemberOtherDetailModal } from "@/modules/members/components/modal/MemberOtherDetailModal";
import { ProfileImageModal } from "@/modules/members/components/modal/ProfileImageModal";
import { MemberToggle } from "@/modules/members/components/profile/MemberToggle";
import { useGetOverviewData } from "@/modules/members/hooks/query/useGetOverviewData";
import { Member } from "@/modules/members/types";
import { logoutUser } from "@/services/requests";
import { changePassword } from "@/services/requests/authRequests";

import { Role } from "@/types";

interface IMemberProfileHeaderProps {
  member: Member;
  role: Role;
}

type ChangePasswordFormData = {
  newPassword: string;
  oldPassword: string;
  confirmNewPassword: string;
};

/**
 *
 * @param {Member} member - selected Member
 * @param {Member} role - selected Role
 * @return {JSX.Element}
 */
export function MemberProfileHeader({ member, role }: IMemberProfileHeaderProps) {
  const router = useRouter();
  const { handleSubmit, register, reset } = useForm<ChangePasswordFormData>();

  const [active, setActive] = useState(member.active);
  const [verified, setVerified] = useState(member.verified);
  const { data } = useGetOverviewData(member.id);
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const onLogOut = async () => {
    await alert({
      promise: logoutUser(),
      msgs: {
        loading: "Logging Out",
        success: "Logged Out Successfully",
      },
      id: "Login Toast",
    });
  };

  console.log(user.id);

  return (
    <div className="flex md:flex-col justify-between md:gap-8">
      <div className="flex gap-8 sm:flex-col">
        {router.asPath.includes("profile") ? (
          <ProfileImageModal selectedMember={user}>
            <div className="flex-shrink-0 h-56 w-56 cursor-pointer relative rounded-xl">
              {user.image ? (
                <Image
                  src={user.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl shadow-sm"
                  alt="profile image"
                />
              ) : (
                <LetteredAvatar name={user.name} size="100%" className="rounded-xl overflow-hidden" maxInitials={2} />
              )}
              <div
                className={`w-6 h-6 shadow-xl ${
                  user.active ? "bg-primary-500" : "bg-red-500"
                } ring-[3px] ring-white rounded-full absolute z-20 inset-y-1/2 -right-3`}
              />
              <div className="bg-white flex items-center justify-center rounded-full text-primary_gray-850 w-10 h-10 text-3xl absolute -right-4 -top-4">
                <Camera weight="duotone" />
              </div>
            </div>
          </ProfileImageModal>
        ) : (
          <div className="flex-shrink-0 h-56 w-56  relative rounded-xl">
            {member.image ? (
              <Image
                src={member.image}
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-sm"
                alt="profile image"
              />
            ) : (
              <LetteredAvatar name={member.name} size="100%" className="rounded-xl overflow-hidden" maxInitials={2} />
            )}
            <div
              className={`w-6 h-6 shadow-xl ${
                active ? "bg-primary-500" : "bg-red-500"
              } ring-[3px] ring-white rounded-full absolute z-20 inset-y-1/2 -right-3`}
            />
          </div>
        )}

        <div className="py-1.5 flex flex-col justify-between md:gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2 md:gap-1">
              <div className="flex items-center  gap-2">
                <h1 className="text-3xl font-bold text-primary_gray-900 line-clamp-1">{member.name}</h1>
                {verified ? (
                  <CircleWavyCheck size={24} weight="duotone" className="text-primary-600" />
                ) : (
                  <CircleWavyWarning size={24} weight="duotone" className="text-red-600" />
                )}
              </div>

              <div className="flex lg:flex-col md:gap-0 gap-4">
                <div className="flex items-start space-x-1">
                  <ProfileCircle size={18} variant="Bulk" color="rgb(163 163 163)" />
                  <span className="text-primary_gray-400 font-medium text-lg">{role.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Location size={18} variant="Bulk" color="rgb(163 163 163)" />
                  <span className="text-primary_gray-400 font-medium text-lg">{member.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Envelope size={18} weight="duotone" color="rgb(163 163 163)" />
                  <span className="text-primary_gray-400 font-medium text-lg">{member.email}</span>
                </div>
              </div>
            </div>
          </div>
          {role.slug === "org_admin" && (
            <div className="self-start grid grid-cols-3 md:grid-cols-2 gap-4">
              <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-primary_gray-300 flex flex-col">
                <span className="font-Inter text-2xl font-bold text-primary_gray-900">
                  {data?.organization_operator ?? 0}
                </span>
                <span className="text-lg font-medium text-primary_gray-500">Total Operators</span>
              </div>
              <div className="px-4 py-2 border-[1px] rounded-md border-dashed border-primary_gray-300 flex flex-col">
                <span className="font-Inter text-2xl font-bold text-primary_gray-900">{data?.total_members ?? 0}</span>
                <span className="text-lg font-medium text-primary_gray-500">Total Members</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 self-start flex space-x-4 relative">
        <MemberOtherDetailModal otherDetails={member.details} memberData={member} selectedRole={role}>
          <Button color="secondary" size="sm">
            Edit Other Details
          </Button>
        </MemberOtherDetailModal>
        <MemberModal
          type="edit"
          selectedRole={role}
          initialData={member}
          button={<Button size="sm">Edit Profile</Button>}
        />

        <Transition appear show={isOpen} as={Fragment} data-testid="modal">
          <Dialog as="div" open={isOpen} className="fixed inset-0 z-50" onClose={() => setIsOpen(false)}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
            <div className="min-h-screen md:px-16 sm:px-4 text-center">
              <Transition.Child as={Fragment}>
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95 -translate-y-32"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-75"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-90 -translate-y-32"
              >
                <div className="inline-block w-full max-w-6xl p-10 sm:p-6 space-y-8 overflow-hidden sidebar text-left align-middle transition-all transform bg-white shadow-E600 rounded-2xl">
                  <div className="flex flex-col space-y-16 sm:-space-y-12">
                    <h1 className="text-4xl font-medium text-primary_gray-800">Change Password</h1>
                    <div className="flex items-center w-full space-x-8 sm:flex-col-reverse">
                      <form
                        onSubmit={handleSubmit(async (values) => {
                          if (values.oldPassword === values.newPassword) {
                            toast.error("Old Password and New Password cannot be Same");
                            return;
                          }
                          if (values.newPassword !== values.confirmNewPassword) {
                            toast.error("New Password and Confirm New Password Doesn't Match");
                            return;
                          }

                          await alert({
                            type: "promise",
                            promise: changePassword(values.oldPassword, values.newPassword).then(() => {
                              setIsOpen(false);
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
                          <Input
                            label="Old Password"
                            type="password"
                            placeholder="Enter Old Password"
                            {...register("oldPassword")}
                          />
                          <Input
                            label="New Password"
                            type="password"
                            placeholder="Enter New Password"
                            {...register("newPassword")}
                          />
                          <Input
                            label="Confirm New Password"
                            type="password"
                            placeholder="Confirm New Password"
                            {...register("confirmNewPassword")}
                          />
                        </div>

                        <div className="flex space-x-4">
                          <Button>Change</Button>

                          <Button color="error" onClick={() => setIsOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>

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
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {(user.id === 1 || router.pathname === "/profile") && (
          <Menu className="z-20" as="div">
            <Menu.Button>
              <button className=" py-3.5 px-4 text-xl text-primary-600 rounded-lg bg-slate-200 hover:bg-primary_gray-300">
                <DotsThreeOutline weight="duotone" size={20} />
              </button>
            </Menu.Button>{" "}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                id="menu-items"
                className="absolute top-16 right-0 w-72 mt-2 origin-top-right bg-white divide-y divide-primary_gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {router.pathname !== "/profile" ? (
                  <>
                    <div className="py-2">
                      <MemberToggle
                        toggle="active"
                        memberId={member.id}
                        currentState={active}
                        setCurrentState={setActive}
                        selectedMemberDetails={member}
                      />
                    </div>
                    <div className="py-2 ">
                      <MemberToggle
                        toggle="verified"
                        memberId={member.id}
                        currentState={verified}
                        setCurrentState={setVerified}
                        selectedMemberDetails={member}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-2" onClick={() => setIsOpen(true)}>
                      <Menu.Item as="div">
                        {({ active: btnActive }) => (
                          <button
                            className={`${
                              btnActive ? `text-primary-500 bg-primary-50 text-white` : "text-primary_gray-700"
                            } group flex rounded-md items-center w-full font-medium px-4 py-3 text-lg`}
                          >
                            Change Password
                          </button>
                        )}
                      </Menu.Item>
                    </div>

                    <div className="py-2" onClick={onLogOut}>
                      <Menu.Item as="div">
                        {({ active: btnActive }) => (
                          <button
                            className={`${
                              btnActive ? `text-red-500 bg-red-50 text-white` : "text-primary_gray-700"
                            } group flex rounded-md items-center w-full font-medium px-4 py-3 text-lg`}
                          >
                            Log out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        )}
      </div>
    </div>
  );
}
