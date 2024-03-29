/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { useRouter } from "next/router";
import { WarningOctagon } from "phosphor-react";
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { Switch } from "@/components/Switch";

import { useAuthStore } from "@/modules/auth/useTokenStore";
import { Member } from "@/modules/members/types";
import { addDetailsToMember } from "@/services/requests/memberRequests";
import { getDirtyFields } from "@/utils/getDirtyFields";

import { MemberDetailCategory, MemberDetails, Role } from "@/types";

type MemberDetailAddModalProps = {
  otherDetails: MemberDetails[];
  memberData: Member;
  children?: React.ReactNode;
  selectedRole: Role;
};

export const MemberOtherDetailModal: React.FC<MemberDetailAddModalProps> = ({
  memberData,
  children,
  selectedRole,
  otherDetails: selectedMemberDetails,
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { dirtyFields, isDirty },
  } = useForm();
  const user = useAuthStore((state) => state.user);

  console.log(selectedMemberDetails);

  useEffect(() => {
    reset(
      Object.assign(
        {},
        ...selectedMemberDetails.map((element: any) => ({
          [`${element.detail_category_id}-${element.slug}`]: element.value,
        }))
      )
    );
    return () => reset();
  }, [JSON.stringify(selectedMemberDetails)]);

  return (
    <Modal>
      <Modal.Button type="open">
        {children ?? (
          <div className="p-6    text-gray-500 text-xl font-medium cursor-pointer hover:text-gray-850 hover:text-gray-800">
            {selectedMemberDetails.length !== 0 ? "Update" : "Add"} Other Details
          </div>
        )}
      </Modal.Button>
      <Modal.Content>
        <Modal.Title>
          {selectedMemberDetails.length !== 0 ? "Update" : "Add"} Member Details {memberData.name}
          &apos;s Details
        </Modal.Title>
        {selectedRole &&
        (!selectedRole.member_detail_categories || selectedRole.member_detail_categories.length === 0) ? (
          <div className="flex items-center text-red-500 space-x-4">
            <WarningOctagon size={40} />{" "}
            <span className="font-medium text-xl">
              No Member Details Field Found.
              {user?.id === 1 ? (
                <>
                  Please add a member details field to this role{" "}
                  {router.query.role && (
                    <span onClick={() => router.push(`/roles/${router.query.role}`)} className="cursor-pointer">
                      here
                    </span>
                  )}
                </>
              ) : (
                <>Please contact Administrator</>
              )}
            </span>
          </div>
        ) : (
          <Modal.Form
            onSubmit={handleSubmit(
              async (values) =>
                await alert({
                  type: "promise",
                  promise: addDetailsToMember(
                    Number(selectedRole.id),
                    Number(memberData.id),
                    getDirtyFields(dirtyFields, values)
                  ),
                  msgs: {
                    loading: "Adding Member Details",
                  },
                  id: "member-detail-add",
                })
            )}
          >
            <Modal.Scrollable>
              <div className="space-y-4">
                {selectedRole &&
                  selectedRole.member_detail_categories &&
                  selectedRole.member_detail_categories.map((category: MemberDetailCategory) => (
                    <Fragment key={category.id}>
                      {category.value_type?.toLowerCase() === "boolean" ? (
                        <Switch name={`${category.id}-${category.slug}`} control={control} label={category.name} />
                      ) : (
                        <Input
                          label={category.name}
                          type={category.value_type}
                          required={!!category.required}
                          placeholder={`Enter ${category.name}`}
                          {...register(`${category.id}-${category.slug}`)}
                        />
                      )}
                    </Fragment>
                  ))}
              </div>
            </Modal.Scrollable>{" "}
            <Button disabled={!isDirty}>Update Details</Button>
          </Modal.Form>
        )}
      </Modal.Content>
    </Modal>
  );
};
