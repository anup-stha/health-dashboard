/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/13/22, 12:32 PM
 *
 *
 */

import { useAuthStore } from "../../src/modules/auth/useTokenStore";

Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "login",
  });

  cy.request("POST", "https://staging-api.sunya.health/api/v1/auth/login", {
    email: "superadmin@sunya.health",
    password: "sunya.health",
    device_type: "w",
  }).then(async (response) => {
    console.log(response);
    useAuthStore.getState().setUserData(response.body);
  });
});

export {};
