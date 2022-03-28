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
});

export {};
