/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 2/20/22, 2:16 PM
 *
 *
 */

import moment from "moment";

import { Role } from "../../src/types";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

context("Role Page", () => {
  /* **** LOGIN AND SETUP ***** */

  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/roles");
  });

  /* **** ROLE PAGE LOAD TEST ***** */

  it("Role Page Load Test", () => {
    cy.url().should("include", "roles");
  });

  /* **** END ***** */

  /* **** ROLE LIST REQUEST TEST ***** */

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

  /* **** END ***** */

  /* **** ROLE ITEMS SHOULD BE DISPLAYED AS FROM API TEST ***** */

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

  /* **** END ***** */

  /* **** VALIDATION IN ROLE ADD MODAL TEST ***** */

  it("Validation In Role Add Modal", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles");
    cy.get('[data-testid="role-modal-open-btn"]').click({ force: true });

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

  /* **** END ***** */

  /* **** PUBLIC ROLE CAN BE ADDED TEST ***** */

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

    cy.get('[data-testid="role-title-input"').type("Test" + current_date + "1");
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
      expect(interception?.response?.body.data.name).to.equal("Test" + current_date + "1");
      expect(interception?.response?.body.data.public).to.equal(true);

      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.member_limit);
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.public ? "Public" : "Not Public");
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.permissions.length);
    });
  });

  /* **** END ***** */

  /* **** PUBLIC ROLE CAN BE ADDED TEST ***** */

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

    cy.get('[data-testid="role-title-input"').type("Test" + current_date + "2");
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
      expect(interception?.response?.body.data.name).to.equal("Test" + current_date + "2");
      expect(interception?.response?.body.data.public).to.equal(false);

      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.member_limit);
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.public ? "Public" : "Not Public");
      cy.get(`[data-testid="${data.name}-card-data"]`).should("not.contain", data.permissions.length);
    });
  });

  /* **** END ***** */
});

context("Role Detail Page", () => {
  /* **** LOGIN AND SETUP ***** */

  beforeEach(() => {
    cy.loginTest();
    cy.visit("http://localhost:3000/roles/");
  });

  /* **** ROLE DETAIL PAGE SHOULD LOAD ***** */

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

  /* **** END ***** */

  /* **** ROLE ACCESS DETAILS CAN BE ADDED, REMOVED AND SHOWN ***** */

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

  /* **** END ***** */

  /* **** ALL PERMISSIONS ARE BEING SHOWN AND PERMISSIONS OF A ROLE SHOULD BE CHECKED OR UNCHECKED ***** */

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

  /* **** END ***** */

  /* **** ROLE ACCESS DETAILS SHOULD BE SHOWN FOR EACH ROLE ***** */

  it("Role Access Details should be shown for each role.", () => {
    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role, index: number) => {
        if (index > 5) return;

        cy.get(`[data-testid="${role.name}-button"]`)
          .click({ force: true })
          .then(() => {
            cy.url().should("include", `/roles/${role.slug}?id=${role.id}`);

            role.role_access.forEach((role) => {
              cy.get('[class*="-Control"]')
                .click(0, 0, { force: true })
                .get('[id*="-menu"]')
                .get('[id*="-option"]')
                .should("not.contain", role.name)
                .eq(2);

              cy.get("body").click(0, 0, { force: true });
            });

            cy.go("back");
          });
      });
    });
  });

  /* **** END ***** */

  /* **** PERMISSION BUTTON SHOULD BE DISABLED IF NO CHANGE IS IN PERMISSION ***** */

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

  /* **** END ***** */

  /* **** PERMISSION CAN  BE ADDED AND REMOVED ***** */

  it("Permission can be added and removed.", () => {
    cy.visit("http://localhost:3000/roles/patient?id=5");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/permission/",
    }).as("getPermissions");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/role/assign/*/permission",
    }).as("assignPermissions");

    cy.intercept({
      method: "POST",
      url: "https://staging-api.sunya.health/api/v1/role/remove/*/permission/*",
    }).as("removePermissions");

    cy.wait("@getPermissions").then((interception: any) => {
      cy.wrap(interception).as("permissions");
      cy.get('[data-testid="permission_save_btn"]').should("be.disabled");

      interception.response.body.data.forEach((permission: any) => {
        cy.get(`[data-testid="${permission.slug}-permission_checkbox"]`).check({ force: true });
      });

      cy.get('[data-testid="permission_save_btn"]').should("not.be.disabled");
    });

    cy.get('[data-testid="permission_save_btn"]').click();
    cy.get('[data-testid="modal_close_btn"]').click({ force: true });

    cy.wait("@assignPermissions").then((interception: any) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(201);
    });

    cy.get("@permissions").then((interception: any) => {
      cy.get('[data-testid="permission_save_btn"]').should("be.disabled");

      interception.response.body.data.forEach((permission: any) => {
        cy.get(`[data-testid="${permission.slug}-permission_checkbox"]`).uncheck({ force: true });
      });

      cy.get('[data-testid="permission_save_btn"]').should("not.be.disabled");
    });

    cy.get('[data-testid="permission_save_btn"]').click();
    cy.get('[data-testid="modal_close_btn"]').click({ force: true });

    cy.wait("@removePermissions").then((interception: any) => {
      expect(interception.request.headers["authorization"]).contains("Bearer");
      expect(interception?.response?.statusCode).to.equal(200);
    });
  });

  /* **** END ***** */

  /* **** MEMBER DETAIL CATEGORY SHOULD BE SHOWN CORRECTLY ***** */

  it("Member Detail Category Should be shown correctly", () => {
    cy.visit("http://localhost:3000/roles/");

    cy.intercept({
      method: "GET",
      url: "https://staging-api.sunya.health/api/v1/role/",
    }).as("getRoles");

    cy.wait("@getRoles").then((interception: any) => {
      interception.response.body.data.forEach((role: Role, index: number) => {
        if (index > 5) return;

        cy.get(`[data-testid="${role.name}-button"]`)
          .click({ force: true })
          .then(() => {
            cy.url().should("include", `/roles/${role.slug}?id=${role.id}`);

            cy.get('[data-testid="disclosure_open"]')
              .click({ force: true })
              .then(() => {
                role.member_detail_categories.map((category: any) => {
                  Object.keys(category).forEach((key: any) => {
                    if (key === "id") return;
                    if (key === "required") {
                      cy.get(`[data-testid="detail_cat_row_${key}_${category.id}"]`).contains(
                        category[key] ? "Yes" : "No"
                      );
                    } else {
                      cy.get(`[data-testid="detail_cat_row_${key}_${category.id}"]`).contains(category[key]);
                    }
                  });
                });
              });

            cy.get('[data-testid="disclosure_open"]').click({ force: true });

            cy.go("back");
          });
      });
    });
  });

  /* **** END ***** */
});

export {};
