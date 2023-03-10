import { nanoid } from 'nanoid';
import { Todo } from 'types/todo';
import { UserInput } from 'types/user';

export class TodoSeed {
  readonly #TODOS_WITH_EMPTY_ID: Todo[] = [
    {
      id: '',
      title: '할 일 1',
      content: `법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.
  
  국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 비상계엄이 선포된 때에는 법률이 정하는 바에 의하여 영장제도, 언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한 조치를 할 수 있다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.
  
  감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.`,
      createdAt: '2023-01-09T06:08:19.013Z',
      updatedAt: '2023-01-20T06:08:19.013Z',
    },
    {
      id: '',
      title: '할 일 2',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-10T06:11:29.907Z',
      updatedAt: '2023-01-10T10:11:29.907Z',
    },
    {
      id: '',
      title: '할 일 3',
      content: `법률은 특별한 규정이 없는 한 공포한 날로부터 20일을 경과함으로써 효력을 발생한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다. 대한민국의 경제질서는 개인과 기업의 경제상의 자유와 창의를 존중함을 기본으로 한다. 국무총리·국무위원 또는 정부위원은 국회나 그 위원회에 출석하여 국정처리상황을 보고하거나 의견을 진술하고 질문에 응답할 수 있다.
  
  국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 비상계엄이 선포된 때에는 법률이 정하는 바에 의하여 영장제도, 언론·출판·집회·결사의 자유, 정부나 법원의 권한에 관하여 특별한 조치를 할 수 있다. 대통령은 국가의 안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는 명령을 발할 수 있다.
  
  감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다. 대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.`,
      createdAt: '2023-01-11T06:12:32.568Z',
      updatedAt: '2023-01-11T06:15:42.767Z',
    },
    {
      id: '',
      title:
        '매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목 매우 긴 제목',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:13:01.111Z',
      updatedAt: '2023-01-11T06:13:01.111Z',
    },
    {
      id: '',
      title: '할 일 5',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:16:37.463Z',
      updatedAt: '2023-01-11T06:16:37.463Z',
    },
    {
      id: '',
      title: '할 일 6',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:17:49.959Z',
      updatedAt: '2023-01-11T06:17:49.959Z',
    },
    {
      id: '',
      title: '할 일 7',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:18:04.602Z',
      updatedAt: '2023-01-11T06:18:04.602Z',
    },
    {
      id: '',
      title: '할 일 8',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:18:16.004Z',
      updatedAt: '2023-01-11T06:18:16.004Z',
    },
    {
      id: '',
      title: '할 일 9',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:19:37.463Z',
      updatedAt: '2023-01-11T06:42:37.463Z',
    },
    {
      id: '',
      title: '할 일 10',
      content: `원장은 국회의 동의를 얻어 대통령이 임명하고, 그 임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 대통령은 헌법과 법률이 정하는 바에 의하여 공무원을 임면한다. 국회는 의원의 자격을 심사하며, 의원을 징계할 수 있다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.`,
      createdAt: '2023-01-11T06:25:37.463Z',
      updatedAt: '2023-01-11T06:40:37.463Z',
    },
    {
      id: '',
      title: '할 일 11',
      content: ``,
      createdAt: '2023-01-12T06:25:37.463Z',
      updatedAt: '2023-01-12T06:45:37.463Z',
    },
    {
      id: '',
      title: '',
      content: `국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.`,
      createdAt: '2023-01-13T06:25:37.463Z',
      updatedAt: '2023-01-13T06:45:37.463Z',
    },
    {
      id: '',
      title: '할 일 13',
      content: `국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 국가원로자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.`,
      createdAt: '2023-01-14T06:25:37.463Z',
      updatedAt: '2023-01-14T06:45:37.463Z',
    },
  ];

  getTodoWithEmptyId(index: number): Todo {
    let result = this.#TODOS_WITH_EMPTY_ID[0];

    if (this.#TODOS_WITH_EMPTY_ID[index] !== undefined) {
      result = this.#TODOS_WITH_EMPTY_ID[index];
    }

    return { ...result };
  }

  getTodosWithEmptyId(): Todo[] {
    return [...this.#TODOS_WITH_EMPTY_ID];
  }

  getTodosWithGeneratedId(): Todo[] {
    const todosCopy = [...this.#TODOS_WITH_EMPTY_ID];

    todosCopy.forEach((todo) => (todo.id = nanoid()));

    return todosCopy;
  }
}

export class UserSeed {
  readonly #USER_INPUTS: UserInput[] = [
    { email: 'hong@gmail.com', password: '12345678' },
    { email: 'lee@gmail.com', password: '12345678' },
  ];

  getUserInputs(): UserInput[] {
    return [...this.#USER_INPUTS];
  }

  getUserInput(index: number): UserInput {
    let result = this.#USER_INPUTS[0];

    if (this.#USER_INPUTS[index] !== undefined) {
      result = this.#USER_INPUTS[index];
    }

    return { ...result };
  }
}
