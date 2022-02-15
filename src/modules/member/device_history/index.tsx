/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/15/22, 2:33 PM
 *
 *
 */

import React from "react";
import { useUserDeviceHistory } from "@/modules/member/api/hooks/useUserDeviceHistory";
import { TableView } from "@/components/Table";
import { Device } from "@/modules/member/types";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import { WarningOctagon } from "phosphor-react";
import { GrayButton } from "@/components/Button";
import * as deviceHistory from "@/modules/member/api/hooks/useDeviceHistory";
import { toastAlert } from "@/components/Alert";
import { ProfileListLoadingState } from "@/components/state/ProfileSubsLoadingState";
import { DeleteModal } from "@/components/Modal/DeleteModal";

interface IDeviceHistory {
  member_id: number;
}

export const DeviceHistory = ({ member_id }: IDeviceHistory) => {
  const { data, isLoading } = useUserDeviceHistory(member_id);
  const { mutateAsync } = deviceHistory.useDelete(member_id);

  if (isLoading) {
    return <ProfileListLoadingState />;
  }

  return (
    <div className="print:hidden w-full sm:w-full space-y-8">
      <div className="flex justify-between items-center">
        <div className="print:hidden">
          <h1 className="text-gray-900 font-semibold text-3xl tracking-wider sm:text-2xl">
            Device History
          </h1>
          <h1 className="text-gray-500 font-medium text-lg print:hidden">
            List of all Devices that user has logged into.
          </h1>
        </div>
        {data && data.length !== 0 ? (
          <>
            <DeleteModal
              title={"Remove Device History"}
              subTitles={[
                "This will remove all devices and log you out of all devices you have logged into",
              ]}
              disabled={false}
              closeButton={<GrayButton>Remove History</GrayButton>}
              onDelete={async () => {
                await toastAlert({
                  type: "promise",
                  promise: mutateAsync(member_id),
                  msgs: {
                    loading: "Deleting Device History",
                    success: "Deleted Device History Successfully",
                  },
                  id: "device-history",
                });
              }}
            />
          </>
        ) : null}
      </div>
      {data && data.length !== 0 ? (
        <TableView
          data={data.sort((a, b) => (a.id < b.id ? 1 : -1))}
          tableRowComponent={<DeviceHistoryTableRow />}
          tableHeadings={["Device Info", "Device Model", "Device Details"]}
        />
      ) : (
        <div className="flex  items-center text-xl font-semibold text-red-400 space-x-2 ">
          <WarningOctagon size={24} /> <span>No Device Details Found</span>
        </div>
      )}
    </div>
  );
};

const DeviceHistoryTableRow = ({ data }: { data?: Device }) => {
  if (!data) {
    return <Loader />;
  }

  return (
    <tr key={data.id}>
      <td className="px-6 py-4 align-top">
        <div className="flex items-center ">
          <div
            className={`w-16 h-16 rounded-full object-contain overflow-hidden relative`}
          >
            <Image
              src={"/android.png"}
              layout={"fill"}
              objectFit={"cover"}
              alt={"profile"}
            />
          </div>
          <div className="ml-4 flex flex-col ">
            <div className="text-xl font-semibold text-gray-900  capitalize">
              {data.os_type} {data.device_detail["Version Code"]}
            </div>
            <div className="text-base font-medium text-gray-500 hover:text-gray-800">
              {data.app_slug}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap align-top">
        <div className="flex flex-col">
          <div className="text-xl font-semibold text-gray-700  capitalize">
            {data.device_detail.Model ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            {data.device_detail.Brand ?? "N/A"} -{" "}
            {data.device_detail.Board ?? ""}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            SDK : {data.device_detail.SDK ?? "N/A"}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 align-top whitespace-nowrap">
        <div className="inline">
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Device Id:{" "}
            {data.device_id === "none"
              ? data.device_id
              : data.device_id.split(" ")[1]}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Base: {data.device_detail.Base ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Id: {data.device_detail.ID ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Host: {data.device_detail.Host ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Incremental: {data.device_detail.Incremental ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Manufacture: {data.device_detail.Manufacture ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            User: {data.device_detail.User ?? "N/A"}
          </div>
          <div className="text-base font-medium text-gray-500 hover:text-gray-800 capitalize">
            Type: {data.device_detail.Type ?? "N/A"}
          </div>
        </div>
      </td>
    </tr>
  );
};
