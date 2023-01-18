import { TodoType } from '../../../pages/todos/[id]';
import Todo from './todo';

export default function Todos({ todos, selectedTodoId, onTodoClick }: Props) {
  return (
    <>
      {todos
        ? todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                title={todo.title}
                isSelected={todo.id === selectedTodoId}
                onClick={() => onTodoClick(todo.id)}
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
  onTodoClick: (todoId: string) => void;
}