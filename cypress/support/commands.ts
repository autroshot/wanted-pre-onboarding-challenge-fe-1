/// <reference types="cypress" />

import { login } from '../../utils/auth';
import { MyStorage } from '../../utils/storage';

const seededUser = { email: 'hong@gmail.com', password: '12345678' };

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
        expect(getIsLogined()).to.be.true;
      },
    }
  );
  cy.visit('/');
});

function getIsLogined() {
  const loginToken = new MyStorage(localStorage).getLoginToken();

  return loginToken !== null;
}

declare global {
  namespace Cypress {
    interface Chainable {
      seededUserLogin(): Chainable<void>;
    }
  }
}

export {};
