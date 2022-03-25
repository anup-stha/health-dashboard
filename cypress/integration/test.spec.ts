/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

import { Test } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Test Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/tests");
  });

  it("Test Page Load Test", () => {
    cy.url().should("include", "tests");
  });

  it("Test List Request Test", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");
    cy.wait("@getTests").then((interception) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(200);

      assert.isNotNull(interception?.response?.body);
      assert.isArray(interception?.response?.body.data);
    });
  });

  it("Test List Should Show according To API", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");

    cy.wait("@getTests").then((interception: any) => {
      interception.response.body.data.forEach((test: Test) => {
        cy.get(`[data-testid="${test.slug}-test-card"`).contains(test.name);
        cy.get(`[data-testid="${test.slug}-test-card"`).contains(test.slug);
        cy.get(`[data-testid="${test.slug}-test-btn"`).click({ force: true });

        cy.url().should("contain", `/tests/${test.slug}?id=${test.id}`);
        test.sub_categories.forEach((sub_test) => {
          cy.get(`[data-testid="${sub_test.slug}-test-card"`).contains(sub_test.name);
          cy.get(`[data-testid="${sub_test.slug}-test-card"`).contains(sub_test.slug);
        });
        cy.go("back");
      });
    });
  });

  it("Test Can Be Added", () => {
    cy.get('[data-testid="test-add-btn"]').click({ force: true });
  });
});

export {};
