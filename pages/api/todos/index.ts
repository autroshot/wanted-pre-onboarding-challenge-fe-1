import { createTodo, getTodos } from 'controllers/todo';
import { handler } from 'utils/api';

export default handler({
  POSTController: createTodo,
  GETController: getTodos,
});
