import { Button } from "@/components/Button";
import { LabelInput, LabelTextArea } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { MainLayout } from "@/layout/MainLayout";
import { Field, Formik } from "formik";
import { Plus } from "phosphor-react";
import { RoleCard } from "./RoleCard";

const userRoleJSON = [
  {
    id: 3,
    title: "Assistant Developer",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 0,
  },
  {
    id: 1,
    title: "Super Admin",
    description:
      "Super Admin has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 40,
  },
  {
    id: 2,
    title: "Main Developer",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },

  {
    id: 4,
    title: "Marketing",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },
  {
    id: 5,
    title: "Account",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },
  {
    id: 6,
    title: "Support",
    description:
      "Developer has complete access to all objects, folders, role and groups in the system",
    permissionsCount: 12,
  },
];

const RolePage = () => {
  return (
    <MainLayout>
      <div className="px-10 py-10 overflow-visible sm:p-8">
        <div className="flex flex-col space-y-2 ">
          <h1 className="text-5xl font-semibold text-gray-900">Roles</h1>
          <p className="text-2xl font-semibold text-gray-500">
            Click on any role to add, update or delete permissions
          </p>
        </div>
        <div className="w-full py-8 flex flex-wrap gap-[1%] gap-y-5">
          {userRoleJSON.map((role) => (
            <RoleCard
              key={role.id}
              id={role.id}
              title={role.title}
              description={role.description}
              permissionCount={role.permissionsCount}
            />
          ))}
          <Modal>
            <Modal.Button type="open" width="full">
              <div className=" text-3xl font-semibold text-green-600 flex flex-col items-center justify-center overflow-hidden h-64 w-[32%] bg-transparent cursor-pointer border-dashed border-2 border-green-600  shadow-inner rounded-lg">
                <div className="flex flex-col items-center w-full">
                  <Plus size={56} />
                  <h1 className="">Add a Role</h1>
                </div>
              </div>
            </Modal.Button>

            <Modal.Content title="Add Role">
              <Modal.Title>Add A Role</Modal.Title>
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                }}
                onSubmit={(values) => console.log(values)}
              >
                {() => (
                  <form className="space-y-8">
                    <div className="space-y-2">
                      <Field
                        name="Title"
                        type="text"
                        component={LabelInput}
                        placeholder={"Enter Role Title"}
                      />
                      <Field
                        name="Description"
                        type="textarea"
                        component={LabelTextArea}
                        placeholder={"Enter Role Description"}
                      />
                    </div>

                    <Button>Add</Button>
                  </form>
                )}
              </Formik>
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </MainLayout>
  );
};

export default RolePage;
