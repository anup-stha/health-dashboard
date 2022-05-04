/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { Plus } from "phosphor-react";
import React from "react";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal/useModal";

import { TestAddEditForm } from "@/modules/tests/testAddEditForm";

import { Test } from "@/types";

type RoleModalProps = {
  variant: "test" | "subtest";

  type?: "add" | "edit";
  id?: number | string;
  selectedTest?: Test;
  children?: React.ReactNode;
};

export const TestModal: React.FC<RoleModalProps> = ({ type, id, variant, selectedTest, children }) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div
            data-testid="test-modal-add-btn"
            className=" text-3xl font-medium text-primary-600 flex flex-col items-center justify-center overflow-hidden h-64 bg-transparent cursor-pointer border-dashed border-2 border-primary-600  shadow-inner rounded-lg"
          >
            <div className="flex flex-col items-center w-full">
              <Plus size={56} />
              <h1 className="">Add a Test {selectedTest && "Category"}</h1>
            </div>
          </div>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          {children ? children : <Button color="secondary">&nbsp;&nbsp;Edit&nbsp;&nbsp; </Button>}
        </Modal.Button>
      )}

      <Modal.Content title="Add Role">
        <Modal.Title>
          {type === "add" ? "Add" : "Edit"} A Test {selectedTest && "Category"}
        </Modal.Title>
        <TestAddEditForm variant={variant} type={type ?? "add"} id={id} selectedTest={selectedTest} />
      </Modal.Content>
    </Modal>
  );
};
