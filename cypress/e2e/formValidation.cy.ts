describe('로그인 폼 유효성 검사', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('초기에는 오류 없음', () => {
    cy.get('[data-cy="emailErrorMessage"]').should('not.exist');
    cy.get('[data-cy="passwordErrorMessage"]').should('not.exist');
  });
  it('이메일', () => {});
  it('비밀번호', () => {});
  it('제출 버튼 비활성화', () => {});
});

export {};
