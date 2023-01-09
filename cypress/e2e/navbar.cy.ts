describe('네비바 링크', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('홈', () => {
    cy.visit('/auth');

    cy.get('[data-cy="navbar"]').contains('홈').click();
    cy.location('pathname').should('eq', '/');
  });

  it('ToDo', () => {
    cy.get('[data-cy="navbar"]').contains('ToDo').click();
    cy.location('pathname').should('eq', '/todos/index');
  });

  it('로그인', () => {
    cy.get('[data-cy="navbar"]').contains('로그인').click();
    cy.location('pathname').should('eq', '/auth');
  });
});

describe('네비바 다크 모드', () => {
  it('다크 모드', () => {
    cy.visit('/');

    cy.get('html').should('have.css', 'color-scheme', 'light');
    cy.get('[data-cy="navbar"] [aria-label="다크 모드"]').click();
    cy.get('html').should('have.css', 'color-scheme', 'dark');
    cy.get('[data-cy="navbar"] [aria-label="다크 모드"]').click();
    cy.get('html').should('have.css', 'color-scheme', 'light');
  });
});
