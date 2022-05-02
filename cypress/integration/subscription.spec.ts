/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

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

  /* **** EACH TEST IS SHOWN CORRECTLY FOR EACH SUBSCRIPTION ***** */

  it("Each Test is shown correctly for each subscription", () => {
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

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/subscription/tests/*",
    }).as("getSubsTests");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      const role = interception.response?.body.data.role.role_access[0];

      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

      cy.wait("@getSubscriptions").then((interception) => {
        interception.response?.body.data.forEach((subscription: Subscription, index: number) => {
          if (index > 5) return;
          cy.get(`[data-testid="${subscription.slug}-subs-btn"]`).click({ force: true });

          cy.url().should("include", `${subscription.slug}?id=${subscription.id}&role=${role.id}`);

          cy.wait("@getSubsTests").then((subs) => {
            cy.wait("@getTests").then((interception: any) => {
              interception.response.body.data.forEach((test: Test) => {
                cy.get(`[data-testid="subs-test-${test.slug}"]`).contains(test.name);

                if (subs.response?.body.data.some((element: any) => element.id === test.id)) {
                  cy.get(`[data-testid="check-${test.id}"]`).should("exist");
                  cy.get(`[data-testid="cross-${test.id}"]`).should("not.exist");
                } else {
                  cy.get(`[data-testid="cross-${test.id}"]`).should("exist");
                  cy.get(`[data-testid="check-${test.id}"]`).should("not.exist");
                }
              });
            });
          });

          cy.go("back");
        });
      });
    });
  });

  /* **** END **** */

  /* **** TEST CAN BE ASSIGNED AND REMOVED ***** */

  it("Test can be assigned and removed", () => {
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

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/subscription/tests",
    }).as("addSubscriptionTest");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");

    cy.intercept({
      method: "DELETE",
      url: "https://staging-api.sunya.health/api/v1/subscription/*/*/*",
    }).as("removeSubsTest");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      const role = interception.response?.body.data.role.role_access[0];

      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

      cy.get('[data-testid="subs_modal_open_btn"]').click({ force: true });

      const current_date = moment().valueOf();

      cy.get('[data-testid="subs_input_name"]').type("Subscription Test" + current_date);
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
        cy.visit(
          `http://localhost:3000/subscriptions/${interception.response?.body.data.slug}?id=${interception.response?.body.data.id}&role=${role.id}`
        ).then(() => {
          cy.wait("@getTests").then((interception) => {
            const test_name = interception.response?.body.data[0].sub_categories[3].name;
            const test_id = interception.response?.body.data[0].sub_categories[3].id;
            cy.get('[class*="-Control"]')
              .click(0, 0, { force: true })
              .get('[class*="-menu"]')
              .find('[class*="-option"]')
              .contains(test_name)
              .click(0, 0, { force: true });
            cy.get(`[data-testid="subs-test-add-btn"]`).click({ force: true });
            cy.wait("@addSubscriptionTest").then(() => {
              cy.get(`[data-testid="${test_id}-test-name"]`).should("contain", test_name).should("exist");
              cy.get(`[data-testid="${test_id}-test-remove-btn"]`).should("exist").click({ force: true });
              cy.wait("@removeSubsTest").then(() => {
                cy.get(`[data-testid="${test_id}-test-name"]`).should("not.exist");
                cy.get(`[data-testid="${test_id}-test-remove-btn"]`).should("not.exist");
              });
            });
          });
        });
      });
    });
  });

  /* **** END ***** */

  /* **** ADDED TESTS ARE NOT SHOWN IN TEST DROPDOWN ***** */

  it("Added Tests are not shown in test dropdown", () => {
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

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/subscription/tests",
    }).as("addSubscriptionTest");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");

    cy.intercept({
      method: "DELETE",
      url: "https://staging-api.sunya.health/api/v1/subscription/*/*/*",
    }).as("removeSubsTest");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      const role = interception.response?.body.data.role.role_access[0];

      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

      cy.get('[data-testid="subs_modal_open_btn"]').click({ force: true });

      const current_date = moment().valueOf();

      cy.get('[data-testid="subs_input_name"]').type("Subscription Test" + current_date);
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
        cy.visit(
          `http://localhost:3000/subscriptions/${interception.response?.body.data.slug}?id=${interception.response?.body.data.id}&role=${role.id}`
        ).then(() => {
          cy.wait("@getTests").then((interception) => {
            const test_name = interception.response?.body.data[0].sub_categories[3].name;
            cy.get('[class*="-Control"]')
              .click(0, 0, { force: true })
              .get('[class*="-menu"]')
              .find('[class*="-option"]')
              .contains(test_name)
              .click(0, 0, { force: true });
            cy.get(`[data-testid="subs-test-add-btn"]`).click({ force: true });
            cy.wait("@addSubscriptionTest").then(() => {
              cy.get('[class*="-Control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .should("not.contain", test_name);
            });
          });
        });
      });
    });
  });

  /* **** END ***** */

  /* **** BULK TEST CAN BE ADDED ***** */

  it("Bulk Tests can be added ", () => {
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

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/subscription/tests",
    }).as("addSubscriptionTest");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/test/categories",
    }).as("getTests");

    cy.wait("@getRoles");

    cy.wait("@getAuth").then((interception) => {
      const role = interception.response?.body.data.role.role_access[0];

      cy.get("[data-testid=role-dropdown-btn]").click({ force: true });
      cy.get(`[data-testid="${role.name}-btn"]`).contains(role.name).click({ force: true });

      cy.get('[data-testid="subs_modal_open_btn"]').click({ force: true });

      const current_date = moment().valueOf();

      cy.get('[data-testid="subs_input_name"]').type("Subscription Test" + current_date);
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
        cy.visit(
          `http://localhost:3000/subscriptions/${interception.response?.body.data.slug}?id=${interception.response?.body.data.id}&role=${role.id}`
        ).then(() => {
          cy.wait("@getTests").then((interception) => {
            const test_name = interception.response?.body.data[0].sub_categories[3].name;
            const test_id = interception.response?.body.data[0].sub_categories[3].id;

            const test_name_1 = interception.response?.body.data[0].sub_categories[4].name;
            const test_id_1 = interception.response?.body.data[0].sub_categories[4].id;

            const test_name_2 = interception.response?.body.data[0].sub_categories[5].name;
            const test_id_2 = interception.response?.body.data[0].sub_categories[5].id;

            cy.get('[class*="-Control"]')
              .click(0, 0, { force: true })
              .get('[class*="-menu"]')
              .find('[class*="-option"]')
              .contains(test_name)
              .click(0, 0, { force: true });

            cy.get('[class*="-Control"]')
              .click(0, 0, { force: true })
              .get('[class*="-menu"]')
              .find('[class*="-option"]')
              .contains(test_name_1)
              .click(0, 0, { force: true });

            cy.get('[class*="-Control"]')
              .click(0, 0, { force: true })
              .get('[class*="-menu"]')
              .find('[class*="-option"]')
              .contains(test_name_2)
              .click(0, 0, { force: true });

            cy.get(`[data-testid="subs-test-add-btn"]`).click({ force: true });
            cy.wait("@addSubscriptionTest").then(() => {
              cy.get(`[data-testid="${test_id}-test-name"]`).should("contain", test_name).should("exist");
              cy.get(`[data-testid="${test_id_1}-test-name"]`).should("contain", test_name_1).should("exist");
              cy.get(`[data-testid="${test_id_2}-test-name"]`).should("contain", test_name_2).should("exist");
            });
          });
        });
      });
    });
  });

  /* **** END ***** */
});

export {};
