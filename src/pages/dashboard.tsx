import { NextPage } from "next";
import withAuth from "@/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { useAuthStore } from "@/modules/auth/useTokenStore";

const Dashboard: NextPage = () => {
  const role = useAuthStore().user.role;

  return (
    <MainLayout>
      <div className="flex items-center h-[80vh] justify-center text-5xl font-bold">
        You have {role && role.name} access
      </div>
    </MainLayout>
  );
};

export default withAuth(Dashboard);
