import { BODY } from '../../constants/todos/blockUnloginedUserModal';
import { DEFAULT } from '../../constants/todos/detail';

describe('비로그인 사용자 차단', () => {
  it('비로그인 사용자', () => {
    cy.visit('/todos/index');

    cy.contains(BODY);

    cy.get('[data-cy="confirm"]').click();

    cy.url().should('include', 'auth');
  });

  it('로그인 사용자', () => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seededUserLogin();

    cy.visit('/todos/index');

    cy.contains(DEFAULT);
  });
});

export {};
