/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 2/2/22, 2:18 PM
 *
 *
 */

import React from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { Switch } from "@/components/Switch";

import { addTest, addTestCategory, updateTest, updateTestCategory } from "@/services/requests/testRequests";

import { Test } from "@/types";

type TestAddEditFormProps = {
  variant: "test" | "subtest";
  type: "add" | "edit";
  id?: number | string;
  selectedTest?: Test;
};

type TestFormData = {
  name: string;
  desc: string;
  public: boolean;
};

export const TestAddEditForm: React.FC<TestAddEditFormProps> = ({ type, selectedTest, variant }) => {
  const { handleSubmit, register, control } = useForm<TestFormData>({
    defaultValues: {
      name: selectedTest && type === "edit" ? selectedTest.name : "",
      desc: selectedTest && type === "edit" ? selectedTest.desc : "",
      public: selectedTest && type === "edit" ? selectedTest.public : true,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    variant === "test"
      ? type === "add"
        ? await alert({
            promise: addTest(values),
            msgs: {
              loading: "Adding Test",
              success: "Added Successfully",
            },
            id: "Test Add Toast",
          })
        : await alert({
            promise: updateTest(Number(selectedTest && selectedTest.id), values),
            msgs: {
              loading: "Updating Test",
              success: "Updating Successfully",
            },
            id: "Test Add Toast",
          })
      : type === "add"
      ? await alert({
          promise: addTestCategory({
            ...values,
            test_category_id: Number(selectedTest && selectedTest.id),
          }),
          msgs: {
            loading: "Adding Test Category",
            success: "Added Successfully",
          },
          id: "Test Category Add Test",
        })
      : await alert({
          promise: updateTestCategory(Number(selectedTest && selectedTest.id), {
            ...values,
          }),
          msgs: {
            loading: "Updating Test Category",
            success: "Updated Successfully",
          },
          id: "Test Category Update Test",
        });
  });

  return (
    <Modal.Form onSubmit={onSubmit}>
      <div className="space-y-6">
        <Input
          data-testid="test-title-input"
          label="Name"
          type="text"
          required={true}
          placeholder="Enter Test Title"
          {...register(`name`)}
        />

        <Switch name="public" control={control} label="Public" />

        <Input
          data-testid="test-description-input"
          label="Description"
          type="text"
          required={true}
          placeholder="Enter Test Description"
          {...register("desc")}
        />
      </div>

      <Button data-testid="test-add-btn">{type === "add" ? "Add" : "Edit"}</Button>
    </Modal.Form>
  );
};
