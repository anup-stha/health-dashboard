/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/3/22, 8:03 PM
 *
 *
 */

import { Plus } from "phosphor-react";
import React from "react";

import { Modal } from "@/components/Modal/useModal";

import { AppReleaseForm } from "@/modules/app/components/AppReleaseForm";

type AppForm = {
  name: string;
  version: number;
  code: number;
  app_url: string;
  note: string[];
  app_file?: File;
};

type AppReleaseModalProps =
  | {
      type: "add";
      id?: never;
      defaultValues?: never;
    }
  | {
      type: "edit";
      id: number;
      defaultValues: AppForm;
    };

export const AppReleaseModal = ({ type, id, defaultValues }: AppReleaseModalProps) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div className=" text-3xl h-52 font-medium text-primary-500 flex flex-col items-center justify-center overflow-hidden gap-12  bg-transparent cursor-pointer border-dashed border-2 border-primary-600  shadow-inner rounded-lg">
            <div className="flex flex-col items-center w-full">
              <Plus size={40} />
              <h1 className="">Add App Release</h1>
            </div>
          </div>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <div className="text-xl font-medium text-neutral-700 hover:underline hover:text-neutral-800 px-4 cursor-pointer">
            Edit App
          </div>
        </Modal.Button>
      )}

      <Modal.Content title="Add Role">
        <Modal.Title>{type === "add" ? "Add" : "Edit"} App</Modal.Title>
        <AppReleaseForm type={type} id={id} defaultValues={defaultValues} />
      </Modal.Content>
    </Modal>
  );
};
