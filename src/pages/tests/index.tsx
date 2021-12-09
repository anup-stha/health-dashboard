import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";

const Tests = () => {
  return <MainLayout>Hello</MainLayout>;
};

export default withAuth(withRole(Tests));
