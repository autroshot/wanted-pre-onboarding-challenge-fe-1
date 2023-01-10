describe('페이지', () => {
  it('홈', () => {
    cy.visit('/');
  });
  it('ToDo', () => {
    cy.visit('/todos/index');
  });
  it('로그인 및 회원가입', () => {
    cy.visit('/auth');
  });
});

export {};
