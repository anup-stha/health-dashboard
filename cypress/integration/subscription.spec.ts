import { useAuthStore } from "../../src/modules/auth/useTokenStore";
import { Subscription } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Subscription Page", () => {
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

    useAuthStore.getState().user.role.role_access.forEach((role: { name: string | number | RegExp; id: number }) => {
      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

      cy.wait("@getSubscriptions").then((interception) => {
        expect(interception.request.headers["authorization"]).contains("Bearer");
        expect(interception?.response?.statusCode).to.equal(200);

        assert.isNotNull(interception?.response?.body);
        assert.isArray(interception?.response?.body.data);

        interception.response?.body.data.forEach((subscription: Subscription) => {
          Object.keys(subscription).forEach((key) => {
            cy.get(`${subscription.slug}-subs-${key}`).should("include", subscription[key]);
          });
        });
      });
    });
  });

  /* **** END ***** */
});

export {};
