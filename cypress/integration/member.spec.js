/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/13/22, 4:00 PM
 *
 *
 */

Cypress.Commands.add("login", () => {
  Cypress.log({
    name: "login",
  });

  cy.visit("http://localhost:3000");

  cy.get("[data-testid=email]").clear().type("superadmin@sunya.health");
  cy.get("[data-testid=password]").clear().type("sunya.health{enter}");

  cy.wait(5000);
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Members Page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("http://localhost:3000/members");
  });

  // it("Members Page Load Test", () => {
  //   cy.url().should("include", "members");
  // });
  //
  // it("Login Page should not be displayed if authorized", () => {
  //   cy.visit("http://localhost:3000/");
  //   cy.get("[data-testid=login-page]").should("not.exist");
  //   cy.get("[data-testid=loader").should("exist");
  // });

  // it("Change Member Role", () => {
  //   cy.intercept({
  //     method: "GET",
  //     url: "https://staging-api.sunya.health/api/v1/role/",
  //   }).as("getRoles");
  //
  //   cy.wait("@getRoles").then((interception) => {
  //     cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
  //     interception.response.body.data.forEach((role) =>
  //       cy.get(`[data-testid=${role.name}-btn]`).contains(role.name)
  //     );
  //   });
  // });

  // it("Do not Open Modal if role is not selected", () => {
  //   cy.get("[data-testid=add-member-btn]").click({ force: true });
  //   cy.get("[data-testid=modal]").should("not.exist");
  // });

  it("Open Modal if role is selected", () => {
    cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
    cy.get(`[data-testid=individual-btn]`).click({ force: true });
    cy.get("[data-testid=add-modal-open-btn]").click({ force: true });
    cy.get("[data-testid=modal]").should("exist");
  });

  it("Show error if form is submitted blank", () => {
    cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
    cy.get(`[data-testid=individual-btn]`).click({ force: true });
    cy.get("[data-testid=add-modal-open-btn]").click({ force: true });
    cy.get("[data-testid=member-add-btn]").click();
    cy.get("[data-testid=name]")
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  });

  it("Submit form correctly if all data is filled", () => {
    cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
    cy.get(`[data-testid=individual-btn]`).click({ force: true });
    cy.get("[data-testid=add-modal-open-btn]").click({ force: true });
    cy.get("[data-testid=name]").clear().type("Test");
    cy.get("[data-testid=phone]").clear().type("112233445566");
    cy.get("[data-testid=dob]").clear().type("2002-01-22");
    cy.get("[data-testid=member-add-btn]").click();
    cy.get("[data-testid=address]")
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  });
});
