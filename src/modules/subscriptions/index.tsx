import { listRole } from "@/services/requests/roleRequests";
import { useEffect, useState } from "react";
import { MemberRoleDropdown } from "../members/others/memberRoleDropDown";
import { useRoleStore } from "../roles/useRoleStore";
import { SubscriptionModal } from "./subscriptionModal";
import { SubscriptionTable } from "./subscriptionTable";

const SubscriptionPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    useRoleStore.getState().roleList.length === 0 && getRoles();
  });

  return (
    <div className="px-10 py-10 overflow-visible sm:p-8">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:space-y-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-850">
              Subscriptions
            </h1>
            <p className="text-lg font-semibold text-gray-500">
              List of all subscriptions in a tabulated view. If not data found,
              please change role.
            </p>
          </div>

          <div className="flex space-x-4">
            {!loading && <MemberRoleDropdown />}
            <SubscriptionModal type="add" />
          </div>
        </div>
        <SubscriptionTable />
      </div>
    </div>
  );
};

export default SubscriptionPage;
