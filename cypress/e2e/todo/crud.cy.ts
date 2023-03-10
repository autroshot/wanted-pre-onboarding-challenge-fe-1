import { Todo, TodoInput } from 'types/todo';
import { toKoreanTime } from '../../../components/todo/detail/display-time/utils';
import { TodoSeed } from '../../../db/seeds';
import { commonBeforeEach, matchElementTextWithDate } from './utils';

const dummyTodos = new TodoSeed();

describe('CRUD', () => {
  beforeEach(() => {
    commonBeforeEach();
  });

  it('Read', () => {
    const seedTodo10 = dummyTodos.getTodoWithEmptyId(9);

    cy.contains(seedTodo10.title).click();

    cy.contains<HTMLElement>(seedTodo10.title).then(($todo) => {
      const id = $todo.attr('data-cy-todo-id');

      cy.url().should('include', id);
    });
    cy.get('[data-cy="title"]').should('have.value', seedTodo10.title);
    cy.get('[data-cy="content"]').should('have.value', seedTodo10.content);
    cy.get('[data-cy="createdAt"]').should(
      'contain',
      toKoreanTime(seedTodo10.createdAt)
    );
    cy.get('[data-cy="updatedAt"]').should(
      'contain',
      toKoreanTime(seedTodo10.updatedAt)
    );
  });

  it('Create', () => {
    const newTodo: Pick<Todo, 'title' | 'content'> = {
      title: '새 할 일',
      content: '이것은 새 할 일의 내용입니다.',
    };

    let createdDate = new Date();

    cy.get('[data-cy="addTodo"]')
      .click()
      .then(() => (createdDate = new Date()));

    cy.get('[data-cy-todo-index="0"]').then(($todo) => {
      const id = $todo.attr('data-cy-todo-id');

      cy.then(() => {
        cy.url().should('include', id);
      });
    });

    cy.get('[data-cy="title"]').type(newTodo.title);
    cy.get('[data-cy="content"]').type(newTodo.content);
    cy.get('[data-cy="submit"]').click();

    cy.visit('/todos/index');
    cy.contains(newTodo.title).click();
    cy.get('[data-cy="title"]').should('have.value', newTodo.title);
    cy.get('[data-cy="content"]').should('have.value', newTodo.content);
    cy.get('[data-cy="createdAt"]').then(matchElementTextWithDate(createdDate));
    cy.get('[data-cy="updatedAt"]').then(matchElementTextWithDate(createdDate));
  });

  it('Update', () => {
    const todoInput: TodoInput = {
      title: '수정된 할 일',
      content: '이것은 수정된 할 일의 내용입니다.',
    };
    const createdISOString = dummyTodos.getTodoWithEmptyId(9).createdAt;

    let updatedDate = new Date();

    cy.contains('할 일 10').click();
    cy.get('[data-cy="editMode"]').click();
    cy.get('[data-cy="title"]').type(`{selectAll}{del}${todoInput.title}`);
    cy.get('[data-cy="content"]').type(`{selectAll}{del}${todoInput.content}`);
    cy.get('[data-cy="submit"]')
      .click()
      .then(() => (updatedDate = new Date()));

    cy.visit('/todos/index');
    cy.contains(todoInput.title).click();
    cy.get('[data-cy="title"]').should('have.value', todoInput.title);
    cy.get('[data-cy="content"]').should('have.value', todoInput.content);
    cy.get('[data-cy="createdAt"]').should(
      'contain',
      toKoreanTime(createdISOString)
    );
    cy.get('[data-cy="updatedAt"]').then(matchElementTextWithDate(updatedDate));
  });

  it('Delete', () => {
    const deletedTodo = dummyTodos.getTodoWithEmptyId(6);

    cy.contains(deletedTodo.title).click();
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="confirm"]').click();

    cy.contains('목록에서 ToDo를 선택하세요.');
    cy.contains(deletedTodo.title).should('not.exist');
  });
});

export {};
