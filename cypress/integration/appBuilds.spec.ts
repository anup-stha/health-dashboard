/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

import moment from "moment";

type AppCardProps = {
  id: number;
  name: string;
  slug: string;
  application_id: string;
  secret_key: string;
};

type AppRelease = {
  id: number;
  name: string;
  version: number;
  code: number;
  note: string[];
  app_url: string;
};
Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("App Build Page", () => {
  /* **** SETUP ***** */

  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/app");
  });

  /* **** APP BUILD PAGE LOAD TEST ***** */

  it("App Build Page Load Test", () => {
    cy.url().should("include", "app");
  });

  /* **** END ***** */

  /* **** APP BUILD LIST AND RELEASE IS SHOWN AS DATA FROM API **** */

  it("App Builds List And Release is shown as data from API", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/app/all",
    }).as("getApps");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/app/release/all/*",
    }).as("getAppReleases");

    cy.wait("@getApps").then((interception) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);

      assert.isNotNull(interception?.response?.body);
      assert.isArray(interception?.response?.body.data);

      interception.response?.body.data.forEach((app: AppCardProps) => {
        cy.get(`[data-testid="${app.slug}-app-name"]`).contains(app.name);
        cy.get(`[data-testid="${app.slug}-app-app_id"]`).contains(app.application_id);
        cy.get(`[data-testid="${app.slug}-app-release_btn`).should("exist").click({ force: true });
        cy.url().should("include", `app/release?id=${app.id}`);

        cy.wait("@getAppReleases").then((interception) => {
          interception.response?.body.data.forEach((release: AppRelease) => {
            cy.get(`[data-testid="${release.id}-app_release_name"]`).contains(release.name);
            cy.get(`[data-testid="${release.id}-app_release_code"]`).contains(release.code);
            cy.get(`[data-testid="${release.id}-app_release_app_url"]`).should("have.attr", "href", release.app_url);
            cy.get(`[data-testid="${release.id}-app_release_app_url"]`).should("have.attr", "download");
          });
        });

        cy.go("back");
      });
    });
  });

  /* **** END ***** */

  /* **** APP RELEASE CAN BE DOWNLOADED **** */

  it("App release can be downloaded", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/app/all",
    }).as("getApps");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/app/release/all/*",
    }).as("getAppReleases");

    cy.wait("@getApps").then((interception) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);

      assert.isNotNull(interception?.response?.body);
      assert.isArray(interception?.response?.body.data);

      const app: AppCardProps = interception.response?.body.data[0];

      cy.get(`[data-testid="${app.slug}-app-release_btn`).should("exist").click({ force: true });
      cy.url().should("include", `app/release?id=${app.id}`);

      cy.wait("@getAppReleases").then((interception) => {
        const release: AppRelease = interception.response?.body.data[0];

        cy.get(`[data-testid="${release.id}-app_release_app_url"]`).should("have.attr", "href", release.app_url);
        cy.get(`[data-testid="${release.id}-app_release_app_url"]`).should("have.attr", "download");
      });

      cy.go("back");
    });
  });

  /* **** END ***** */

  /* **** Validation In App Build Add Modal **** */

  it("Validation In App Build Add Modal", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/app/all",
    }).as("getApps");

    cy.get('[data-testid="app_add_modal_btn"]').click({ force: true });
    cy.get('[data-testid="app_name"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="application_id"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="secret_key"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");
  });

  /* **** END **** */

  /* **** APP BUILD CAN BE ADDED AND EDITED **** */

  it("App Build Can Be Added And Edited", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/app/all",
    }).as("getApps");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/app",
    }).as("addNewApp");

    cy.wait("@getApps");
    const current_date = moment().valueOf();

    cy.get('[data-testid="app_add_modal_btn"]').click({ force: true });
    cy.get('[data-testid="app_name"]').type("Test App" + current_date);
    cy.get('[data-testid="application_id"]').type("app.test." + current_date);
    cy.get('[data-testid="secret_key"]').type("test");
    cy.get('[data-testid="app_add_btn"]').click({ force: true });

    cy.wait("@addNewApp").then((interception) => {
      const app = interception.response?.body.data;
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);

      assert.isNotNull(interception?.response?.body);
      assert.isObject(interception?.response?.body.data);

      expect(app.name).to.equal("Test App" + current_date);
      expect(app.slug).to.equal("test_app" + current_date);

      cy.get(`[data-testid="${app.slug}-app-name"]`).contains(app.name);
      cy.get(`[data-testid="${app.slug}-app-app_id"]`).contains(app.application_id);
      cy.get(`[data-testid="${app.slug}-app-release_btn`).should("exist");
    });
  });
  /* **** END ***** */
});

export {};
