/// <reference types="cypress" />

import { DummyUsers } from 'cypress/e2e/dummy';
import { MyStorage } from '../../utils/storage';

const seedUser = new DummyUsers().getUserInput(0);

Cypress.Commands.add('seededUserLogin', () => {
  cy.session(
    'seededUser',
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
      seededUserLogin(): Chainable<void>;
    }
  }
}

export {};
