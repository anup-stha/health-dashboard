import { OrganisationDetailType } from "@/types";
import { format } from "date-fns";
import { Copy, Delete, Edit, MoreVertical } from "react-feather";
import { DefaultAvatar } from "../Avatar";
import { OrganisationModal } from "../model";
import { BooleanTag } from "../others/BooleanTag";
import { toast } from "react-hot-toast";
import { GrayButton, WarningButton } from "../Button";
import { alert } from "../Alert";
import { onDeleteOrg } from "@/lib/requests/orgRequests";

type OrgTableRowType = {
  data?: OrganisationDetailType;
  key?: string | number;
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
          condition={data && data.verified}
          trueStatement="Verified"
          falseStatement="Not Verified"
        />
      </td>
      <td>{format(Date.parse(data?.createdAt), "dd MMM yyyy")}</td>

      <td className="capitalize">{data && data.ownerName}</td>
      <td className="px-0 py-4">
        <div className="flex items-center space-x-4">
          <OrganisationModal
            type="update"
            initialValues={{
              name: data.name,
              active: data.active,
              verified: data.verified,
              owner: "sunya",
              description: data.meta.description,
              website: data.meta.website,
              phone: data.meta.phone,
              address: data.meta.address,
              zip: data.meta.zip,
              ward: data.meta.ward,
              municipality: data.meta.municipality,
              city: data.meta.city,
              country: data.meta.country,
              state: data.meta.state,
            }}
            orgId={data.id}
          />
          <Delete
            name="delete"
            className="text-gray-400 cursor-pointer hover:text-gray-800"
            onClick={() =>
              toast.custom(
                (t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } max-w-md space-y-4 px-8 py-6 flex-col items-center text-center w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 `}
                  >
                    <p className="text-2xl font-bold">
                      Do you want to delete {data.name} ?
                    </p>
                    <div className="flex space-x-4">
                      <div className="">
                        <WarningButton
                          onClick={async () => {
                            toast.dismiss(t.id);
                            await alert({
                              type: "promise",
                              promise: onDeleteOrg(data.id),
                              msgs: {
                                loading: `Deleting ${data.name}`,
                                success: () => {
                                  return `Deleted ${data.name}`;
                                },
                                error: (data: any) => `${data}`,
                              },
                            });
                          }}
                        >
                          Delete
                        </WarningButton>
                      </div>
                      <div className="">
                        <GrayButton onClick={() => toast.dismiss(t.id)}>
                          Cancel
                        </GrayButton>
                      </div>
                    </div>
                  </div>
                ),
                {
                  duration: Infinity,
                }
              )
            }
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
