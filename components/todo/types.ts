// Todo 컴포넌트와의 이름 충돌 때문에 이름으로 TodoType을 사용합니다.
export interface TodoType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type TodoInput = Pick<TodoType, 'title' | 'content'>;

export type TodoSortBy = Extract<
  'title' | 'createdAt' | 'updatedAt',
  keyof TodoType
>;
export type TodoSortOrder = 'ascending' | 'descending';
