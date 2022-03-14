/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 3/2/22, 4:19 PM
 *
 *
 */

import React from "react";
import { useForm } from "react-hook-form";

import { alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { PrimaryInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";

import { AppQuery } from "@/modules/app/hooks/AppQuery";

type AppForm = {
  name: string;
  application_id: string;
  secret_key: string;
};

type AppAddEditForm = {
  type: "add" | "edit";
  id?: number;
  defaultValues?: AppForm;
};

export const AppAddEditForm = ({ type, id, defaultValues }: AppAddEditForm) => {
  const { mutateAsync: postMutateAsync } = AppQuery.usePost();
  const { mutateAsync: putMutateAsync } = AppQuery.usePut();
  const { handleSubmit, register } = useForm<AppForm>({
    defaultValues,
  });

  return (
    <Modal.Form
      onSubmit={handleSubmit(async (values) => {
        type === "add"
          ? await alert({
              type: "promise",
              promise: postMutateAsync(values),
              msgs: {
                loading: "Adding New App",
                success: "New App Added Successfully",
              },
              id: "new-app-add-toast",
            })
          : await alert({
              type: "promise",
              promise: putMutateAsync({
                id: Number(id),
                name: values.name,
                secret_key: values.secret_key,
              }),
              msgs: {
                loading: "Editing App",
                success: "App Edited Successfully",
              },
              id: "new-app-add-toast",
            });
      })}
    >
      <div className="space-y-6">
        <PrimaryInput label="App Name" required={true} placeholder="Enter App Name" {...register(`name`)} />
        {type === "add" && (
          <PrimaryInput
            label="Application Id"
            required={true}
            placeholder="Enter Application Id"
            {...register("application_id")}
          />
        )}

        <PrimaryInput label="Secret Key" required={true} placeholder="Enter Secret Key" {...register("secret_key")} />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"}</Button>
    </Modal.Form>
  );
};
