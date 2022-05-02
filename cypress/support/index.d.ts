/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
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
