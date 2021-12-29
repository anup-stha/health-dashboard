/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/29/21, 5:48 PM
 *
 *
 */

import { Button } from "@/components/Button";
import { TableView } from "@/components/Table";
import { BooleanTag } from "@/components/others/BooleanTag";
import { Edit, Trash } from "iconsax-react";
import { DeleteModal } from "@/components/Modal/DeleteModal";
import { useGlobalState } from "@/modules/useGlobalState";
import { Modal } from "@/components/Modal/useModal";
import { PrimaryInput, SwitchInput } from "@/components/Input";
import React from "react";
import { DropdownController } from "@/modules/roles/form/roleMemberCategoryForm";
import { useForm } from "react-hook-form";

const othersTableData = [
  {
    name: "Drug Allergies",
    slug: "drug_allergies",
    value_type: "Boolean",
    required: false,
    note_length: "100 chars",
  },
];

export const OthersPage = () => {
  return (
    <div className="px-10 py-10 overflow-visible sm:p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-850">
              Patient Medical History
            </h1>
            <p className="text-lg font-semibold text-gray-500">
              List of all Medical History Fields. Click on Add Button to add new
            </p>
          </div>

          <div className="flex space-x-4">
            <Modal>
              <Modal.Button type={"open"}>
                <Button>Add Other Field</Button>
              </Modal.Button>
              <Modal.Content>
                <Modal.Title>Add Patient Medical History</Modal.Title>
                <OtherFieldAddForm />
              </Modal.Content>
            </Modal>
          </div>
        </div>
        <TableView
          data={othersTableData}
          tableHeadings={[
            "Field Name",
            "Field Slug",
            "Field Value Type",
            "Required",
            "Field Note Length",
          ]}
          tableRowComponent={<OthersTableRow />}
        />
      </div>
    </div>
  );
};

type OthersTableRowProps = {
  data?: any;
};

export const OthersTableRow: React.FC<OthersTableRowProps> = ({ data }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
      <td className="px-6 py-4 whitespace-nowrap"> {data.slug}</td>
      <td className="px-6 py-4 whitespace-nowrap">{data.value_type}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <BooleanTag
          type={"info"}
          trueStatement={data.required ? "Yes" : "No"}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{data.note_length}</td>
      <td className="px-6 py-4 flex gap-2">
        <Edit
          variant={"Broken"}
          size={28}
          color={"#555"}
          className={"cursor-pointer"}
        />
        <DeleteModal
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
        />
      </td>
    </tr>
  );
};

export const OtherFieldAddForm = ({ type }: any) => {
  const { register, handleSubmit, control } = useForm();
  const options = useGlobalState
    .getState()
    .base.data_types.map((element) => ({ value: element, label: element }));

  return (
    <Modal.Form
      onSubmit={handleSubmit((data: any) => {
        console.log(data);
      })}
    >
      <div className="space-y-4">
        <PrimaryInput
          label="Name"
          type="text"
          placeholder="Enter Name"
          {...register("name")}
        />
        <DropdownController
          options={options}
          name={"value_type"}
          label={"Select Value Type"}
          control={control}
        />

        <SwitchInput
          label="Required"
          type="number"
          placeholder="Enter Required Field"
          {...register("required")}
        />
        <PrimaryInput
          label="Note Length"
          type="number"
          placeholder="Enter Note Length"
          {...register("note_length")}
        />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"} Category</Button>
    </Modal.Form>
  );
};
