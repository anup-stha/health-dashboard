import { alert } from "@/components/Alert";
import { HookInput } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { TableView } from "@/components/Table";
import {
  postMemberCategory,
  updateMemberCategory,
} from "@/services/requests/memberRequests";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Edit } from "react-feather";
import { useForm } from "react-hook-form";
import { useRoleStore } from "../roles/useRoleStore";

export const MemberField = () => {
  const { memberCategoryList, selectedRole } = useRoleStore();

  return (
    <Disclosure>
      {({ open }) => (
        <div className="bg-white shadow-E500 w-2/3 py-8 px-8 rounded-sm flex flex-col text-left">
          <Disclosure.Button className="w-full flex text-left justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Member Detail Category
              </h1>
              <p className="text-lg font-semibold text-gray-500">
                Click on any field to add, update or remove details fied for{" "}
                {selectedRole.name}
              </p>
            </div>
            <div className="flex items-center">
              <ChevronUpIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-12 h-12 text-green-500`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className=" pt-4 pb-2 text-sm text-gray-500">
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="w-full flex flex-col space-y-4">
                {memberCategoryList.length !== 0 && (
                  <TableView
                    loading={false}
                    tableHeadings={[
                      "name",
                      "slug",
                      "value Type",
                      "Required",
                      "",
                    ]}
                    data={memberCategoryList}
                    tableRowComponent={<MemberFieldTableRow />}
                  />
                )}

                <div className="self-start">
                  {open && <MemberCategoryModal type="add" />}
                </div>
              </div>
            </Transition>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export const MemberFieldTableRow = ({ data, key }: any) => {
  return (
    <tr key={key}>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-gray-850 w-auto">
        {data.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700 w-auto">
        {data.slug}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700 w-auto">
        {data.value_type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-700 w-auto">
        {data.required ? "Yes" : "No"}
      </td>
      <td className="text-lg hover:text-gray-800 cursor-pointer px-6 py-4">
        <MemberCategoryModal type="edit" id={data.id} />
      </td>
    </tr>
  );
};

type memberCategoryModalProps =
  | {
      type: "add";
      id?: never;
    }
  | {
      type: "edit";
      id: number;
    };

export const MemberCategoryModal: React.FC<memberCategoryModalProps> = ({
  type,
  id,
}) => {
  const { selectedRole, memberCategoryList } = useRoleStore();
  const categoryInitialData =
    id && memberCategoryList.filter((category) => category.id === id)[0];
  console.log(categoryInitialData);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: categoryInitialData ? categoryInitialData : {},
  });

  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" variant="button">
          Add Category
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <Edit size={24} />
        </Modal.Button>
      )}

      <Modal.Content width="2xl">
        <Modal.Title>{type === "edit" ? "Edit" : "Add"} Category</Modal.Title>
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
              type === "add"
                ? await alert({
                    promise: postMemberCategory({
                      ...data,
                      role_id: selectedRole.id,
                    }).then(() => reset()),
                    msgs: {
                      loading: "Adding Category",
                      success: "Added Successfully",
                    },
                    id: "Member Category Toast",
                  })
                : await alert({
                    promise: updateMemberCategory(
                      {
                        name: data.name,
                        slug: data.slug,
                        value_type: data.value_type,
                        required: data.required,
                      },
                      id ?? 0
                    ).then(() => reset()),
                    msgs: {
                      loading: "Updating Category",
                      success: "Updated Successfully",
                    },
                    id: "Member Update Category Toast",
                  });
            })}
          >
            Add Category
          </Modal.Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};
