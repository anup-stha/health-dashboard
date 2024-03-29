/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import { useAuthStore } from "../../src/modules/auth/useTokenStore";
import { useGlobalState } from "../../src/modules/useGlobalState";

Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "login",
  });
  cy.intercept({
    method: "POST",
    url: "https://staging-api.sunya.health/api/v1/auth/login",
  }).as("login");

  cy.visit("http://localhost:3000");
  cy.get("[data-testid=email]").clear().type("superadmin@sunya.health");
  cy.get("[data-testid=password]").clear().type("sunya.health{enter}");
  cy.wait("@login");
});

Cypress.Commands.add("loginTest", () => {
  Cypress.log({
    name: "login",
  });

  cy.request("POST", "https://staging-api.sunya.health/api/v1/auth/login", {
    email: "superadmin@sunya.health",
    password: "sunya.health",
    device_type: "w",
  })
    .then(async (response) => {
      cy.request({
        method: "GET",
        url: "https://staging-api.sunya.health/api/v1/setup",
        headers: {
          Authorization: `Bearer ${response.body.data.token}`,
        },
      }).then((response1) => {
        useGlobalState.getState().setBasicGlobalState(response1.body.data);
      });
      console.log(response);
      useAuthStore.getState().setUserData(response.body);
    })
    .as("login");
});

export {};
