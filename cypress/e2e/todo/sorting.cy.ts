import { ORDER, SORT_BY } from 'components/todo/list/sorting-menu/contants';
import { TodoSeed } from 'db/seeds';
import { commonBeforeEach } from './utils';

const dummyTodos = new TodoSeed();

describe('정렬', () => {
  beforeEach(() => {
    commonBeforeEach();
  });

  it('기본', () => {
    cy.get('[data-cy="sortingButton"]').should(
      'have.text',
      `${SORT_BY.createdAt} ${ORDER.descending}`
    );

    const sortedTodos = dummyTodos.getTodosWithEmptyId().reverse();
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('생성된 시간 오름차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(ORDER.ascending).click();

    const sortedTodos = dummyTodos.getTodosWithEmptyId();
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('수정된 시간 내림차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(SORT_BY.updatedAt).click();

    const sortedTodos = dummyTodos
      .getTodosWithEmptyId()
      .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('제목 오름차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(SORT_BY.title).click();
    cy.contains(ORDER.ascending).click();

    const sortedTodos = dummyTodos
      .getTodosWithEmptyId()
      .sort((a, b) => a.title.localeCompare(b.title));
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });
});

export {};
