import { Button } from "@/components/Button";
import { logoutUser } from "@/lib/requests";
import { useTokenStore } from "@/modules/auth/useTokenStore";
import React, { useState } from "react";
import withAuth from "./../hoc/withAuthentication";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const onLogOut = async () => {
    setLoading(true);
    await logoutUser()
      .then(() => {
        useTokenStore.getState().removeTokens();
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <DashboardLayout>
      <Button onClick={onLogOut} loading={loading}>
        Log Out
      </Button>
    </DashboardLayout>
  );
};

const DashLayout: React.FC = ({ children }) => {
  return <div suppressHydrationWarning={true}>{children}</div>;
};

const DashboardLayout = withAuth(DashLayout);

export default Dashboard;
