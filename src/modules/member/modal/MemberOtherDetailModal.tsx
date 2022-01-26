/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/26/22, 10:37 AM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import { MemberDetailCategory, MemberDetails, Role } from "@/types";
import React, { Fragment, useEffect } from "react";
import { PrimaryInput, SwitchInput } from "@/components/Input";
import { alert } from "@/components/Alert";
import { addDetailsToMember } from "@/services/requests/memberRequests";
import { Button } from "@/components/Button";
import { WarningOctagon } from "phosphor-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/modules/auth/useTokenStore";
import { Member } from "@/modules/member/types";

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
  const { register, handleSubmit, reset } = useForm();
  const user = useAuthStore((state) => state.user);

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
            {selectedMemberDetails.length !== 0 ? "Update" : "Add"} Member Other
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
        {selectedRole &&
        (!selectedRole.member_detail_categories ||
          selectedRole.member_detail_categories.length === 0) ? (
          <div className="flex items-center text-red-500 space-x-4">
            <WarningOctagon size={40} />{" "}
            <span className={"font-semibold text-xl"}>
              No Member Details Field Found.
              {user.id === 1 ? (
                <>
                  Please add a member details field to this role{" "}
                  {router.query.role && (
                    <span
                      onClick={() => router.push(`/roles/${router.query.role}`)}
                      className="cursor-pointer"
                    >
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
                {selectedRole &&
                  selectedRole.member_detail_categories &&
                  selectedRole.member_detail_categories.map(
                    (category: MemberDetailCategory) => (
                      <Fragment key={category.id}>
                        {category.value_type.toLowerCase() === "boolean" ? (
                          <SwitchInput
                            label={category.name}
                            type="number"
                            placeholder={`Enter ${category.name}`}
                            {...register(`${category.id}-${category.slug}`)}
                          />
                        ) : (
                          <PrimaryInput
                            label={category.name}
                            type={category.value_type}
                            required={!!category.required}
                            placeholder={`Enter ${category.name}`}
                            {...register(`${category.id}-${category.slug}`)}
                          />
                        )}
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
