import { alert } from "@/components/Alert";
import { HookInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { TableView } from "@/components/Table";
import { postMemberCategory } from "@/services/requests/memberRequests";
import { useForm } from "react-hook-form";
import { useRoleStore } from "../roles/useRoleStore";

export const MemberField = () => {
  const { memberCategoryList, selectedRole } = useRoleStore();

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center w-3/4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Member Detail Category
          </h1>
          <p className="text-lg font-semibold text-gray-500">
            Click on any field to add, update or remove details fied for{" "}
            {selectedRole.name}
          </p>
        </div>
        <MemberCategoryModal />
      </div>
      <div>
        <TableView
          loading={false}
          tableHeadings={["name", "slug", "value Type", "Required"]}
          data={memberCategoryList}
          width="w-3/4"
          tableRowComponent={<MemberFieldTableRow />}
        />
      </div>
    </div>
  );
};

export const MemberFieldTableRow = ({ data, key }: any) => {
  return (
    <tr key={key}>
      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850 w-auto">
        {data.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850 w-auto">
        {data.slug}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850 w-auto">
        {data.value_type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-850 w-auto">
        {data.required ? "true" : "false"}
      </td>
    </tr>
  );
};

export const MemberCategoryModal = () => {
  const { register, handleSubmit, reset } = useForm();
  const { selectedRole } = useRoleStore();

  return (
    <Modal>
      <Modal.Button type="open" variant="button">
        Add Category
      </Modal.Button>
      <Modal.Content width="2xl">
        <Modal.Title>Add Category</Modal.Title>
        <form className="space-y-8">
          <div className="space-y-4">
            <HookInput
              label="Name"
              type="text"
              placeholder="Enter Name"
              {...register("name")}
            />
            <HookInput
              label="Slug"
              type="text"
              placeholder="Enter Slug"
              {...register("slug")}
            />

            <HookInput
              label="Value Type"
              type="text"
              placeholder="Enter type of value"
              {...register("value_type")}
            />
            <HookInput
              label="Required"
              type="required"
              placeholder="Enter Required Field"
              {...register("required")}
            />
          </div>
          <Modal.Button
            type="close"
            variant="button"
            onClick={handleSubmit(async (data) => {
              await alert({
                promise: postMemberCategory({
                  ...data,
                  role_id: selectedRole.id,
                }).then(() => reset()),
                msgs: {
                  loading: "Adding Category",
                  success: "Added Successfully",
                },
                id: "Member Category Toast",
              });
            })}
          >
            Add User
          </Modal.Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};
