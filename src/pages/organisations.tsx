import type { NextPage } from "next";
import { useEffect } from "react";

import withAuth from "@/hoc/withAuth";
import OrganisationPage from "@/modules/organisations";
import { useOrgStore } from "@/modules/organisations/useOrgStore";
import { listOrganisations } from "@/services/requests/authRequests";

const Organisation: NextPage = () => {
  const {
    orgList: orgList,
    setOrgList,
    toggleLoading,
    setError,
  } = useOrgStore();

  useEffect(() => {
    const listOrg = async () => {
      toggleLoading();
      await listOrganisations()
        .then((response) => {
          setOrgList(response.data);
          toggleLoading();
        })
        .catch((error) => {
          toggleLoading();
          setError(error);
        });
    };

    orgList.length === 0 && listOrg();
  }, [orgList.length, setError, setOrgList, toggleLoading]);

  /**  !open ? "ml-36 mt-24 mb-8 mr-12" : "ml-[20%] mt-24 mr-12 mb-8" */

  return <OrganisationPage />;
};

export default withAuth(Organisation);
