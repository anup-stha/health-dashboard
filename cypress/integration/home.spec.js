/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/12/22, 1:57 PM
 *
 *
 */

// / <reference types="cypress"

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Login", () => {
  it("Redirects to Login if not unauthorized", () => {
    cy.visit("http://localhost:3000/members");
    cy.url().should("not.include", "members");
  });

  it("Login Email Validation", () => {
    cy.get("[data-testid=login]").click();
    cy.get("[data-testid=email]")
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  });

  it("Invalid Credentials should throw a error toast.", () => {
    cy.contains("Invalid email or password").should("not.exist");
    cy.get("[data-testid=email]").type("admin@admin.com");
    cy.get("[data-testid=password]").type("password");
    cy.get("[data-testid=login]").click();
    cy.contains("Invalid email or password").should("exist");
  });
});
