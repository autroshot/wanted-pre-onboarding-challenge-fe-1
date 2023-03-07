/// <reference types="cypress" />

import { DummyUsers } from 'db/dummy';
import { MyStorage } from '../../utils/storage';

const seedUser = new DummyUsers().getUserInput(0);

Cypress.Commands.add('seedUserLogin', () => {
  cy.session(
    'seedUser',
    () => {
      cy.request(
        'POST',
        `${Cypress.env('server_url')}/users/login`,
        seedUser
      ).then((res) => {
        login(res.body.token);
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
  const loginToken = new MyStorage(localStorage).get('loginToken');

  return loginToken !== null;
}

function login(loginToken: string) {
  new MyStorage(localStorage).set('loginToken', loginToken);
}

declare global {
  namespace Cypress {
    interface Chainable {
      seedUserLogin(): Chainable<void>;
    }
  }
}

export {};
