/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/14/21, 10:57 AM
 *
 *
 */

import { useRoleStore } from "@/modules/roles/useRoleStore";
import { Modal } from "@/components/Modal/useModal";
import { MemberDetailCategory } from "@/types";
import React, { Fragment } from "react";
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

  const data = selectedMemberDetails.map((element) => {
    const value = `${element.detail_category_id}-${element.slug}`;

    return { [value]: element.value };
  });
  const object = Object.assign({}, ...data);
  console.log(object);
  const { register, handleSubmit } = useForm({ defaultValues: object });

  return (
    <Modal>
      <Modal.Button type={"open"}>
        {children ?? (
          <div className="p-6    text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
            Update Member Details
          </div>
        )}
      </Modal.Button>
      <Modal.Content>
        <Modal.Title>
          Update {memberData.name}
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
