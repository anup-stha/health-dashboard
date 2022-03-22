/*
 * Created By Anup Shrestha
 * Copyright (c) 2022. All rights reserved.
 * Last Modified 3/14/22, 3:56 PM
 *
 *
 */

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in to the dashboard.
     * @example cy.login()
     */
    login(): Chainable<Element>;

    /**
     *
     * @return {Cypress.Chainable<Element>}
     */
    loginTest(): Chainable<Element>;
  }
}
