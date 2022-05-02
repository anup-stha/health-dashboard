/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "login",
  });

  cy.visit("http://localhost:3000");

  cy.get("[data-testid=email]").clear().type("superadmin@sunya.health");
  cy.get("[data-testid=password]").clear().type("sunya.health{enter}");
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Members Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/profile");
  });
});
