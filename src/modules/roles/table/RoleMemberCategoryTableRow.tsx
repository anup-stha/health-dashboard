/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 5/1/22, 3:54 PM
 *
 */

import { RoleMemberCategoryModal } from "../modal/roleMemberCategoryModal";

export const RoleMemberCategoryTableRow = ({ data, key }: any) => {
  return (
    <tr key={key} data-testid="detail_cat_row">
      <td
        className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-850 w-auto"
        data-testid={`detail_cat_row_name_${data.id}`}
      >
        {data.name}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700 w-auto"
        data-testid={`detail_cat_row_slug_${data.id}`}
      >
        {data.slug}
      </td>
      <td
        className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700 w-auto"
        data-testid={`detail_cat_row_value_type_${data.id}`}
      >
        {data.value_type}
      </td>
      <td
        data-testid={`detail_cat_row_required_${data.id}`}
        className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700 w-auto"
      >
        {data.required ? "Yes" : "No"}
      </td>
      <td className="text-lg hover:text-gray-800 cursor-pointer px-6 py-4">
        <RoleMemberCategoryModal type="edit" id={data.id} />
      </td>
    </tr>
  );
};
