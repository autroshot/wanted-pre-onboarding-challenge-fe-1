/// <reference types="cypress" />

import { getLoginToken, login } from '../../utils/auth';

const seededUser = { email: 'hong@gamil.com', password: '12345678' };

Cypress.Commands.add('seededUserLogin', () => {
  cy.session(
    'seededUser',
    () => {
      cy.request(
        'POST',
        `${Cypress.env('server_url')}/users/login`,
        seededUser
      ).then((res) => {
        login(localStorage, res.body.token);
      });
    },
    {
      validate() {
        expect(getLoginToken(localStorage)).to.be.not.null;
      },
    }
  );
  cy.visit('/');
});

declare global {
  namespace Cypress {
    interface Chainable {
      seededUserLogin(): Chainable<void>;
    }
  }
}

export {};
