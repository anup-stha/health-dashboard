import React, { JSXElementConstructor, ReactElement } from "react";

export interface TableProps {
  data: Object[];
  pageNumber?: number;
  pageLimit?: number;
  tableHeadings?: string[];
  tableRowComponent: ReactElement<any, string | JSXElementConstructor<any>>;
  tableMobileViewComponent?: ReactElement<
    any,
    string | JSXElementConstructor<any>
  >;
}

export const Table: React.FC<TableProps> = ({
  data,
  tableHeadings,
  tableRowComponent,
  tableMobileViewComponent,
}) => {
  return (
    <>
      <div
        className={`w-full px-6 bg-white rounded-sm shadow-E200 sm:overflow-x-auto ${
          tableMobileViewComponent && "sm:hidden"
        } `}
      >
        <table className="w-full ">
          <thead>
            <tr className="px-2 border-b border-gray-200">
              {tableHeadings &&
                tableHeadings.map((heading) => (
                  <th
                    className="p-6 text-xl font-bold text-left text-gray-800 lg:text-xl"
                    key={heading}
                  >
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
                })
              )}
          </tbody>
        </table>
      </div>
      {tableMobileViewComponent ? (
        <div className="hidden w-full sm:flex sm:flex-col sm:space-y-12">
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
