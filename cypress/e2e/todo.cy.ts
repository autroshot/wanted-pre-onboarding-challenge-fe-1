import { TOKEN_VALIDATION_ERROR } from 'controllers/contants';
import { Todo, TodoInput } from 'types/todo';
import { toKoreanTime } from '../../components/todo/detail/display-time/utils';
import {
  ORDER,
  SORT_BY,
} from '../../components/todo/list/sorting-menu/contants';
import { TodoSeed } from '../../db/seeds';

const dummyTodos = new TodoSeed();

describe('CRUD', () => {
  beforeEach(() => {
    commonBeforeEach();
  });

  it('R', () => {
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

  it('C', () => {
    const newTodo: Pick<Todo, 'title' | 'content'> = {
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

function commonBeforeEach() {
  cy.request('GET', '/api/seed');

  cy.seedUserLogin();

  cy.visit('/todos/index');

  cy.get('[data-cy="todo"]');
}

function plusOneSecond(date: Date) {
  return new Date(date.getTime() + 1000);
}

function matchElementTextWithDate(date: Date) {
  const ISOString = date.toISOString();
  const plusOneSecondISOString = plusOneSecond(date).toISOString();

  return ($el: JQuery<HTMLElement>) => {
    const text = $el.text();

    expect(text).to.be.oneOf([
      toKoreanTime(ISOString),
      toKoreanTime(plusOneSecondISOString),
    ]);
  };
}

export {};
