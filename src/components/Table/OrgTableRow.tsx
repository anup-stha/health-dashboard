import { OrganizationDetailType } from "@/types";
import { format } from "date-fns";
import { Copy, Edit, MoreVertical } from "react-feather";
import { DefaultAvatar } from "../Avatar";
import { BooleanTag } from "../others/BooleanTag";

type OrgTableRowType = {
  data?: OrganizationDetailType;
  key?: any;
};

export const OrgTableRow: React.FC<OrgTableRowType> = ({ data, key }) => {
  return data ? (
    <tr
      key={key}
      className="px-16 text-xl font-medium text-gray-800 lg:text-xl sm:px-0"
    >
      <td>
        <DefaultAvatar name={data && data.name} />
      </td>
      <td>
        <BooleanTag
          type="error"
          condition={data && data.active}
          trueStatement="Active"
          falseStatement="InActive"
        />
        {data.active}
      </td>
      <td>
        <BooleanTag
          type="error"
          condition={data && data.active}
          trueStatement="Verified"
          falseStatement="Not Verified"
        />
        {data.verified}
      </td>
      <td>{format(Date.parse(data?.createdAt), "dd MMM yyyy")}</td>

      <td className="capitalize">{data && data.ownerName}</td>
      <td className="px-0 py-4">
        <div className="flex items-center space-x-4">
          <Copy
            name="copy"
            className="text-gray-400 cursor-pointer hover:text-gray-800"
          />
          <Edit
            name="edit"
            className="text-gray-400 cursor-pointer hover:text-gray-800"
          />
          <MoreVertical
            name="more-vertical"
            className="text-gray-400 cursor-pointer hover:text-gray-800"
          />
        </div>
      </td>
    </tr>
  ) : (
    <div>Loading</div>
  );
};

export const OrgCard: React.FC<OrgTableRowType> = ({ data, key }) => {
  return data ? (
    <div
      key={key}
      className="hidden w-full px-4 py-6 bg-white rounded-sm sm:block sm:text-base shadow-E200"
    >
      <div className="flex flex-col space-y-12">
        <div className="flex items-center justify-between">
          <DefaultAvatar name={data && data.name} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div>
              <BooleanTag
                type="warning"
                condition={data?.active}
                trueStatement="Doctor"
                falseStatement="Patient"
              />
            </div>
            <div>
              <BooleanTag
                type="error"
                condition={data.verified}
                trueStatement="Active"
                falseStatement="InActive"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Copy
              name="copy"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
            <Edit
              name="edit"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
            <MoreVertical
              name="more-vertical"
              className="text-gray-400 cursor-pointer hover:text-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};
