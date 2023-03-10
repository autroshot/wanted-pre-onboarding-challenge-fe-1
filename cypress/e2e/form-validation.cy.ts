import { ERROR_MESSAGE } from '../../components/auth/constants';

describe('로그인 폼 유효성 검사', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('초기에는 오류 없음', () => {
    cy.get('[data-cy="emailErrorMessage"]').should('not.exist');
    cy.get('[data-cy="passwordErrorMessage"]').should('not.exist');
  });

  it('이메일 필숫값', () => {
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').click();
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').click();
    cy.get('[data-cy="loginForm"] [data-cy="emailErrorMessage"]').should(
      'have.text',
      ERROR_MESSAGE.REQUIRED
    );
  });

  it('유효한 이메일 형식', () => {
    const validEmails = [
      'prettyandsimple@example.com',
      'very.common@example.com',
      'fully-qualified-domain@example.com',
    ];
    const invalidEmails = [
      'Abc.example.com',
      'A@b@c@example.com',
      'this is"notallowed@example.com',
      'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
    ];

    validEmails.forEach((validEmail) => {
      cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(validEmail);
      cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').click();
      cy.get('[data-cy="loginForm"] [data-cy="emailErrorMessage"]').should(
        'not.exist'
      );

      cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(
        '{selectAll} {backspace}'
      );
    });

    invalidEmails.forEach((invalidEmail) => {
      cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(invalidEmail);
      cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').click();
      cy.get('[data-cy="loginForm"] [data-cy="emailErrorMessage"]').should(
        'have.text',
        ERROR_MESSAGE.EMAIL_PATTERN
      );

      cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(
        '{selectAll} {backspace}'
      );
    });
  });

  it('비밀번호 필숫값', () => {
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').click();
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').click();
    cy.get('[data-cy="loginForm"] [data-cy="passwordErrorMessage"]').should(
      'have.text',
      ERROR_MESSAGE.REQUIRED
    );
  });

  it('비밀번호 최소 길이', () => {
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type('1234567');
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').click();
    cy.get('[data-cy="loginForm"] [data-cy="passwordErrorMessage"]').should(
      'have.text',
      ERROR_MESSAGE.PASSWORD_MIN_LENGTH
    );

    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type('8');
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').click();
    cy.get('[data-cy="loginForm"] [data-cy="passwordErrorMessage"]').should(
      'not.exist'
    );
  });

  it('제출 버튼 비활성화', () => {
    cy.get('[data-cy="loginForm"] [data-cy="submitButton"]').as('submitButton');

    cy.get('@submitButton').should('have.attr', 'disabled');

    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(
      'hong@gmail.com'
    );
    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type('12345678');
    cy.get('@submitButton').should('have.not.attr', 'disabled');

    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(
      '{selectAll} {backspace}'
    );
    cy.get('@submitButton').should('have.attr', 'disabled');
    cy.get('[data-cy="loginForm"] [data-cy="emailInput"]').type(
      'hong@gmail.com'
    );
    cy.get('@submitButton').should('have.not.attr', 'disabled');

    cy.get('[data-cy="loginForm"] [data-cy="passwordInput"]').type(
      '{backspace}'
    );
    cy.get('@submitButton').should('have.attr', 'disabled');
  });
});

export {};
