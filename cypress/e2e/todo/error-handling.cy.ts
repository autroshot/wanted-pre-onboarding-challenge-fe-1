import { TOKEN_VALIDATION_ERROR } from 'controllers/contants';
import { commonBeforeEach } from './utils';

describe('오류 처리', () => {
  beforeEach(() => {
    commonBeforeEach();
  });

  it('로그인 토큰이 없는 C', () => {
    cy.intercept('POST', '**/todos', (req) => {
      req.headers = { authorization: '' };
    });

    cy.get('[data-cy="addTodo"]').click();

    cy.get('[id^=toast][id$=description]').should(
      'contain',
      TOKEN_VALIDATION_ERROR
    );
  });
});

export {};
