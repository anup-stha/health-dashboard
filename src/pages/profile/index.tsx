import withAuth from "@/hoc/withAuth";
import { MainLayout } from "@/layout/MainLayout";
import { ProfilePage } from "@/modules/profile";

const Profile = () => {
  return (
    <MainLayout>
      <ProfilePage />;
    </MainLayout>
  );
};
export default withAuth(Profile);
