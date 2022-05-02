/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/2/22, 4:46 PM
 *
 */

import React from "react";

import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { Modal } from "@/components/Modal/useModal";
import { TableView } from "@/components/Table";

import { DoctorTableRow } from "@/modules/members/components/table/DoctorTableRow";
import { AccessorQuery } from "@/modules/members/hooks/query/AccessorQuery";

export const DoctorAssignModal = () => {
  const { data } = AccessorQuery.useGetAllDoctors();

  return (
    <Modal>
      <Modal.Button type="open">
        <Button>Assign New Doctor</Button>
      </Modal.Button>

      <Modal.Content width="max-w-5xl">
        <div className="space-y-4">
          <Modal.Title>Assign New Doctor</Modal.Title>
          {data ? (
            <TableView
              search={false}
              data={data.list}
              tableHeadings={["Doctor Info", ""]}
              tableRowComponent={<DoctorTableRow />}
            />
          ) : (
            <Loader />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};
