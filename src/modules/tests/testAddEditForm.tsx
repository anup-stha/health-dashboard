/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/15/21, 3:46 PM
 *
 *
 */

import { Test } from "@/types";
import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/Modal/useModal";
import { PrimaryInput, SwitchInput } from "@/components/Input";
import { Button } from "@/components/Button";
import { alert } from "@/components/Alert";
import { addTest, addTestCategory } from "@/services/requests/testRequests";

type TestAddEditFormProps = {
  type: "add" | "edit";
  id?: number | string;
  selectedTest?: Test;
};

type TestFormData = {
  name: string;
  desc: string;
  slug: string;
  public: boolean;
};

export const TestAddEditForm: React.FC<TestAddEditFormProps> = ({
  type,

  selectedTest,
}) => {
  const { handleSubmit, register } = useForm<TestFormData>();
  return (
    <Modal.Form
      onSubmit={handleSubmit(async (values) => {
        !selectedTest
          ? await alert({
              promise: addTest(values),
              msgs: {
                loading: "Adding Test",
                success: "Added Successfully",
              },
              id: "Test Add Toast",
            })
          : await alert({
              promise: addTestCategory({
                ...values,
                test_category_id: Number(selectedTest.id),
              }),
              msgs: {
                loading: "Adding Test Category",
                success: "Added Successfully",
              },
              id: "Test Category Add Test",
            });
      })}
    >
      <div className="space-y-6">
        <PrimaryInput
          label="Name"
          type="text"
          required={true}
          placeholder="Enter Test Title"
          {...register(`name`)}
        />

        <SwitchInput
          label="Public"
          type="checkbox"
          placeholder="Enter Public"
          {...register("public")}
        />
        <PrimaryInput
          label="Description"
          type="text"
          required={true}
          placeholder="Enter Test Description"
          {...register("desc")}
        />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"}</Button>
    </Modal.Form>
  );
};
