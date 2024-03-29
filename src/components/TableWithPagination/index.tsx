/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import React from "react";
import useSWR from "swr";

import { Pagination } from "../Pagination";
import { UserCardView, UserTableRowComponent } from "../Table/DefaultUserTableRow";
import { Table } from "../Table/Table";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export const TableWithPagination: React.FC = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(1);

  const { data } = useSWR(`https://612f63c05fc50700175f15d8.mockapi.io/users?page=${pageIndex}&limit=10`, fetcher);

  const { data: nextPageData } = useSWR(
    `https://612f63c05fc50700175f15d8.mockapi.io/users?page=${pageIndex + 1}&limit=10`,
    fetcher
  );

  return (
    <div className="px-2 py-2">
      <Table
        data={data}
        tableHeadings={["Name", "Status", "Email", "Country", "Active"]}
        tableRowComponent={<UserTableRowComponent />}
        tableMobileViewComponent={<UserCardView />}
      />
      <div style={{ display: "none" }}>
        <Table
          data={nextPageData}
          tableHeadings={["Name", "Status", "Email", "Country", "Active"]}
          tableRowComponent={<UserTableRowComponent />}
          tableMobileViewComponent={<UserCardView />}
        />
      </div>
      <div className="mt-8">
        <Pagination totalPageNumber={10} pageIndex={pageIndex} setPageIndex={setPageIndex} />
      </div>
    </div>
  );
};
