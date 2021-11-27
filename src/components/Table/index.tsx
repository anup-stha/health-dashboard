import type { JSXElementConstructor, ReactElement } from "react";
import React from "react";

type TableViewPropsType = {
  data: any;
  tableHeadings?: string[];
  tableRowComponent?: ReactElement<any, string | JSXElementConstructor<any>>;
  loading: boolean;
};

export const TableView: React.FC<TableViewPropsType> = ({
  data: tableData,
  tableHeadings,
  tableRowComponent,
  loading,
}) => {
  const headings = tableHeadings ? tableHeadings : Object.keys(tableData[0]);

  return (
    <div className="flex flex-col">
      <div className="sm:-mx-8 lg:-mx-8">
        <div className="py-2 align-middle  min-w-full  sm:px-6 lg:px-8">
          <div className="shadow-E500 overflow-x-auto overflow-y-hidden rounded-sm sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headings.map((heading, index) => (
                    <th
                      scope="col"
                      key={index}
                      className=" px-6 pb-3 pt-4 text-left text-base font-semibold text-gray-500 uppercase tracking-wider"
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
                      console.log(data[headings[index]]);
                      return (
                        <tr key={index}>
                          {Object.values(data).map((d: any, index) => (
                            <td
                              key={index}
                              className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850"
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
  );
};