import moment from "moment";

import { Subscription, Test } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Subscription Page", () => {
  /* **** SETUP ***** */

  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/subscriptions");
  });

  /* **** SUBSCRIPTION PAGE LOAD TEST ***** */

  it("Subscription Page Load Test", () => {
    cy.url().should("include", "subscriptions");
  });

  /* **** END ***** */

  /* **** SUBSCRIPTION PAGE LOAD TEST ***** */

  it("Subscription is shown for each role as data from API", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/auth/me",
    }).as("getAuth");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/subscription/*",
    }).as("getSubscriptions");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      interception.response?.body.data.role.role_access.forEach(
        (role: { name: string | number | RegExp; id: number }) => {
          cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
          cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

          cy.wait("@getSubscriptions").then((interception) => {
            expect(interception.request.headers["authorization"]).contains("Bearer");
            expect(interception?.response?.statusCode).to.equal(200);

            assert.isNotNull(interception?.response?.body);
            assert.isArray(interception?.response?.body.data);

            interception.response?.body.data.forEach((subscription: Subscription) => {
              Object.keys(subscription).forEach((key) => {
                if (key === "id") return;
                cy.get(`[data-testid="${subscription.slug}-subs-${key}"]`).contains(subscription[key] as string);
              });
            });
          });
        }
      );
    });
  });

  /* **** END ***** */

  /* **** SUBSCRIPTION CAN BE ADDED FOR EVERY ROLE ASSIGNED ***** */

  it("Subscription can be added for every role assigned", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/auth/me",
    }).as("getAuth");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/subscription/",
    }).as("addSubscription");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      interception.response?.body.data.role.role_access.forEach(
        (role: { name: string | number | RegExp; id: number }, index: number) => {
          cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
          cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

          cy.get('[data-testid="subs_modal_open_btn"]').click({ force: true });

          const current_date = moment().valueOf();

          cy.get('[data-testid="subs_input_name"]').type("Subscription Test" + current_date + `${index}`);
          cy.get('[data-testid="subs_input_price"]').type("400");
          cy.get('[class*="-Control"]')
            .click(0, 0, { force: true })
            .get('[class*="-menu"]')
            .find('[class*="-option"]')
            .eq(2)
            .click(0, 0, { force: true });
          cy.get('[data-testid="subs_input_intervalValue"]').type("40");
          cy.get('[data-testid="subs_input_gracePeriod"]').type("10");
          cy.get('[data-testid="subs_input_syncLimit"]').type("10");
          cy.get('[data-testid="subs_input_testLimit"]').type("10");

          cy.get('[data-testid="subs-add-btn"]').click({ force: true });

          cy.wait("@addSubscription").then((interception) => {
            const data = interception?.response?.body.data;
            expect(interception.request.headers["authorization"]).contains("Bearer");
            expect(interception?.response?.statusCode).to.equal(201);

            assert.isNotNull(interception?.response?.body);
            assert.isObject(interception?.response?.body.data);

            expect(interception?.response?.body.data.name).to.equal("Subscription Test" + current_date + `${index}`);
            expect(interception?.response?.body.data.slug).to.equal("subscription_test" + current_date + `${index}`);

            Object.keys(interception.response?.body.data).forEach((key) => {
              if (key === "id") return;
              cy.get(`[data-testid="${interception.response?.body.data.slug}-subs-${key}"]`).contains(
                interception.response?.body.data[key] as string
              );
            });
          });
        }
      );
    });
  });

  /* **** END ***** */

  /* **** VALIDATION IN SUBSCRIPTION ADD MODAL ***** */

  it("Validation In Subscription Add Modal", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/subscription/",
    }).as("addSubscription");

    cy.wait("@getRoles");

    cy.get('[data-testid="subs_modal_open_btn"]').click({ force: true });

    cy.get('[data-testid="subs_input_name"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="subs_input_price"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="subs_input_intervalValue"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="subs_input_gracePeriod"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="subs_input_syncLimit"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="subs_input_testLimit"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  });

  /* **** END ***** */

  /* **** ALL TEST ARE SHOWN IN TEST SELECT AREA OF SUBSCRIPTION DETAILS ***** */

  it("All Tests are shown in test select area of Subscription Details", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/auth/me",
    }).as("getAuth");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/subscription/*",
    }).as("getSubscriptions");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      const role = interception.response?.body.data.role.role_access[0];

      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

      cy.wait("@getSubscriptions").then((interception) => {
        const subscription = interception.response?.body.data[0];
        cy.get(`[data-testid="${subscription.slug}-subs-btn"]`).click({ force: true });
        cy.url().should("include", `${subscription.slug}?id=${subscription.id}&role=${role.id}`);
        cy.wait("@getTests").then((interception: any) => {
          interception.response.body.data.forEach((test: Test) => {
            cy.get(`[data-testid="subs-test-${test.slug}"]`).contains(test.name);
          });
        });
      });
    });
  });

  /* **** END **** */
});

export {};
