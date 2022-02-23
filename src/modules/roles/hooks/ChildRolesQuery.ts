/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/23/22, 10:02 AM
 *
 *
 */

import { useMutation } from "react-query";

import { assignChildRole } from "@/services/requests/roleRequests";

export const useAssign = () => {
  return useMutation(assignChildRole);
};

export const ChildRolesQuery = {
  useAssign,
};
