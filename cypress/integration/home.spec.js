/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

// / <reference types="cypress"

const emails = [
  { email: "email@example.com", isValid: true },
  { email: "firstname.lastname@example.com", isValid: true },
  { email: " email@subdomain.example.com", isValid: true },
  { email: " firstname+lastname@example.com", isValid: true },
  { email: '"email"@example.com', isValid: true },
  { email: "1234567890@example.com", isValid: true },
  { email: "email@example-one.com", isValid: true },
  { email: "_______@example.com", isValid: true },
  { email: "email@example.name", isValid: true },
  { email: "email@example.museum", isValid: true },
  { email: "email@example.co.jp", isValid: true },
  { email: "firstname-lastname@example.com", isValid: true },
  { email: "much.”more unusual”@example.com", isValid: true },
  { email: "plainaddress", isValid: false },
  { email: "#@%^%#$@#$@#.com", isValid: false },
  { email: "@example.com", isValid: false },
  { email: "Joe Smith <email@example.com>", isValid: false },
  { email: "email.example.com", isValid: false },
  { email: "email@example@example.com", isValid: false },
  { email: ".email@example.com", isValid: false },
  { email: "email.@example.com", isValid: false },
  { email: "email..email@example.com", isValid: false },
  { email: "email@example.com (Joe Smith)", isValid: false },
  { email: "email@example", isValid: false },
  { email: "email@-example.com", isValid: false },
  { email: "email@111.222.333.44444", isValid: false },
  { email: "email@example..com", isValid: false },
  { email: "Abc..123@example.com", isValid: false },
  { email: "”(),:;<>[]@example.com", isValid: false },
  { email: 'this is"really"notallowed@example.com', isValid: false },
];

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
    cy.get("[data-testid=login-form]").submit();
    cy.get("[data-testid=email]").invoke("prop", "validationMessage").should("equal", "Please fill out this field.");
  });

  for (let index = 0; index < emails.length; index++) {
    const TestEmail = emails[index].email;
    const EmailState = emails[index].isValid;

    it("EmailTest -" + TestEmail + " - " + EmailState, () => {
      cy.get("[data-testid=email]").clear().type(TestEmail);

      if (!EmailState) {
        cy.get("[data-testid=input-error]").should("be.visible");
      } else {
        cy.get("[data-testid=input-error]").should("not.exist");
      }
    });
  }

  it("Display errors on login", () => {
    // incorrect email
    cy.get("[data-testid=email]").clear().type("admin@admin.com");
    cy.get("[data-testid=password]").clear().type("password{enter}");

    cy.contains("Invalid email or password").should("exist");

    cy.url().should("not.include", "/dashboard");
  });

  it("Redirect to dashboard if logged in successfully", () => {
    cy.get("[data-testid=email]").clear().type("superadmin@sunya.health");
    cy.get("[data-testid=password]").clear().type("sunya.health{enter}");

    cy.url()
      .should("include", "/dashboard")
      .should(() => expect(localStorage.getItem("@sunya/user-data")).contains("Bearer"));

    localStorage.clear();
  });
});
