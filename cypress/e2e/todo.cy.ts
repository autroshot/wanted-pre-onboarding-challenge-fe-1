import { TodoType } from '../../pages/todos/[id]';
import { toKoreanTime } from '../../utils/time';

describe('ToDo', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seededUserLogin();
    cy.visit('/todos/index');
    cy.get('[data-cy="todo1"]');
  });

  it('페이지', () => {
    cy.contains('목록에서 ToDo를 선택하세요.');
    cy.contains('할 일 13');
  });

  it('R', () => {
    const seededTodo10: Omit<TodoType, 'id'> = {
      title: '할 일 10',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:25:37.463Z',
      updatedAt: '2023-01-11T06:40:37.463Z',
    };

    cy.contains(seededTodo10.title).click();

    cy.get('[data-cy="todo10"]').then(($todo) => {
      const id = $todo.attr('data-cy-todo-id');

      cy.url().should('include', id);
    });
    cy.get('[data-cy="title"]').should('have.value', seededTodo10.title);
    cy.get('[data-cy="content"]').should('have.value', seededTodo10.content);
    cy.get('[data-cy="createdAt"]').should(
      'contain',
      toKoreanTime(seededTodo10.createdAt)
    );
    cy.get('[data-cy="updatedAt"]').should(
      'contain',
      toKoreanTime(seededTodo10.updatedAt)
    );
  });

  it('C', () => {
    const newTodo: Pick<TodoType, 'title' | 'content'> = {
      title: '새 할 일',
      content: '이것은 새 할 일의 내용입니다.',
    };

    cy.get('[data-cy="addTodo"]').click();
    const createdISOString = new Date().toISOString();

    cy.get('[data-cy="todo14"]').then(($todo) => {
      const id = $todo.attr('data-cy-todo-id');

      cy.url().should('include', id);
    });

    cy.get('[data-cy="title"]').type(newTodo.title);
    cy.get('[data-cy="content"]').type(newTodo.content);
    cy.get('[data-cy="submit"]').click();

    cy.visit('/todos/index');
    cy.contains(newTodo.title).click();
    cy.get('[data-cy="title"]').should('have.value', newTodo.title);
    cy.get('[data-cy="content"]').should('have.value', newTodo.content);
    cy.get('[data-cy="createdAt"]').should(
      'contain',
      toKoreanTime(createdISOString)
    );
    cy.get('[data-cy="updatedAt"]').should(
      'contain',
      toKoreanTime(createdISOString)
    );
  });

  it('U', () => {
    const updatedTodo: Pick<TodoType, 'title' | 'content'> = {
      title: '수정된 할 일',
      content: '이것은 수정된 할 일의 내용입니다.',
    };
    const createdISOString = '2023-01-11T06:25:37.463Z';

    cy.contains('할 일 10').click();
    cy.get('[data-cy="editMode"]').click();
    cy.get('[data-cy="title"]').type(`{selectAll}{del}${updatedTodo.title}`);
    cy.get('[data-cy="content"]').type(
      `{selectAll}{del}${updatedTodo.content}`
    );
    cy.get('[data-cy="submit"]').click();
    const updatedISOString = new Date().toISOString();

    cy.visit('/todos/index');
    cy.contains(updatedTodo.title).click();
    cy.get('[data-cy="title"]').should('have.value', updatedTodo.title);
    cy.get('[data-cy="content"]').should('have.value', updatedTodo.content);
    cy.get('[data-cy="createdAt"]').should(
      'contain',
      toKoreanTime(createdISOString)
    );
    cy.get('[data-cy="updatedAt"]').should(
      'contain',
      toKoreanTime(updatedISOString)
    );
  });

  it('D', () => {
    cy.contains('할 일 1').click();
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="confirmDelete"]').click();
  });
});
