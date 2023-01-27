import { TodoType } from '../../../pages/todos/[id]';
import Todo from './todo';

export default function Todos({ todos, selectedTodoId, onTodoClick }: Props) {
  return (
    <>
      {todos
        ? todos.map((todo, index, array) => {
            return (
              <Todo
                key={todo.id}
                title={todo.title}
                isSelected={todo.id === selectedTodoId}
                onClick={() => onTodoClick(todo.id)}
                dataCy={`todo${array.length - index}`}
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
