/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 1/17/22, 4:01 PM
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

  it("Members Page Load Test", () => {
    cy.url().should("include", "members");
  });

  it("Login Page should not be displayed if authorized", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=login-page]").should("not.exist");
    cy.get("[data-testid=loader").should("exist");
  });

  it("Change Member Role", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception) => {
      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      interception.response.body.data.forEach((role) =>
        cy.get(`[data-testid=${role.name}-btn]`).contains(role.name)
      );
    });
  });

  it("Do not Open Modal if role is not selected", () => {
    cy.get("[data-testid=add-modal-open-btn]").click({ force: true });

    cy.get("[data-testid=modal]").should("not.exist");
  });

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
    const phone = Math.floor(Math.random() * 1000000000);
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
    cy.get(`[data-testid=org_admin-btn]`).click({ force: true });
    cy.get("[data-testid=add-modal-open-btn]").click({ force: true });

    cy.get("[data-testid=name]").clear().type("Test");
    cy.get("[data-testid=phone]").clear().type(phone);
    cy.get("[data-testid=dob]").clear().type("2002-01-22");
    cy.get("[data-testid=address]").clear().type("Test Address");
    cy.get("#react-select-3-input").type("Male{enter}{enter}", { force: true });
    cy.get("#react-select-5-input").type("Single{enter}{enter}", {
      force: true,
    });
    cy.get("#react-select-5-input").type("Single{enter}{enter}", {
      force: true,
    });
    cy.get("[data-testid=email]").type(`test${phone}@test.com`);
    cy.get("[data-testid=password]").type("test1234 ");
    cy.wait("@getRoles").then((interception) => {
      const selectedRole = interception.response.body.data.filter(
        (role) => role.id === 2
      );

      selectedRole[0].member_detail_categories.map((detail_category) =>
        cy
          .get(`[data-testid=${detail_category.id}-${detail_category.slug}]`)
          .type("Test Detail")
      );
    });

    cy.get("[data-testid=member-add-btn]").click();
    cy.contains(phone);
  });
});
