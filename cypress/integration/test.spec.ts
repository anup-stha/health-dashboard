/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

import moment from "moment";

import { Test } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Test Page", () => {
  /* **** LOGIN AND SETUP ***** */

  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/tests");
  });

  /* **** TEST PAGE LOAD TEST ***** */

  it("Test Page Load Test", () => {
    cy.url().should("include", "tests");
  });

  /* **** END ***** */

  /* **** TEST LIST REQUEST TEST ***** */

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

  /* **** END ***** */

  /* **** TEST LIST SHOULD SHOW ACCORDING TO API TEST ***** */

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

  /* **** END ***** */

  /* **** VALIDATION IN TEST ADD MODAL TEST ***** */

  it("Validation In Test Add Modal", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");

    cy.wait("@getTests");
    cy.get('[data-testid="test-modal-add-btn"]').click({ force: true });
    cy.get('[data-testid="test-add-btn"').click({ force: true });

    cy.get('[data-testid="test-title-input"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="test-description-input"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    // Check whether switch is true or false
    cy.get('[data-testid="switch-input"]').should("have.class", "bg-primary-500");
  });

  /* **** END ***** */

  /* **** TEST CAN BE ADDED ***** */

  it("Test Can Be Added", () => {
    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/test/category/",
    }).as("addTest");

    cy.get('[data-testid="test-modal-add-btn"]').click({ force: true });
    const current_date = moment().format("DDMMYYYYHHMMSS");

    cy.get('[data-testid="test-title-input"').type("Test" + current_date + "1");
    cy.get('[data-testid="test-description-input"]').type(
      "This is test made from cypress test. Please delete it later."
    );
    cy.get('[data-testid="test-add-btn"').click({ force: true, multiple: true });

    cy.wait("@addTest").then((interception) => {
      const data = interception?.response?.body.data;

      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);

      assert.isNotNull(interception?.response?.body);
      assert.isObject(interception?.response?.body.data);
      expect(interception?.response?.body.data.name).to.equal("Test" + current_date + "1");
      expect(interception?.response?.body.data.public).to.equal(true);

      cy.get(`[data-testid="${data.slug}-test-card"`).contains(data.name);
      cy.get(`[data-testid="${data.slug}-test-card"`).contains(data.slug);
    });
  });
});

/* **** END ***** */

export {};
