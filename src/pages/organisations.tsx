// import type { NextPage } from "next";
// import { useEffect } from "react";
// import Head from "next/head";

import withAuth from "@/hoc/withAuth";
import { withRole } from "@/hoc/withRole";
import { MainLayout } from "@/layout/MainLayout";

// import withAuth from "@/hoc/withAuth";
// import OrganisationPage from "@/modules/organisations";
// import { useOrgStore } from "@/modules/organisations/useOrgStore";
// import { listOrganisations } from "@/services/requests/authRequests";

// cconst Organisation: NextPage = () => {
//   const {
//   const {
//     orgList: orgList,
//     setOrgList,
//     toggleLoading,
//     setError,
//   } = useOrgStore();

//   useEffect(() => {
//     const listOrg = async () => {
//       toggleLoading();
//       await listOrganisations()
//         .then((response) => {
//           setOrgList(response.data);
//           toggleLoading();
//         })
//         .catch((error) => {
//           toggleLoading();
//           setError(error);
//         });
//     };

//     orgList.length === 0 && listOrg();
//   }, []);

//   /**  !open ? "ml-36 mt-24 mb-8 mr-12" : "ml-[20%] mt-24 mr-12 mb-8" */

//   return (
//     <>
//       <Head>
//         <title>Organisations</title>
//       </Head>
//       <OrganisationPage />
//     </>
//   );
// };

// export default withAuth(Organisation);

const Organisations = () => {
  return <MainLayout></MainLayout>;
};

export default withRole(withAuth(Organisations));
