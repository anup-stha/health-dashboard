import { Sidebar } from "@/routes/Sidebar";
import { addons, mockChannel } from "@storybook/addons";
import React from "react";
import withAuth from "./../hoc/withAuthentication";

addons.setChannel(mockChannel());

const Dashboard: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  // const onLogOut = async () => {
  //   setLoading(true);
  //   await logoutUser()
  //     .then(() => {
  //       useTokenStore.getState().removeTokens();
  //       setLoading(false);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <DashboardLayout>
      {/* <Button onClick={onLogOut} loading={loading}>
        Log Out
      </Button> */}
      <div className="flex ">
        <Sidebar />

        <div className={"ml-[20%] mt-24 mr-8"}></div>
      </div>
    </DashboardLayout>
  );
};

const DashLayout: React.FC = ({ children }) => {
  return <div suppressHydrationWarning={true}>{children}</div>;
};

export const DashboardLayout = withAuth(DashLayout);

export default Dashboard;
