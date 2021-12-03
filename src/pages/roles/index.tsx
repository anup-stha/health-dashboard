import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import RolePage from "@/modules/roles";
import { useRoleStore } from "@/modules/roles/useRoleStore";
import { listRole } from "@/services/requests/authRequests";
import { useEffect } from "react";

const Roles = () => {
  useEffect(() => {
    const listRoles = async () => {
      await listRole()
        .then((response) => {
          useRoleStore.getState().setRoleList(response.data.data);
        })
        .catch((error) => console.log(error));
    };
    listRoles();
  }, []);

  return <RolePage />;
};

export default withRole(withAuth(Roles));
