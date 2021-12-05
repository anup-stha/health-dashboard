import { Member } from "@/types";
import { MoreVertical } from "react-feather";

// import { OrganisationModal } from "./orgModal";
import { BooleanTag } from "../../components/others/BooleanTag";

// import { alert } from "../../components/Alert";
// import { onDeleteOrg } from "@/services/requests/orgRequests";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { toggleActiveOrg } from "@/services/requests/authRequests";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MemberTableLoadingState } from "@/components/state/TableLoadingState";

import { DeleteModal } from "@/components/Modal/DeleteModal";
import { memberStore } from "./memberStore";

import Link from "next/link";
import { CaretDoubleRight } from "phosphor-react";
import { OrganisationModal } from "./orgModal";

type OrgTableRowType = {
  data?: Member;
  key?: string | number;
  loading?: boolean;
};

export const MemberTableRow: React.FC<OrgTableRowType> = ({
  data,
  key,
  loading,
}) => {
  return !loading ? (
    data ? (
      <tr key={key}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="relative flex-shrink-0 h-16 w-16">
              <Image
                src={`https://i.pravatar.cc/150?img=${Math.floor(
                  Math.random() * 20
                )}`}
                layout="fill"
                objectFit="cover"
                className=" rounded-full"
                alt="Profile"
              />
            </div>
            <div className="ml-4">
              <div className="text-xl font-semibold text-gray-900 w-full">
                {!loading ? data.name : <Skeleton count={5} duration={2} />}
              </div>
              <div className="text-lg font-medium text-gray-500">
                sunya@health.com
              </div>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap text-lg">
          <BooleanTag
            type="error"
            condition={data && data.active}
            trueStatement="Active"
            falseStatement="InActive"
          />
          {data.active}
        </td>
        <td className="whitespace-nowrap text-lg">
          <BooleanTag
            type="error"
            condition={data && data.verified}
            trueStatement="Verified"
            falseStatement="Not Verified"
          />
        </td>
        <td className="font-medium px-6 py-4 whitespace-nowrap text-lg text-gray-500">
          {data.phone}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-lg text-gray-900 font-medium">
            {data.address}
          </div>
          <div className="text-lg text-gray-500 font-medium">
            <Link
              href={`https://maps.google.com/?q=${data.lat},${data.lng}`}
              passHref
            >
              <span className="flex items-center cursor-pointer hover:text-gray-800">
                Google Maps <CaretDoubleRight size={16} />
              </span>
            </Link>
          </div>
        </td>

        <td className="px-0 py-4">
          <div className="flex items-center space-x-4">
            <OrganisationModal type="update" orgId={data.id} />
            <DeleteModal
              onDelete={async () => {
                // await alert({
                //   type: "promise",
                //   promise: onDeleteOrg(data.id),
                //   msgs: {
                //     loading: `Deleting ${data.name}`,
                //     success: () => {
                //       return `Deleted ${data.name}`;
                //     },
                //     error: (data: any) => `${data}`,
                //   },
                // });
                console.log("ok");
              }}
              title="You are about to delete a member"
              subTitles={[
                "This will delete your member forever",
                "Are you sure ?",
              ]}
            />
            <Popover className="relative">
              {({ open }: any) => (
                <>
                  <Popover.Button>
                    <MoreVertical
                      name="more-vertical"
                      className=" text-gray-400 cursor-pointer hover:text-gray-800 -ml-2 mt-1"
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
                              //   await toggleActiveOrg(
                              //     {
                              //       name: data.name,
                              //       owner: data.owner,
                              //       meta: data.meta,
                              //       active: !data.active,
                              //     },
                              //     data.id
                              //   );
                              memberStore.getState().getMemberListFromServer();
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
                              //   await toggleActiveOrg(
                              //     {
                              //       name: data.name,
                              //       owner: data.owner,
                              //       meta: data.meta,
                              //       verified: !data.verified,
                              //     },
                              //     data.id
                              //   );
                              memberStore.getState().getMemberListFromServer();
                            }}
                            className="bg-white flex items-center transition duration-150 ease-in-out rounded-lg group hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-70"
                          >
                            <div className="py-2 text-xl flex items-center px-4 gap-2 text-gray-700  group-hover:text-white ">
                              <p className=" font-medium whitespace-nowrap  ">
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
    ) : null
  ) : (
    <MemberTableLoadingState count={5} />
  );
};