import { WarningButton } from "@/components/Button";
import { DeleteModal } from "@/components/Modal/DeleteModal";

export const DeleteZone = () => {
  return (
    <div className="bg-white shadow-E500 w-2/3 py-8 px-8 rounded-sm flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Delete this role
        </h1>
        <p className="text-lg font-semibold text-gray-500">
          Once you delete a repository, there is no going back. Please be
          certain.
        </p>
      </div>
      <DeleteModal
        closeButton={<WarningButton>Delete</WarningButton>}
        title="You are about to delete this role"
        subTitles={["This will delete your role forever", "Are you sure ?"]}
      />
    </div>
  );
};
