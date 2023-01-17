import { TodoType } from '../../../pages/todos/[id]';
import Item from './item';

export default function Items({ todos, selectedTodoId, onItemClick }: Props) {
  return (
    <>
      {todos
        ? todos.map((todo) => {
            return (
              <Item
                key={todo.id}
                title={todo.title}
                isSelected={todo.id === selectedTodoId}
                onClick={() => onItemClick(todo.id)}
              />
            );
          })
        : null}
    </>
  );
}

interface Props {
  todos: null | TodoType[];
  selectedTodoId: null | string;
  onItemClick: (todoId: string) => void;
}
