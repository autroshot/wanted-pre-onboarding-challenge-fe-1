import { TodoType } from '../../../pages/todos/[id]';
import Todo from './todo';

export default function Todos({ todos, selectedTodoId, onItemClick }: Props) {
  return (
    <>
      {todos
        ? todos.map((todo) => {
            return (
              <Todo
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
