import { TodoType } from '../../pages/todos/[id]';
import { toKoreanTime } from '../../utils/time';

const DUMMY_TODOS: Omit<TodoType, 'id'>[] = [
  {
    content: `법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.

국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 비상계엄이 선포된 때에는 법률이 정하는 바에 의하여 영장제도, 언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한 조치를 할 수 있다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.

감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.`,
    createdAt: '2023-01-09T06:08:19.013Z',

    title: '할 일 1',
    updatedAt: '2023-01-20T06:08:19.013Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-10T06:11:29.907Z',

    title: '할 일 2',
    updatedAt: '2023-01-10T10:11:29.907Z',
  },
  {
    content: `법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.

국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 비상계엄이 선포된 때에는 법률이 정하는 바에 의하여 영장제도, 언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한 조치를 할 수 있다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.

감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.`,
    createdAt: '2023-01-11T06:12:32.568Z',

    title: '할 일 3',
    updatedAt: '2023-01-11T06:15:42.767Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:13:01.111Z',

    title:
      '매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목',
    updatedAt: '2023-01-11T06:13:01.111Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:16:37.463Z',

    title: '할 일 5',
    updatedAt: '2023-01-11T06:16:37.463Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:17:49.959Z',

    title: '할 일 6',
    updatedAt: '2023-01-11T06:17:49.959Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:18:04.602Z',

    title: '할 일 7',
    updatedAt: '2023-01-11T06:18:04.602Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:18:16.004Z',

    title: '할 일 8',
    updatedAt: '2023-01-11T06:18:16.004Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:19:37.463Z',

    title: '할 일 9',
    updatedAt: '2023-01-11T06:42:37.463Z',
  },
  {
    content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
    createdAt: '2023-01-11T06:25:37.463Z',

    title: '할 일 10',
    updatedAt: '2023-01-11T06:40:37.463Z',
  },
  {
    content: ``,
    createdAt: '2023-01-12T06:25:37.463Z',

    title: '할 일 11',
    updatedAt: '2023-01-12T06:45:37.463Z',
  },
  {
    content: `국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.`,
    createdAt: '2023-01-13T06:25:37.463Z',

    title: '',
    updatedAt: '2023-01-13T06:45:37.463Z',
  },
  {
    content: `국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.`,
    createdAt: '2023-01-14T06:25:37.463Z',

    title: '할 일 13',
    updatedAt: '2023-01-14T06:45:37.463Z',
  },
];

// 사이프러스 모듈 오류로 인해 컴포넌트에서 가져오는 대신 복사했습니다.
const SORT_BY: Dictionary = {
  createdAt: '생성된 시간',
  updatedAt: '수정된 시간',
  title: '제목',
};
const ORDER: Dictionary = {
  ascending: '오름차순',
  descending: '내림차순',
};
interface Dictionary {
  [index: string]: string;
}

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
    const seededTodo10 = DUMMY_TODOS[9];

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
    const deletedTodo = DUMMY_TODOS[6];

    cy.contains(deletedTodo.title).click();
    cy.get('[data-cy="delete"]').click();
    cy.get('[data-cy="confirmDelete"]').click();

    cy.url().should('include', 'index');
    cy.contains(deletedTodo.title).should('not.exist');
  });
});

describe('ToDo 정렬', () => {
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

    const reversedDummyTodos = [...DUMMY_TODOS].reverse();
    reversedDummyTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('생성된 시간 오름차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(ORDER.ascending).click();
    DUMMY_TODOS.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('수정된 시간 내림차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(SORT_BY.updatedAt).click();

    const sortedTodos = [...DUMMY_TODOS].sort(
      (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    );
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });

  it('제목 오름차순', () => {
    cy.get('[data-cy="sortingButton"]').click();
    cy.contains(SORT_BY.title).click();
    cy.contains(ORDER.ascending).click();

    const sortedTodos = [...DUMMY_TODOS].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    sortedTodos.forEach((todo, index) => {
      cy.get(`[data-cy-todo-index="${index}"]`).should('have.text', todo.title);
    });
  });
});

export {};
