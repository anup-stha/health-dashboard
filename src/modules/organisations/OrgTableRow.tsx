import { OrganisationDetailType } from "@/types";
import { format } from "date-fns";
import { Copy, Edit, MoreVertical, Trash } from "react-feather";
import { DefaultAvatar } from "../../components/Avatar";
import { OrganisationModal } from "./orgModal";
import { BooleanTag } from "../../components/others/BooleanTag";
import { toast } from "react-hot-toast";
import { GrayButton, WarningButton } from "../../components/Button";
import { alert } from "../../components/Alert";
import { onDeleteOrg } from "@/services/requests/orgRequests";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toggleActiveOrg } from "@/services/requests/authRequests";
import { useOrgStore } from "@/modules/organisations/useOrgStore";

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
      <td className="whitespace-nowrap">
        <BooleanTag
          type="error"
          condition={data && data.verified}
          trueStatement="Verified"
          falseStatement="Not Verified"
        />
      </td>
      <td>{format(Date.parse(data?.createdAt), "dd MMM yyyy")}</td>
      <td className="">{data && data.meta.phone}</td>
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
          <Trash
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
          <Popover className="relative">
            {({ open }: any) => (
              <>
                <Popover.Button>
                  <MoreVertical
                    name="more-vertical"
                    className=" text-gray-400 cursor-pointer hover:text-gray-800 -ml-2 mt-2"
                  />
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-52 p-2 mt-3 right-0 bg-white ring-1 ring-black ring-opacity-5 rounded-sm shadow-lg space-y-2">
                      <div className="overflow-hidden  ">
                        <a
                          onClick={async () => {
                            await toggleActiveOrg(
                              {
                                name: data.name,
                                owner: data.owner,
                                meta: data.meta,
                                active: !data.active,
                              },
                              data.id
                            );
                            useOrgStore.getState().getOrgListFromServer();
                          }}
                          className="bg-white flex items-center transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70"
                        >
                          <div className="py-2 text-xl flex items-center px-4 gap-2 text-gray-700  group-hover:text-white ">
                            <p className=" font-medium">
                              Set as {!data.active ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className="overflow-hidden">
                        <a
                          onClick={async () => {
                            await toggleActiveOrg(
                              {
                                name: data.name,
                                owner: data.owner,
                                meta: data.meta,
                                verified: !data.verified,
                              },
                              data.id
                            );
                            useOrgStore.getState().getOrgListFromServer();
                          }}
                          className="bg-white flex items-center transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70"
                        >
                          <div className="py-2 text-xl flex items-center px-4 gap-2 text-gray-700  group-hover:text-white ">
                            <p className=" font-medium  ">
                              Set as{" "}
                              {!data.verified ? "Verified" : "Unverified"}
                            </p>
                          </div>
                        </a>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover.Button>
              </>
            )}
          </Popover>
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
