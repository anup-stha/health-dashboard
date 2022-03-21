/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

/*
import moment from "moment"; */

import moment from "moment";

import { Role } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Role Detail Page", () => {
  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/roles/");
  });

  it("Permission Button should be disabled if no change is in permission.", () => {
    cy.visit("http://localhost:3000/roles/patient?id=5");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/permission/",
    }).as("getPermissions");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/role/assign/*/permission",
    });

    cy.wait("@getPermissions").then((interception: any) => {
      cy.get('[data-testid="permission_save_btn"]').should("be.disabled");

      interception.response.body.data.forEach((permission: any) => {
        cy.get(`[data-testid="${permission.slug}-permission_checkbox"]`).check({ force: true });
      });

      cy.get('[data-testid="permission_save_btn"]').should("not.be.disabled");

      interception.response.body.data.forEach((permission: any) => {
        cy.get(`[data-testid="${permission.slug}-permission_checkbox"]`).check({ force: true });
      });

      cy.get('[data-testid="permission_save_btn"]').click();
    });
  });

  it("Role Detail Page Should Load", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role) => {
        cy.get(`[data-testid="${role.name}-button"]`)
          .click({ force: true })
          .then(() => {
            cy.url().should("include", `/roles/${role.slug}?id=${role.id}`);
            cy.go("back");
          });
      });
    });
  });

  it("Role Access Details should be shown for each role.", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role) => {
        cy.get(`[data-testid="${role.name}-button"]`)
          .click({ force: true })
          .then(() => {
            cy.url().should("include", `/roles/${role.slug}?id=${role.id}`);

            role.role_access.forEach((role) => {
              cy.get('[class*="-Control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .should("not.contain", role.name);
              cy.get("body").click(0, 0);
            });

            cy.go("back");
          });
      });
    });
  });

  it("Role Access Details can be added, removed and shown.", () => {
    cy.visit("http://localhost:3000/roles/superadmin?id=1");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/role/assignRole",
    }).as("addRoleAccess");

    cy.intercept({
      method: "DELETE",
      url: "https://staging-api.sunya.health/api/v1/role/*/remove/*",
    }).as("deleteRoleAccess");

    cy.wait("@getRoles").then((interception: any) => {
      const selectedRole = interception.response.body.data.find((role: Role) => role.id === 1);
      const notAccessedROle = interception.response.body.data
        .map(
          (role: any) =>
            selectedRole &&
            !selectedRole.role_access.some((accessRole: any) => accessRole.slug === role.slug) && {
              name: role.name,
              id: role.id,
            }
        )
        .filter(Boolean);

      cy.get('[class*="-Control"]')
        .click(0, 0, { force: true })
        .get('[class*="-menu"]')
        .find('[class*="-option"]')
        .contains(notAccessedROle[0]?.name)
        .click({ force: true });

      cy.get(`[data-testid="role-access-add-btn`).click({ force: true });

      cy.wait("@addRoleAccess").then((interception) => {
        expect(interception.request.headers["authorization"]).contains("Bearer");
        expect(interception?.response?.statusCode).to.equal(201);
      });

      cy.get(`[data-testid="${notAccessedROle[0]?.name}-role_access_del_btn"]`).click({ force: true });
      cy.get('[data-testid="del-btn"]').should("exist").click({ force: true });

      cy.wait("@deleteRoleAccess").then((interception) => {
        expect(interception.request.headers["authorization"]).contains("Bearer");
        expect(interception?.response?.statusCode).to.equal(201);
      });
    });
  });

  it("All Permissions are being shown and permissions of a role should be checked or unchecked.", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/permission/",
    }).as("getPermissions");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role) => {
        cy.get(`[data-testid="${role.name}-button"]`)
          .click({ force: true })
          .then(() => {
            cy.url().should("include", `/roles/${role.slug}?id=${role.id}`);
            cy.wait("@getPermissions").then((interception: any) => {
              interception.response.body.data.forEach((permission: any) => {
                cy.get(`[data-testid="${permission.slug}-permission_card"]`).should("exist");

                if (role.permissions.some((role) => role.slug === permission.slug)) {
                  cy.get(`[data-testid="${permission.slug}-permission_checkbox"]`).should("be.checked");
                } else {
                  cy.get(`[data-testid="${permission.slug}-permission_checkbox"]`).should("not.be.checked");
                }
              });
            });

            cy.go("back");
          });
      });
    });
  });
});

context("Role Page", () => {
  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/roles");
  });

  it("Role Page Load Test", () => {
    cy.url().should("include", "roles");
  });

  it("Role List Request Test", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");
    cy.wait("@getRoles").then((interception) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(200);

      assert.isNotNull(interception?.response?.body);
      assert.isArray(interception?.response?.body.data);
    });
  });

  it("Role Items should be displayed as from API", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role) => {
        cy.get(`[data-testid="${role.name}-card"]`).contains(role.name);

        // Role Card without permission shouldn't contain any of these data.
        if (role.permissions.length === 0) {
          cy.get(`[data-testid="${role.name}-card-data"]`).should("not.contain", role.member_limit);
          cy.get(`[data-testid="${role.name}-card-data"]`).should("not.contain", role.public ? "Public" : "Not Public");
          cy.get(`[data-testid="${role.name}-card-data"]`).should("not.contain", role.permissions.length);
        } else {
          cy.get(`[data-testid="${role.name}-card-data"]`).contains(role.member_limit);
          cy.get(`[data-testid="${role.name}-card-data"]`).contains(role.public ? "Public" : "Not Public");
          cy.get(`[data-testid="${role.name}-card-data"]`).contains(role.permissions.length);
        }

        cy.get(`[data-testid="${role.name}-card"]`).contains(role.slug);

        cy.get(`[data-testid="${role.name}-button"]`)
          .click({ force: true })
          .then(() => {
            cy.url().should("include", `/roles/${role.slug}?id=${role.id}`);
            cy.go("back");
          });
      });
    });
  });

  it("Validation In Role Add Modal", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles");

    cy.get('[data-testid="role-title-input"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="role-memberLimit-input"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    cy.get('[data-testid="role-description-input"]')
      .invoke("prop", "validationMessage")
      .should("equal", "Please fill out this field.");

    // Check whether switch is true or false
    cy.get('[data-testid="switch-input"]').should("have.class", "bg-primary-500");
  });

  it("Public Role Can Be Added", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/role/store/",
    }).as("addRole");

    cy.wait("@getRoles");
    cy.get('[data-testid="role-modal-open-btn"]').click({ force: true });

    const current_date = moment().format("DDMMYYYYHHMMSS");

    cy.get('[data-testid="role-title-input"').type("Test" + current_date);
    cy.get('[data-testid="role-memberLimit-input"]').type("10");
    cy.get('[data-testid="role-description-input"]').type(
      "This is role made from cypress test. Please delete it later."
    );
    //    cy.get('[data-testid="checkbox-input"]').check({ force: true });

    cy.get('[data-testid="role-add-btn"').click();

    cy.wait("@addRole").then((interception) => {
      const data = interception?.response?.body.data;

      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);

      assert.isNotNull(interception?.response?.body);
      assert.isObject(interception?.response?.body.data);
      expect(interception?.response?.body.data.name).to.equal("Test" + current_date);
      expect(interception?.response?.body.data.public).to.equal(true);

      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.member_limit);
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.public ? "Public" : "Not Public");
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.permissions.length);
    });
  });

  it("Not Public Role Can Be Added", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/role/store/",
    }).as("addRole");

    cy.wait("@getRoles");
    cy.get('[data-testid="role-modal-open-btn"]').click({ force: true });

    const current_date = moment().format("DDMMYYYYHHMMSS");

    cy.get('[data-testid="role-title-input"').type("Test" + current_date);
    cy.get('[data-testid="role-memberLimit-input"]').type("10");
    cy.get('[data-testid="role-description-input"]').type(
      "This is role made from cypress test. Please delete it later."
    );
    cy.get('[data-testid="switch-input"]').click({ force: true });

    //    cy.get('[data-testid="checkbox-input"]').check({ force: true });

    cy.get('[data-testid="role-add-btn"').click();

    cy.wait("@addRole").then((interception) => {
      const data = interception?.response?.body.data;

      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);

      assert.isNotNull(interception?.response?.body);
      assert.isObject(interception?.response?.body.data);
      expect(interception?.response?.body.data.name).to.equal("Test" + current_date);
      expect(interception?.response?.body.data.public).to.equal(false);

      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.member_limit);
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.public ? "Public" : "Not Public");
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.permissions.length);
    });
  });
});

export {};
