import withAuth from "@/hoc/withAuth";
import RolePage from "@/modules/roles";

const Roles = () => {
  return <RolePage />;
};

export default withAuth(Roles);
