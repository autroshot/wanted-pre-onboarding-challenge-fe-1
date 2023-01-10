import { it } from 'node:test';

describe('인증', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.visit('/auth');
  });

  it('로그인', () => {
    const seededUser = { email: 'hong@gamil.com', password: '12345678' };

    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(
      seededUser.email
    );
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type(
      seededUser.password
    );
    cy.get('[data-cy="loginForm"] [data-cy="submitButton"]').click();

    cy.get('[data-cy="navbar"]').contains('로그아웃');
    cy.getAllLocalStorage().then((result) => {
      const baseUrl = String(Cypress.config().baseUrl);
      expect(result[baseUrl]).to.have.property('loginToken');
    });
  });
  it('로그아웃', () => {});
  it('회원가입 및 로그인', () => {
    const newUser = { email: 'dummy@gmail.com', password: 'abcd1234' };
  });
});
