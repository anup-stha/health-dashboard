/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/23/21, 3:42 PM
 *
 *
 */

import { useRoleStore } from "@/modules/roles/useRoleStore";
import { Modal } from "@/components/Modal/useModal";
import { MemberDetailCategory } from "@/types";
import React, { Fragment, useEffect } from "react";
import { PrimaryInput } from "@/components/Input";
import { alert } from "@/components/Alert";
import { addDetailsToMember } from "@/services/requests/memberRequests";
import { Button } from "@/components/Button";
import { WarningOctagon } from "phosphor-react";
import { useRouter } from "next/router";
import { memberStore } from "@/modules/members/memberStore";
import { useForm } from "react-hook-form";

export const MemberDetailAddModal = ({ memberData, children }: any) => {
  const router = useRouter();
  const selectedRole = useRoleStore.getState().selectedRole;
  const selectedMemberDetails = memberStore.getState().selectedMemberDetails;

  const { register, handleSubmit, reset } = useForm();

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
      <Modal.Button type={"open"}>
        {children ?? (
          <div className="p-6    text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
            {selectedMemberDetails.length !== 0 ? "Update" : "Add"} Member
            Details
          </div>
        )}
      </Modal.Button>
      <Modal.Content>
        <Modal.Title>
          {selectedMemberDetails.length !== 0 ? "Update" : "Add"} Member Details{" "}
          {memberData.name}
          {"'s"} Details
        </Modal.Title>
        {selectedRole.member_detail_categories.length === 0 ? (
          <div className="flex items-center text-red-500 space-x-4">
            <WarningOctagon size={40} />{" "}
            <span className={"font-semibold text-xl"}>
              No Member Details Field Found. Please add a member details field
              to this role{" "}
              <span
                onClick={() => router.push(`/roles/${router.query.role}`)}
                className="cursor-pointer"
              >
                here
              </span>
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
                    memberData.id,
                    values
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
                {selectedRole.member_detail_categories &&
                  selectedRole.member_detail_categories.map(
                    (category: MemberDetailCategory) => (
                      <Fragment key={category.id}>
                        <PrimaryInput
                          label={category.name}
                          type={category.value_type}
                          required={!!category.required}
                          placeholder={`Enter ${category.name}`}
                          {...register(`${category.id}-${category.slug}`)}
                        />
                      </Fragment>
                    )
                  )}
              </div>
            </Modal.Scrollable>{" "}
            <Button>Update Details</Button>
          </Modal.Form>
        )}
      </Modal.Content>
    </Modal>
  );
};
