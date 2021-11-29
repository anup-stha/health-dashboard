import { Button, InfoButton } from "@/components/Button";
import { LabelInput, LabelTextArea } from "@/components/Input";
import { Modal } from "@/components/Modal/useModal";
import { Field, Formik } from "formik";
import { Plus } from "phosphor-react";

type RoleModalProps = {
  type?: "add" | "edit";
};

const RoleModal: React.FC<RoleModalProps> = ({ type }) => {
  return (
    <Modal>
      {type === "add" ? (
        <Modal.Button type="open" width="full">
          <div className=" text-3xl font-semibold text-green-600 flex flex-col items-center justify-center overflow-hidden h-64 w-[32%] bg-transparent cursor-pointer border-dashed border-2 border-green-600  shadow-inner rounded-lg">
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

              <Button>{type === "add" ? "Add" : "Edit"}</Button>
            </form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default RoleModal;
