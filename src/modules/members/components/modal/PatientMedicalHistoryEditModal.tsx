/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input, { RadioInputController } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";

import { Member } from "@/modules/members/types";
import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { postMedicalHistoryToPatient } from "@/services/requests/otherFieldsRequests";

import { MedicalHistory } from "@/types";

interface IPatientMedicalHistoryEditModal {
  selectedMember: Member;
}

export const PatientMedicalHistoryModal = ({ selectedMember }: IPatientMedicalHistoryEditModal) => {
  const { handleSubmit, control, watch, register, reset } = useForm();
  const { isLoading } = useGetOtherFieldsList();

  const textState = selectedMember.medical_history.length === 0 ? "Add" : "Update";
  const medicalHistoryFields = useOtherFieldsStore((state) => state.othersFieldList.data);

  useEffect(() => {
    reset(
      Object.assign(
        {},
        ...selectedMember.medical_history.map((element: MedicalHistory) => ({
          [`${element.detail_category_id}-${element.slug}`]: element.value === "Yes" ? 1 : 0,
        })),
        ...selectedMember.medical_history.map((element: MedicalHistory) => {
          if (element.value === "Yes") {
            return {
              [`${element.detail_category_id}-${element.slug}-note`]: element.note === "N/A" ? "" : element.note,
            };
          }
        })
      )
    );
    return () => reset();
  }, [JSON.stringify(selectedMember.medical_history)]);

  return (
    <Modal>
      <Modal.Button type="open">
        <Button>{textState}</Button>
      </Modal.Button>
      <Modal.Content>
        <Modal.Title>{textState} Patient Medical History</Modal.Title>

        <Modal.Form
          onSubmit={handleSubmit((data) =>
            alert({
              type: "promise",
              promise: postMedicalHistoryToPatient(selectedMember.id, data).then(async () => {
                reset();
              }),
              msgs: {
                loading: `${textState === "Update" ? "Updating" : "Adding"} Medical History`,
                success: `Successfully ${textState === "Update" ? "Updated" : "Added"} Medical History`,
              },
              id: "medical-history",
            })
          )}
          className="space-y-12"
        >
          <Modal.Scrollable>
            {isLoading && <div />}
            <div className="grid grid-cols-1 gap-y-10 w-full">
              {medicalHistoryFields.map((field) => (
                <div className="flex " key={field.id}>
                  <MedicalHistoryForm
                    id={field.id}
                    slug={field.slug}
                    name={field.name}
                    control={control}
                    register={register}
                    watch={watch}
                  />
                </div>
              ))}
            </div>
          </Modal.Scrollable>
          <Button>{textState}</Button>
        </Modal.Form>
      </Modal.Content>
    </Modal>
  );
};

export const MedicalHistoryForm = ({ id, slug, name, control, watch, register }: any) => {
  const note = watch(`${id}-${slug}`);

  return (
    <>
      <label className="text-xl font-medium text-gray-700 w-1/3">{name}</label>
      <div className="w-2/3 space-y-4">
        <RadioInputController
          name={`${id}-${slug}`}
          labelOptions={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
          control={control}
        />
        {note === 1 && (
          <div className="col-span-2">
            <Input placeholder={`Note for ${name} `} defaultValue="" {...register(`${id}-${slug}-note`)} />
          </div>
        )}
      </div>
    </>
  );
};
