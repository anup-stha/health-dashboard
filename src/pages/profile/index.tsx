import withAuth from "@/hoc/withAuth";
import { ProfilePage } from "@/modules/profile";

const Profile = () => {
  return <ProfilePage />;
};

export default withAuth(Profile);
