/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/28/21, 6:35 PM
 *
 *
 */

import type { JSXElementConstructor, ReactElement } from "react";
import React from "react";
import { Loader } from "@/components/Loader";

type TableViewPropsType = {
  data: any;
  width?: "full" | string;
  tableHeadings?: string[];
  tableRowComponent?: ReactElement<any, string | JSXElementConstructor<any>>;
  loading?: boolean;
};

export const TableView: React.FC<TableViewPropsType> = ({
  width = "full",
  data: tableData,
  tableHeadings,
  tableRowComponent,
  loading = false,
}) => {
  const headings = tableHeadings ? tableHeadings : Object.keys(tableData[0]);

  return !loading ? (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="px-1 py-2 align-middle inline-block min-w-full">
          <div className="shadow-E100 overflow-hidden border-b border-gray-200 sm:rounded-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {headings.map((heading, index) => (
                    <th
                      scope="col"
                      key={index}
                      className=" px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {tableRowComponent
                  ? loading === false
                    ? tableData.map((data: any) =>
                        React.cloneElement(tableRowComponent, {
                          key: data.id,
                          data,
                          loading,
                        })
                      )
                    : React.cloneElement(tableRowComponent, {
                        loading,
                      })
                  : tableData.map((data: any, index: number) => {
                      return (
                        <tr key={index}>
                          {Object.values(data).map((d: any, index) => (
                            <td
                              key={index}
                              className="capitalize px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850"
                            >
                              {d.toString()}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                <tr />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
