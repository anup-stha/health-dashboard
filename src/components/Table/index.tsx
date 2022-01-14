/*
 * Created By Anup Shrestha
 * Copyright (c) 2021-2022. All rights reserved.
 * Last Modified 1/14/22, 11:45 AM
 *
 *
 */

import type { JSXElementConstructor, ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { SearchInput } from "@/components/Input";
import Image from "next/image";
import { MagnifyingGlass, X } from "phosphor-react";
import { useRouter } from "next/router";
import { Pagination } from "@/components/Pagination";
import { PaginationObject } from "@/types";

type TableViewPropsType = {
  data: Array<{ [key: string]: any }>;
  width?: "full" | string;
  searchTerms?: string[];
  tableHeadings?: string[];
  tableRowComponent?: ReactElement<any, string | JSXElementConstructor<any>>;
  loading?: boolean;
  search?: boolean;
  paginate?: boolean;
  paginateObject?: PaginationObject;
};

export const TableView: React.FC<TableViewPropsType> = ({
  data: tableInitialData,
  tableHeadings,
  tableRowComponent,
  loading = false,
  search = true,
  searchTerms = ["name"],
  paginate = false,
  paginateObject,
}) => {
  console.log(loading);

  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(
    router.query.page ? +router.query.page : 1
  );
  const [tableData, setTableData] = useState(tableInitialData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTableData(tableInitialData);
  }, [tableInitialData]);

  const headings = tableHeadings
    ? tableHeadings
    : tableData.length !== 0 && Object.keys(tableData[0]);

  return (
    <div>
      {!loading ? (
        <div className={"flex flex-col space-y-2"}>
          {search && (
            <div className="flex space-x-6 max-w-xl relative print:hidden ml-1">
              <SearchInput
                value={searchTerm}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setSearchTerm(e.target.value);
                    setTableData(tableInitialData);
                    return;
                  }
                  setSearchTerm(e.target.value);
                  const searchedData = tableInitialData.filter((data) => {
                    return searchTerms?.some((term) =>
                      data[term]
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase().trim())
                    );
                  });

                  console.log(searchedData);
                  searchedData && setTableData(searchedData);
                }}
                placeholder={"Start Searching ...."}
              />
              <div
                className={"absolute right-4 top-[48%] -translate-y-[50%]"}
                onClick={() => {
                  setSearchTerm("");
                  setTableData(tableInitialData);
                }}
              >
                {searchTerm !== "" ? (
                  <X
                    stroke={"transparent"}
                    className={
                      "cursor-pointer stroke-2 text-gray-500 hover:text-gray-700 peer-focus-visible:text-red-500"
                    }
                    size={24}
                  />
                ) : (
                  <MagnifyingGlass
                    stroke={"transparent"}
                    className={
                      "cursor-pointer stroke-2 text-gray-500 hover:text-gray-700 peer-focus-visible:text-red-500"
                    }
                    size={24}
                  />
                )}
              </div>
            </div>
          )}

          {tableData.length === 0 ? (
            <div className="flex justify-center items-start">
              <div className="w-[48vw] h-[60vh] md:w-full md:h-[50vh] relative">
                <Image
                  src="/assets/empty.svg"
                  alt="Empty State"
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col ">
              <div className="overflow-x-auto print:sidebar">
                <div className="px-1 py-2 align-middle inline-block min-w-full print:p-0">
                  <div className="shadow-E100 overflow-hidden border-b border-gray-200 sm:rounded-lg rounded-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          {headings &&
                            headings.map((heading, index) => (
                              <th
                                scope="col"
                                key={index}
                                className="px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-600 uppercase tracking-wider"
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {paginate && paginateObject && paginateObject.total_pages > 1 && (
            <div className="pt-2">
              <Pagination
                totalPageNumber={paginateObject.total_pages}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
