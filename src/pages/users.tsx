import { addOrganisations } from "@/services/requests/authRequests";
import type { NextPage } from "next";
import { MainLayout } from "../layout/MainLayout";

const UserPage: NextPage = () => {
  return (
    <MainLayout>
      {" "}
      <button
        onClick={async () => {
          await addOrganisations({
            name: "andde",
            verified: false,
            active: true,
            meta: {},
            owner: "1",
          }).then((response) => console.log(response));
        }}
      >
        ndedbe
      </button>{" "}
    </MainLayout>
  );
};

export default UserPage;
