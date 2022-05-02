/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import React from "react";
import { useForm } from "react-hook-form";

import { toastAlert } from "@/components/Alert";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
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
          ? await toastAlert({
              type: "promise",
              promise: postMutateAsync(values),
              msgs: {
                loading: "Adding New App",
                success: "New App Added Successfully",
              },
              id: "new-app-add-toast",
            })
          : await toastAlert({
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
        <Input
          data-testid="app_name"
          label="App Name"
          required={true}
          placeholder="Enter App Name"
          {...register(`name`)}
        />
        {type === "add" && (
          <Input
            data-testid="application_id"
            label="Application Id"
            required={true}
            placeholder="Enter Application Id"
            {...register("application_id")}
          />
        )}

        <Input
          data-testid="secret_key"
          label="Secret Key"
          required={true}
          placeholder="Enter Secret Key"
          {...register("secret_key")}
        />
      </div>

      <Button data-testid="app_add_btn">{type === "add" ? "Add" : "Edit"}</Button>
    </Modal.Form>
  );
};
