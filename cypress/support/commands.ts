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
  }).then(async (response) => {
    console.log(response);
    useAuthStore.getState().setUserData(response.body);
  });
});

export {};
