/*
 * Created By Anup Shrestha
 * Copyright (c) 2021. All rights reserved.
 * Last Modified 12/11/21, 9:58 AM
 *
 *
 */

import { RoleMemberCategoryModal } from "../modal/roleMemberCategoryModal";

export const RoleMemberCategoryTableRow = ({ data, key }: any) => {
  return (
    <tr key={key}>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-primary_gray-850 w-auto">
        {data.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-primary_gray-700 w-auto">
        {data.slug}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-primary_gray-700 w-auto">
        {data.value_type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-primary_gray-700 w-auto">
        {data.required ? "Yes" : "No"}
      </td>
      <td className="text-lg hover:text-primary_gray-800 cursor-pointer px-6 py-4">
        <RoleMemberCategoryModal type="edit" id={data.id} />
      </td>
    </tr>
  );
};
