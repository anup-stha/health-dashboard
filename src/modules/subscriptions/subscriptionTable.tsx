import { TableView } from "@/components/Table";

import Image from "next/image";
import { useSubscriptionStore } from "./subscriptionStore";

export const SubscriptionTable = () => {
  const { subscriptionList, loading } = useSubscriptionStore();

  return subscriptionList.length === 0 ? (
    <div className="flex justify-center">
      <div className="w-[48vw] h-[70vh] relative">
        <Image
          src="/assets/empty.svg"
          alt="Empty State"
          layout="fill"
          objectFit="cover"
          priority={true}
        />{" "}
      </div>
    </div>
  ) : (
    <TableView
      data={subscriptionList}
      loading={loading}
      //   tableHeadings={[
      //     "Member Name",
      //     "Active Status",
      //     "Verified Status",
      //     "Phone Number",
      //     "Address",
      //     "",
      //   ]}
      //   loading={loading}
      //   tableRowComponent={<MemberTableRow />}
    />
  );
};
