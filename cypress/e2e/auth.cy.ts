import { CONFIRM, LOGIN, LOGOUT, SIGN_UP } from 'constants/terms';
import { DummyUsers } from './dummy';

const seedUser = new DummyUsers().getUserInput(0);

describe('인증', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.visit('/auth');
  });

  it('로그인', () => {
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(seedUser.email);
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type(
      seedUser.password
    );
    cy.get('[data-cy="loginForm"] [data-cy="submitButton"]').click();

    cy.get('[data-cy="navbar"]').contains(LOGOUT);
    cy.getAllLocalStorage().then((result) => {
      const baseUrl = String(Cypress.config().baseUrl);
      expect(result[baseUrl]).to.have.property('loginToken');
    });
  });

  it('로그아웃', () => {
    cy.seedUserLogin();
    cy.get('[data-cy="navbar"]').contains(LOGOUT).click();

    cy.get('[data-cy="navbar"]').contains(LOGIN);
    cy.getAllLocalStorage().then((result) => {
      const baseUrl = String(Cypress.config().baseUrl);
      expect(result[baseUrl]).to.have.not.property('loginToken');
    });
  });

  it('회원가입 및 로그인', () => {
    const newUser = { email: 'dummy@gmail.com', password: 'abcd1234' };

    cy.contains(SIGN_UP).click();
    cy.get('[data-cy="signUpForm"] [data-cy="emailInput"]').type(newUser.email);
    cy.get('[data-cy="signUpForm"] [data-cy="passwordInput"]').type(
      newUser.password
    );
    cy.get('[data-cy="signUpForm"] [data-cy="submitButton"]').click();
    cy.contains(SIGN_UP);
    cy.contains(CONFIRM).click();

    cy.visit('/auth');
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(newUser.email);
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type(
      newUser.password
    );
    cy.get('[data-cy="loginForm"] [data-cy="submitButton"]').click();

    cy.get('[data-cy="navbar"]').contains(LOGOUT);
  });
});

export {};
