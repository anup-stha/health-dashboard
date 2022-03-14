/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

import { Role } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Role Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/roles");
  });

  it("Role Page Load Test", () => {
    cy.url().should("include", "roles");
  });

  it("Role List Request Test", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");
    cy.wait("@getRoles").then((interception) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(200);

      assert.isNotNull(interception?.response?.body);
      assert.isArray(interception?.response?.body.data);
    });
  });

  it("Role Items should be displayed as from API", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role) => {
        cy.get(`[data-testid="${role.name}-card"]`).contains(role.name);
        cy.get(`[data-testid="${role.name}-card"]`).contains(role.member_limit);
        cy.get(`[data-testid="${role.name}-card"]`).contains(
          role.public ? "Public" : "Not Public"
        );
        cy.get(`[data-testid="${role.name}-card"]`).contains(
          role.permissions.length
        );
        cy.get(`[data-testid="${role.name}-button"]`)
          .click()
          .then(() => cy.url().should("contain"));
        cy.get(`[data-testid="${role.name}-button"]`).contains(role.slug);
      });
    });
  });
});

export {};
