import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";

const Subscription = () => {
  return <MainLayout></MainLayout>;
};

export default withAuth(withRole(Subscription));
