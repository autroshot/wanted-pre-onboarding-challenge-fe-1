import { TodoSeed } from 'db/seeds';
import { Todo } from 'types/todo';
import { commonBeforeEach } from './utils';

const dummyTodos = new TodoSeed();

describe('취소', () => {
  beforeEach(() => {
    commonBeforeEach();
  });

  it('수정 취소', () => {
    const seedTodo13 = dummyTodos.getTodoWithEmptyId(12);
    const updatedTodo: Pick<Todo, 'title' | 'content'> = {
      title: '수정된 할 일',
      content: '이것은 수정된 할 일의 내용입니다.',
    };

    cy.contains(seedTodo13.title).click();
    cy.get('[data-cy="editMode"]').click();
    cy.get('[data-cy="title"]').type(`{selectAll}{del}${updatedTodo.title}`);
    cy.get('[data-cy="content"]').type(
      `{selectAll}{del}${updatedTodo.content}`
    );
    cy.get('[data-cy="cancel"]').click();

    cy.get('[data-cy="title"]').should('have.value', seedTodo13.title);
    cy.get('[data-cy="content"]').should('have.value', seedTodo13.content);
  });

  it('삭제 취소', () => {
    const seedTodo11 = dummyTodos.getTodoWithEmptyId(10);

    cy.contains(seedTodo11.title).click();
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="cancel"]').click();

    cy.contains(seedTodo11.title);
    cy.get('[data-cy="title"]').should('have.value', seedTodo11.title);
  });
});

export {};
