/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Edit } from "iconsax-react";
import omit from "lodash/omit";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Headings";
import Input from "@/components/Input";
import { Loader } from "@/components/Loader";
import { Modal } from "@/components/Modal/useModal";
import { BooleanTag } from "@/components/others/BooleanTag";
import { Switch } from "@/components/Switch";
import { TableView } from "@/components/Table";

import { useGetOtherFieldsList } from "@/modules/others/utils/hooks/useOtherFieldsList";
import { useOtherFieldsStore } from "@/modules/others/utils/hooks/useOtherFieldsStore";
import { postOtherFieldToast, putOtherFieldToast } from "@/modules/others/utils/toasts/othersPageToast";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { useGlobalState } from "@/modules/useGlobalState";

import { OtherFields, OtherFieldsPostBody } from "@/types";

export const OthersPage = () => {
  const { isLoading } = useGetOtherFieldsList();
  const otherFieldsList = useOtherFieldsStore((state) => state.othersFieldList.data);

  return (
    <div className="px-10 py-10 overflow-visible sm:p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <div>
            <Heading
              title="Patient Medical History"
              subtitle="List of all Medical History Fields. Click on Add Button to add new"
            />
          </div>

          <div className="flex space-x-4">
            <OtherFieldAddEditModal type="add" />
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : otherFieldsList.length === 0 ? (
          <div className="flex justify-center">
            <div className="w-[48vw] h-[70vh] md:w-full md:h-[50vh] relative">
              <Image src="/assets/empty.svg" alt="Empty State" layout="fill" objectFit="cover" priority={true} />
            </div>
          </div>
        ) : (
          <TableView
            data={otherFieldsList}
            tableHeadings={["Field Name", "Field Slug", "Field Value Type", "Required"]}
            loading={isLoading}
            tableRowComponent={<OthersTableRow />}
          />
        )}
      </div>
    </div>
  );
};

type OthersTableRowProps = {
  data?: any;
};

export const OthersTableRow: React.FC<OthersTableRowProps> = ({ data }: { data?: OtherFields }) => {
  return data ? (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
      <td className="px-6 py-4 whitespace-nowrap"> {data.slug}</td>
      <td className="px-6 py-4 whitespace-nowrap capitalize">{data.value_type}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BooleanTag type="info" trueStatement={data.required ? "Yes" : "No"} />
      </td>

      <td className="px-6 py-4 flex gap-2">
        <OtherFieldAddEditModal type="edit" data={data} />
        {/*  <DeleteModal
          closeButton={
            <Trash
              size={28}
              variant={"Broken"}
              color={"#555"}
              className={"cursor-pointer"}
            />
          }
          title={"You are about to delete this field"}
          subTitles={["Please be sure before you delete this"]}
        /> */}
      </td>
    </tr>
  ) : (
    <tr></tr>
  );
};

type OtherFieldAddModalProps = {
  type: "add" | "edit";
  data?: OtherFields;
};

export const OtherFieldAddEditModal: React.FC<OtherFieldAddModalProps> = ({ type, data }) => {
  return (
    <Modal>
      <Modal.Button type="open">
        {type === "add" ? (
          <Button>Add Other Field</Button>
        ) : (
          <Edit variant="Broken" size={28} color="#555" className="cursor-pointer" />
        )}
      </Modal.Button>
      <Modal.Content>
        <Modal.Title>Add Patient Medical History</Modal.Title>
        <OtherFieldAddForm type={type} data={data} />
      </Modal.Content>
    </Modal>
  );
};

type OtherFieldAddEditFormProps = {
  type: "add" | "edit";
  data?: OtherFields;
};

export const OtherFieldAddForm: React.FC<OtherFieldAddEditFormProps> = ({ type, data: initialData }) => {
  console.log(initialData);

  const { register, handleSubmit, control } = useForm<OtherFieldsPostBody>({
    defaultValues: { ...omit(initialData, "id"), required: type === "add" ? true : initialData?.required },
  });
  const options = useGlobalState.getState().base.data_types.map((element) => ({ value: element, label: element }));

  return (
    <Modal.Form
      onSubmit={handleSubmit((data: OtherFieldsPostBody) =>
        type === "add"
          ? postOtherFieldToast({ ...data, required: data.required ? 1 : 0 })
          : initialData &&
            putOtherFieldToast(initialData.id, {
              ...data,
              required: data.required ? 1 : 0,
            })
      )}
    >
      <div className="space-y-4">
        <Input label="Name" type="text" placeholder="Enter Name" {...register("name")} />
        <DropdownController options={options} name="value_type" label="Select Value Type" control={control} />

        <Switch name="required" control={control} label="Required" />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"} Category</Button>
    </Modal.Form>
  );
};
