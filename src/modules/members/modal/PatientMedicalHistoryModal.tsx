/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/13/22, 5:45 PM
 *
 *
 */

import { Modal } from "@/components/Modal/useModal";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { Button } from "@/components/Button";
import { PrimaryInput, RadioInputController } from "@/components/Input";
import { postMedicalHistoryToPatient } from "@/services/requests/otherFieldsRequests";
import { alert } from "@/components/Alert";
import { useRouter } from "next/router";
import { useMemberStore } from "@/modules/members/useMemberStore";
import { MedicalHistory } from "@/types";

export const PatientMedicalHistoryModal: React.FC = () => {
  const { handleSubmit, control, watch, register, reset } = useForm();
  const { isLoading } = useGetOtherFieldsList();
  const patientMedicalHistoryList = useMemberStore(
    (state) => state.patientMedicalHistoryList.data
  );
  const textState = patientMedicalHistoryList.length === 0 ? "Add" : "Update";
  const router = useRouter();
  const medicalHistoryFields = useOtherFieldsStore(
    (state) => state.othersFieldList.data
  );

  useEffect(() => {
    reset(
      Object.assign(
        {},
        ...patientMedicalHistoryList.map((element: MedicalHistory) => ({
          [`${element.detail_category_id}-${element.slug}`]:
            element.value === "Yes" ? 1 : 0,
        })),
        ...patientMedicalHistoryList.map((element: MedicalHistory) => {
          if (element.value === "Yes") {
            return {
              [`${element.detail_category_id}-${element.slug}-note`]:
                element.note === "N/A" ? "" : element.note,
            };
          }
        })
      )
    );
    return () => reset();
  }, [JSON.stringify(patientMedicalHistoryList)]);

  return (
    <Modal>
      <Modal.Button type={"open"}>
        <div className="p-6 text-gray-500 text-xl font-semibold cursor-pointer hover:text-gray-850 hover:text-gray-800">
          {textState} Patient Medical History
        </div>
      </Modal.Button>
      <Modal.Content>
        <Modal.Title>{textState} Patient Medical History</Modal.Title>

        <Modal.Form
          onSubmit={handleSubmit((data) =>
            alert({
              type: "promise",
              promise: postMedicalHistoryToPatient(
                Number(router.query.id),
                data
              ).then(async () => {
                reset();
              }),
              msgs: {
                loading: `${
                  textState === "Update" ? "Updating" : "Adding"
                } Medical History`,
                success: `Successfully ${
                  textState === "Update" ? "Updated" : "Added"
                } Medical History`,
              },
              id: "medical-history",
            })
          )}
          className={"space-y-12"}
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

export const MedicalHistoryForm = ({
  id,
  slug,
  name,
  control,
  watch,
  register,
}: any) => {
  const note = watch(`${id}-${slug}`);

  return (
    <>
      <label className={"text-xl font-semibold text-gray-700 w-1/3"}>
        {name}
      </label>
      <div className={"w-2/3 space-y-4"}>
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
            <PrimaryInput
              placeholder={`Note for ${name} `}
              defaultValue={""}
              {...register(`${id}-${slug}-note`)}
            />
          </div>
        )}
      </div>
    </>
  );
};
