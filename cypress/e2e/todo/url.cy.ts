import { TodoSeed } from 'db/seeds';
import { Todo } from 'types/todo';
import { commonBeforeEach } from './utils';

const dummyTodos = new TodoSeed();

describe('URL', () => {
  beforeEach(() => {
    commonBeforeEach();
  });

  it('기본', () => {
    const todo2 = dummyTodos.getTodoWithEmptyId(1);
    const todo3 = dummyTodos.getTodoWithEmptyId(2);
    const todo4 = dummyTodos.getTodoWithEmptyId(3);
    const todo5 = dummyTodos.getTodoWithEmptyId(4);

    const history = [todo2, todo3, todo4, todo5, todo4, todo3];

    history.forEach((todo, index) => {
      cy.contains<HTMLElement>(todo.title).then(($todo) => {
        history[index].id = $todo.attr('data-cy-todo-id') as string;
      });

      cy.contains(todo.title).click();
    });

    const newHistory = [...history];

    newHistory.pop();
    newHistory.reverse();

    cy.then(() => {
      newHistory.forEach((todo) => {
        cy.go('back');

        cy.url().should('include', todo.id);
        cy.get('[data-cy="title"]').should('have.value', todo.title);
      });

      cy.go('back');

      cy.url().should('include', 'index');
    });
  });

  it('중간에 ToDo 추가', () => {
    const todo2 = dummyTodos.getTodoWithEmptyId(1);
    const todo3 = dummyTodos.getTodoWithEmptyId(2);
    const todo4 = dummyTodos.getTodoWithEmptyId(3);
    const newTodo: Pick<Todo, 'id' | 'title'> = {
      id: '',
      title: '새 할 일',
    };

    const history = [todo2, todo3, todo4, newTodo, todo4, todo3];

    history.forEach((todo) => {
      if (todo.title === newTodo.title) {
        cy.get('[data-cy="addTodo"]').click();

        cy.get('[data-cy-todo-index="0"]').then(($todo) => {
          todo.id = $todo.attr('data-cy-todo-id') as string;
        });

        return;
      }

      cy.contains<HTMLElement>(todo.title).then(($todo) => {
        todo.id = $todo.attr('data-cy-todo-id') as string;
      });

      cy.contains(todo.title).click();
    });

    const newHistory = [...history];

    newHistory.pop();
    newHistory.reverse();

    cy.then(() => {
      newHistory.forEach((todo) => {
        cy.go('back');

        if (todo.title === '새 할 일') {
          cy.url().should('include', todo.id);

          return;
        }

        cy.url().should('include', todo.id);
        cy.get('[data-cy="title"]').should('have.value', todo.title);
      });
    });
  });

  it('중간에 ToDo 갱신', () => {
    const todo2 = dummyTodos.getTodoWithEmptyId(1);
    const todo3 = dummyTodos.getTodoWithEmptyId(2);
    const todo4 = dummyTodos.getTodoWithEmptyId(3);
    const toBeUpdatedTodo = dummyTodos.getTodoWithEmptyId(4);
    const newTitle = '수정된 할 일';

    const history = [todo2, todo3, todo4, toBeUpdatedTodo, todo4, todo3];

    history.forEach((todo) => {
      cy.contains<HTMLElement>(todo.title).then(($todo) => {
        todo.id = $todo.attr('data-cy-todo-id') as string;
      });

      cy.contains(todo.title).click();

      if (todo.title === toBeUpdatedTodo.title) {
        cy.get('[data-cy="editMode"]').click();
        cy.get('[data-cy="title"]').type(`{selectAll}{del}${newTitle}`);
        cy.get('[data-cy="submit"]').click();

        toBeUpdatedTodo.title = newTitle;

        return;
      }
    });

    const newHistory = [...history];

    newHistory.pop();
    newHistory.reverse();

    cy.then(() => {
      newHistory.forEach((todo) => {
        cy.go('back');

        cy.url().should('include', todo.id);
        cy.get('[data-cy="title"]').should('have.value', todo.title);
      });
    });
  });

  it('중간에 ToDo 제거', () => {
    const todo2 = dummyTodos.getTodoWithEmptyId(1);
    const todo3 = dummyTodos.getTodoWithEmptyId(2);
    const todo4 = dummyTodos.getTodoWithEmptyId(3);
    const toBeRemovedTodo = dummyTodos.getTodoWithEmptyId(4);

    const history = [todo2, todo3, todo4, toBeRemovedTodo, todo4, todo3];

    history.forEach((todo) => {
      cy.contains<HTMLElement>(todo.title).then(($todo) => {
        todo.id = $todo.attr('data-cy-todo-id') as string;
      });

      cy.contains(todo.title).click();

      if (todo.title === toBeRemovedTodo.title) {
        cy.get('[data-cy="delete"]').click();
        cy.get('[data-cy="confirm"]').click();

        return;
      }
    });

    const newHistory = [...history];

    newHistory.pop();
    newHistory.reverse();

    cy.then(() => {
      newHistory.forEach((todo) => {
        cy.go('back');

        if (todo === toBeRemovedTodo) {
          cy.url().should('include', todo.id);
          cy.get('[data-cy="defaultDetail"]');

          return;
        }

        cy.url().should('include', todo.id);
        cy.get('[data-cy="title"]').should('have.value', todo.title);
      });
    });
  });
});

export {};
