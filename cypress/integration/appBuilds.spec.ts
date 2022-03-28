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
});

export {};
