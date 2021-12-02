import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import RolePage from "@/modules/roles";

const Roles = () => {
  return <RolePage />;
};

export default withRole(withAuth(Roles));
