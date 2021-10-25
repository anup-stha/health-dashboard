import React from "react";
import { AvatarWithEmail, DefaultAvatar } from "../Avatar";
import { BooleanTag } from "../others/BooleanTag";
import { Flag } from "../others/Flag";
import { Copy, MoreVertical } from "react-feather";
import { Edit } from "react-feather";

export const UserTableRowComponent = ({ data, key }: any) => {
  return (
    <>
      <tr
        key={key}
        className="px-16 text-xl font-medium text-gray-800 lg:text-xl sm:px-0"
      >
        <td>
          <DefaultAvatar name={data.name} image={data.avatar} />
        </td>
        <td>
          <BooleanTag
            type="warning"
            condition={data.isDoctor}
            trueStatement="Doctor"
            falseStatement="Patient"
          />
        </td>
        <td>{data.email}</td>
        <td>
          <Flag countryCode={data.country} />
        </td>
        <td>
          <BooleanTag
            type="error"
            condition={data.isActive}
            trueStatement="Active"
            falseStatement="InActive"
          />
        </td>

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
      {/* //FOR MOBILE SCREENS */}
    </>
  );
};

export const UserCardView = ({ data, key }: any) => {
  return (
    <div
      key={key}
      className="hidden w-full px-4 py-6 bg-white sm:block sm:text-lg rounded-xl shadow-E200"
    >
      <div className="flex flex-col space-y-12">
        <div className="flex items-center justify-between">
          <AvatarWithEmail
            name={data.name}
            email={data.email}
            image={data.avatar}
          />
          <Flag countryCode={data.country} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div>
              <BooleanTag
                type="warning"
                condition={data.isDoctor}
                trueStatement="Doctor"
                falseStatement="Patient"
              />
            </div>
            <div>
              <BooleanTag
                type="error"
                condition={data.isActive}
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
  );
};
