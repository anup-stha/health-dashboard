import { NextPage } from "next";
import withAuth from "@/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { ImageAvatar } from "@/components/Avatar";

const Dashboard: NextPage = () => {
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
    <MainLayout>
      <div className="flex items-center h-[80vh] justify-center">
        <ImageAvatar />
      </div>
    </MainLayout>
  );
};

export default withAuth(Dashboard);
