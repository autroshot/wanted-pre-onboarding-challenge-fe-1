describe('ToDo 페이지의 비로그인 사용자 차단', () => {
  it('비로그인 사용자', () => {
    cy.visit('/todos/index');

    cy.get('[data-cy="blockUnloginedUserModal"]');

    cy.get('[data-cy="confirm"]').click();

    cy.url().should('include', 'auth');
  });

  it('로그인 사용자', () => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seedUserLogin();

    cy.visit('/todos/index');

    cy.get('[data-cy="todo"]');
  });
});

export {};
