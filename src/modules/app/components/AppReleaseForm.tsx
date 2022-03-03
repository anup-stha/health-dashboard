/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/3/22, 8:01 PM
 *
 *
 */

import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import { DropZoneField } from "@/components/Dropzone";
import { PrimaryInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";

import { AppReleaseQuery } from "@/modules/app/hooks/AppReleaseQuery";
import { getSignedUrl } from "@/services/requests/app.service";

type AppForm = {
  name: string;
  version: number;
  code: number;
  app_url: string;
  note: string;
  app_file?: File;
};
type AppFormProps = {
  name: string;
  version: number;
  code: number;
  app_url: string;
  note: string[];
  app_file?: File;
};

type AppAddEditForm = {
  type: "add" | "edit";
  id?: number;
  defaultValues?: AppFormProps;
};

export const AppReleaseForm = ({ type, id, defaultValues }: AppAddEditForm) => {
  const router = useRouter();

  const { mutateAsync: postMutateAsync } = AppReleaseQuery.usePost(
    Number(router.query.id)
  );
  const { mutateAsync: putMutateAsync } = AppReleaseQuery.usePut();

  const { handleSubmit, register, control } = useForm<AppForm>({
    defaultValues: {
      ...defaultValues,
      note: defaultValues?.note[0],
    },
  });

  console.log(defaultValues);
  return (
    <Modal.AsyncForm
      onSubmit={handleSubmit(async (values) => {
        if (!values.app_file && type === "add") {
          throw new Error("No Apk File Selected");
        } else if (
          values.app_file &&
          values.app_file.type !== "application/vnd.android.package-archive"
        ) {
          throw new Error("File should be a valid .apk file");
        } else if (!values.app_file && type === "edit") {
          toast.loading("Editing App Release", { id: "toast-loading" });

          try {
            const finalResponse = await putMutateAsync({
              id,
              name: values.name,
              code: values.code,
              version: +values.version,
              note: [values.note],
            });
            if (finalResponse) {
              toast.dismiss("toast-loading");
              toast.success("Added New App Release");
            }
          } catch (e) {
            toast.dismiss("toast-loading");
            throw new Error(e.response.data.message);
          }
        }

        if (!values.app_file) {
          return;
        }

        try {
          toast.loading("Uploading File", { id: "toast-loading" });
          const response = await getSignedUrl({
            member_id: 1,
            file_name: [values.app_file.name],
            type: "app/release",
          });
          const put_response = await axios.put(
            response.data.data[0].put_url,
            values.app_file,
            {
              headers: {
                "Content-Type": values.app_file.type,
              },
            }
          );
          if (put_response.status === 200) {
            toast.loading("Adding New App Release", { id: "toast-loading" });

            const finalResponse =
              type === "add"
                ? await postMutateAsync({
                    app_id: 1,
                    name: values.name,
                    code: values.code,
                    version: values.version,
                    note: [values.note],
                    app_url: response.data.data[0].public_url,
                  })
                : await putMutateAsync({
                    id,
                    name: values.name,
                    code: values.code,
                    version: values.version,
                    note: [values.note],
                    app_url: response.data.data[0].public_url,
                  });

            if (finalResponse) {
              toast.dismiss("toast-loading");
              toast.success("Added New App Release");
            }
          }
        } catch (e) {
          toast.dismiss("toast-loading");
          throw new Error(e.response.data.message);
        }
      })}
    >
      <div className="space-y-6">
        <DropZoneField label="Add App File" name="app_file" control={control} />
        <PrimaryInput
          label="App Release Name"
          required={true}
          placeholder="Enter App Release Name"
          {...register(`name`)}
        />
        <PrimaryInput
          label="Application Version"
          required={true}
          placeholder="Enter App Version Name"
          {...register("version")}
        />
        <PrimaryInput
          label="Code"
          type="number"
          required={true}
          placeholder="Enter App Version Code"
          {...register("code")}
        />
        <PrimaryInput
          label="Note "
          required={true}
          placeholder="Enter App Note"
          {...register("note")}
        />
      </div>

      <Button>{type === "add" ? "Add" : "Edit"}</Button>
    </Modal.AsyncForm>
  );
};
