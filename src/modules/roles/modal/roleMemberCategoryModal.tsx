import { Modal } from "@/components/Modal/useModal";
import { Edit } from "react-feather";
import { RoleMemberCategoryForm } from "../form/roleMemberCategoryForm";

type memberCategoryModalProps = {
  type: "add" | "edit";
  id?: number;
};

export const RoleMemberCategoryModal: React.FC<memberCategoryModalProps> = ({
  type,
  id,
}) => {
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
        <RoleMemberCategoryForm type={type} id={id ? id : 0} />
      </Modal.Content>
    </Modal>
  );
};
