import { ORDER, SORT_BY } from '../../constants/todos/list';
import { TodoType } from '../../pages/todos/[id]';
import { toKoreanTime } from '../../utils/time';
import { DummyTodos } from './dummy';

const dummyTodos = new DummyTodos();

describe('ToDo 페이지와 CRUD', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seededUserLogin();
    cy.visit('/todos/index');
    cy.get('[data-cy="todo"]');
  });

  it('페이지', () => {
    cy.contains('목록에서 ToDo를 선택하세요.');
    cy.contains('할 일 13');
  });

  it('R', () => {
    const seededTodo10 = dummyTodos.getTodoWithEmptyId(9);

    cy.contains(seededTodo10.title).click();

    cy.contains<HTMLElement>(seededTodo10.title).then(($todo) => {
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
    const deletedTodo = dummyTodos.getTodoWithEmptyId(6);

    cy.contains(deletedTodo.title).click();
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="confirm"]').click();

    cy.contains('목록에서 ToDo를 선택하세요.');
    cy.contains(deletedTodo.title).should('not.exist');
  });
});

describe('정렬', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seededUserLogin();
    cy.visit('/todos/index');
    cy.get('[data-cy="todo"]');
  });

  it('기본', () => {
    cy.get('[data-cy="sortingButton"]').should(
      'have.text',
      `${SORT_BY.createdAt} ${ORDER.descending}`
    );

    const sortedTodos = dummyTodos.getTodos().reverse();
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('생성된 시간 오름차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(ORDER.ascending).click();

    const sortedTodos = dummyTodos.getTodos();
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('수정된 시간 내림차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(SORT_BY.updatedAt).click();

    const sortedTodos = dummyTodos
      .getTodos()
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
      .getTodos()
      .sort((a, b) => a.title.localeCompare(b.title));
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });
});

describe('취소', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seededUserLogin();
    cy.visit('/todos/index');
    cy.get('[data-cy="todo"]');
  });

  it('수정 취소', () => {
    const seededTodo13 = dummyTodos.getTodoWithEmptyId(12);
    const updatedTodo: Pick<TodoType, 'title' | 'content'> = {
      title: '수정된 할 일',
      content: '이것은 수정된 할 일의 내용입니다.',
    };

    cy.contains(seededTodo13.title).click();
    cy.get('[data-cy="editMode"]').click();
    cy.get('[data-cy="title"]').type(`{selectAll}{del}${updatedTodo.title}`);
    cy.get('[data-cy="content"]').type(
      `{selectAll}{del}${updatedTodo.content}`
    );
    cy.get('[data-cy="cancel"]').click();

    cy.get('[data-cy="title"]').should('have.value', seededTodo13.title);
    cy.get('[data-cy="content"]').should('have.value', seededTodo13.content);
  });

  it('삭제 취소', () => {
    const seededTodo11 = dummyTodos.getTodoWithEmptyId(10);

    cy.contains(seededTodo11.title).click();
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="cancel"]').click();

    cy.contains(seededTodo11.title);
    cy.get('[data-cy="title"]').should('have.value', seededTodo11.title);
  });
});

describe('URL', () => {
  beforeEach(() => {
    cy.request('GET', `${Cypress.env('server_url')}/seed`);
    cy.seededUserLogin();
    cy.visit('/todos/index');
    cy.get('[data-cy="todo"]');
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
    const newTodo: Pick<TodoType, 'id' | 'title'> = {
      id: '',
      title: '새 할 일',
    };
    const history = [todo2, todo3, todo4, newTodo, todo4, todo3];

    history.forEach((todo) => {
      if (todo.title === '새 할 일') {
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

      if (todo.title === toBeUpdatedTodo.title) {
        cy.contains(todo.title).click();
        cy.get('[data-cy="editMode"]').click();
        cy.get('[data-cy="title"]').type(`{selectAll}{del}${newTitle}`);
        cy.get('[data-cy="submit"]').click();

        toBeUpdatedTodo.title = newTitle;

        return;
      }

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

      if (todo.title === toBeRemovedTodo.title) {
        cy.contains(todo.title).click();
        cy.get('[data-cy="delete"]').click();
        cy.get('[data-cy="confirm"]').click();

        return;
      }

      cy.contains(todo.title).click();
    });

    const newHistory = [...history];
    newHistory.pop();
    newHistory.reverse();
    cy.then(() => {
      newHistory.forEach((todo) => {
        cy.go('back');

        if (todo === toBeRemovedTodo) {
          cy.url().should('include', todo.id);
          cy.contains('목록에서 ToDo를 선택하세요.');

          return;
        }

        cy.url().should('include', todo.id);
        cy.get('[data-cy="title"]').should('have.value', todo.title);
      });
    });
  });
});

export {};
