import { alert } from "@/components/Alert";
import { Button, InfoButton } from "@/components/Button";
import { LabelInput, LabelTextArea, Switch } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { addTest, addTestCategory } from "@/services/requests/testRequests";
import { Test } from "@/types";
import { Field, Formik } from "formik";
import { Plus } from "phosphor-react";
import * as Yup from "yup";

type RoleModalProps = {
  type?: "add" | "edit";
  id?: number | string;
  selectedTest?: Test;
};

const RoleSchema = Yup.object().shape({
  description: Yup.string().max(92, "Too long, Maximum 92 Characters"),
});

const TestModal: React.FC<RoleModalProps> = ({ type, id, selectedTest }) => {
  //   const roles = useRoleStore.getState().roleList;
  //   const role = roles.filter((element) => element.id == id)[0];

  const initialValues = {
    name: "",
    desc: "",
    slug: "",
    public: false,
  };
  //   : {
  //       title: role.name ?? "",
  //       description: role.desc,
  //       memberLimit: role.member_limit,
  //       public: role.public,
  //     };

  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div className=" text-3xl font-semibold text-green-600 flex flex-col items-center justify-center overflow-hidden h-64 bg-transparent cursor-pointer border-dashed border-2 border-green-600  shadow-inner rounded-lg">
            <div className="flex flex-col items-center w-full">
              <Plus size={56} />
              <h1 className="">Add a Test {selectedTest && "Category"}</h1>
            </div>
          </div>
        </Modal.Button>
      ) : (
        <Modal.Button type="open">
          <InfoButton>&nbsp;&nbsp;Edit&nbsp;&nbsp; </InfoButton>
        </Modal.Button>
      )}

      <Modal.Content title="Add Role">
        <Modal.Title>
          {type === "add" ? "Add" : "Edit"} A Test {selectedTest && "Category"}
        </Modal.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={RoleSchema}
          onSubmit={async (values) => {
            !selectedTest
              ? await alert({
                  promise: addTest(values),
                  msgs: {
                    loading: "Adding Test",
                    success: "Added Successfully",
                  },
                  id: "Test Add Toast",
                })
              : await alert({
                  promise: addTestCategory({
                    ...values,
                    test_category_id: Number(selectedTest.id),
                  }),
                  msgs: {
                    loading: "Adding Test Category",
                    success: "Added Successfully",
                  },
                  id: "Test Category Add Test",
                });
            console.log(values);
          }}
        >
          {({ values, errors, handleSubmit }) => {
            return (
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <Field
                    name="name"
                    type="text"
                    component={LabelInput}
                    placeholder={"Enter Test Name"}
                  />
                  <div className="flex items-end space-x-4">
                    <Field
                      name="slug"
                      type="text"
                      component={LabelInput}
                      placeholder={"Enter Slug"}
                    />
                  </div>
                  <Field
                    name="public"
                    component={Switch}
                    placeholder="Public"
                    checked={values.public}
                  />
                  <Field
                    name="desc"
                    type="textarea"
                    component={LabelTextArea}
                    error={errors.desc}
                    placeholder={"Enter Test Description"}
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

export default TestModal;
