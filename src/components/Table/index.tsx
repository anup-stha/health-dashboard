/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/12/21, 9:25 AM
 *
 *
 */

import type { JSXElementConstructor, ReactElement } from "react";
import React from "react";

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
  loading,
}) => {
  const headings = tableHeadings ? tableHeadings : Object.keys(tableData[0]);

  return !loading ? (
    <div className="flex flex-col">
      <div className="sm:-mx-8 lg:-mx-8">
        <div
          className={`py-2 align-middle ${
            width === "full" ? "min-w-full" : width
          } sm:px-6 lg:px-8 relative`}
        >
          <div className="lg:overflow-x-auto lg:overflow-y-scroll h-full z-0 overflow-hidden rounded-md sm:rounded-sm shadow-E500">
            <table className="min-w-full divide-y divide-gray-200 ">
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
                              className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850 w-auto"
                            >
                              {d.toString()}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
