/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import React, { ReactElement, useState } from "react";

import { ListBox } from "../Listbox";

export interface TableProps {
  data: Record<string, any>;
  pageNumber?: number;
  pageLimit?: number;

  tableHeadings?: string[];
  tableRowComponent: ReactElement;
  tableMobileViewComponent?: ReactElement;
  setData?: any;
  setEdit?: any;
  setOrganisationList?: any;
  loading?: boolean;
}

export const Table: React.FC<TableProps> = ({
  data,
  tableHeadings,
  tableRowComponent,
  tableMobileViewComponent,
  setData,
  setEdit,
  setOrganisationList,
  loading,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | number>("table");
  const items = ["table", "cards"];

  return loading ? (
    <div>Loading</div>
  ) : (
    <>
      <div className="mb-6">
        <ListBox items={items} selected={selectedItem} setSelected={setSelectedItem} onlyMobile={true} />
      </div>

      <div
        className={`w-full px-6 bg-white rounded-sm shadow-E200 overflow-x-auto ${
          selectedItem === "table" ? "sm:block" : "sm:hidden"
        } `}
      >
        <table className="w-full">
          <thead>
            <tr className="px-2 border-b border-gray-200">
              {tableHeadings &&
                tableHeadings.map((heading) => (
                  <th className="p-6 text-xl font-bold text-left text-gray-800 lg:text-xl" key={heading}>
                    {heading}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((data: any) =>
                React.cloneElement(tableRowComponent, {
                  key: data.id,
                  data: data,
                  setData: setData,
                  setEdit: setEdit,
                  setOrganisationList: setOrganisationList,
                })
              )}
          </tbody>
        </table>
      </div>
      {tableMobileViewComponent && selectedItem === "cards" ? (
        <div className="hidden w-full sm:flex sm:flex-col sm:space-y-6">
          {data &&
            data.map((data: any) =>
              React.cloneElement(tableMobileViewComponent, {
                key: data.id,
                data: data,
              })
            )}
        </div>
      ) : null}
    </>
  );
};
