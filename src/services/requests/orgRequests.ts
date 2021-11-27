import { useOrgStore } from "@/modules/organisations/useOrgStore";
import { OrganisationRequestType } from "@/types";
import {
  addOrganisations,
  deleteOrganisations,
  editOrganisations,
} from "./authRequests";

export const onAddOrg = async (body: OrganisationRequestType) => {
  return new Promise(
    async (resolve, reject) =>
      await addOrganisations(body)
        .then(async (response) => {
          useOrgStore.getState().getOrgListFromServer();

          resolve("Succesfully Added");
        })
        .catch((error) => {
          reject(new Error(error.message));
          useOrgStore.getState().setLoadingFalse();
        })
  );
};

export const onDeleteOrg = async (id: string | number) => {
  return new Promise(
    async (resolve, reject) =>
      await deleteOrganisations(id)
        .then(async (response) => {
          useOrgStore.getState().getOrgListFromServer();
          resolve("Succesfully Deleted");
        })
        .catch((error) => {
          useOrgStore.getState().setLoadingFalse();

          reject(
            new Error(
              "There were some problems deleting your organisation. Please try later"
            )
          );
        })
  );
};

export const onEditOrg = async (
  body: OrganisationRequestType,
  id: string | number
) => {
  return new Promise(
    async (resolve, reject) =>
      await editOrganisations(body, id)
        .then(async (response) => {
          useOrgStore.getState().getOrgListFromServer();
          resolve("Succesfully Edited");
        })
        .catch((error) => {
          console.log(error);
          useOrgStore.getState().setLoadingFalse();
          reject(
            new Error(
              "There were some problems editing your organisation. Please try later"
            )
          );
        })
  );
};