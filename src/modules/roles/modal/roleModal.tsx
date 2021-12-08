import { Button, InfoButton } from "@/components/Button";
import { LabelInput, LabelTextArea, Switch } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { addRole, updateRole } from "@/services/requests/roleRequests";
import { Field, Formik } from "formik";
import { Plus } from "phosphor-react";
import * as Yup from "yup";
import { useRoleStore } from "../useRoleStore";

type RoleModalProps = {
  type?: "add" | "edit";
  id?: number | string;
};

const RoleSchema = Yup.object().shape({
  description: Yup.string().max(92, "Too long, Maximum 92 Characters"),
});

const RoleModal: React.FC<RoleModalProps> = ({ type, id }) => {
  const roles = useRoleStore.getState().roleList;
  const role = roles.filter((element) => element.id == id)[0];

  const initialValues =
    type === "add"
      ? {
          title: "",
          description: "",
          memberLimit: "",
          public: false,
        }
      : {
          title: role.name ?? "",
          description: role.desc,
          memberLimit: role.member_limit,
          public: role.public,
        };

  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div className=" text-3xl font-semibold text-green-600 flex flex-col items-center justify-center overflow-hidden h-64 bg-transparent cursor-pointer border-dashed border-2 border-green-600  shadow-inner rounded-lg">
            <div className="flex flex-col items-center w-full">
              <Plus size={56} />
              <h1 className="">Add a Role</h1>
            </div>
          </div>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <InfoButton>&nbsp;&nbsp;Edit&nbsp;&nbsp; </InfoButton>
        </Modal.Button>
      )}

      <Modal.Content title="Add Role">
        <Modal.Title>{type === "add" ? "Add" : "Edit"} A Role</Modal.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={RoleSchema}
          onSubmit={(values) => {
            type === "add"
              ? addRole({
                  name: values.title,
                  memberLimit: Number(values.memberLimit),
                  isPublic: values.public,
                  description: values.description,
                }).then((response) => {
                  const list = useRoleStore.getState().roleList;
                  useRoleStore
                    .getState()
                    .setRoleList([response.data.data, ...list]);
                })
              : id &&
                updateRole({
                  id: Number(id),
                  name: values.title,
                  memberLimit: Number(values.memberLimit),
                  isPublic: values.public,
                  description: values.description,
                }).then((response) => {
                  const updatedArray = roles.map((role) =>
                    role.id === response.data.data.id
                      ? response.data.data
                      : role
                  );

                  useRoleStore.getState().setRoleList(updatedArray);
                });
          }}
        >
          {({ values, errors, handleSubmit }) => {
            return (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <Field
                    name="title"
                    type="text"
                    component={LabelInput}
                    placeholder={"Enter Role Title"}
                  />
                  <div className="flex items-end space-x-4">
                    <Field
                      name="memberLimit"
                      type="number"
                      component={LabelInput}
                      placeholder={"Enter Role Member Limit"}
                    />
                  </div>
                  <Field
                    name="public"
                    component={Switch}
                    placeholder="Public"
                    checked={values.public}
                  />
                  <Field
                    name="description"
                    type="textarea"
                    component={LabelTextArea}
                    error={errors.description}
                    placeholder={"Enter Role Description"}
                  />
                </div>

                <Modal.Button type="close">
                  <Button>{type === "add" ? "Add" : "Edit"}</Button>
                </Modal.Button>
              </form>
            );
          }}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default RoleModal;
