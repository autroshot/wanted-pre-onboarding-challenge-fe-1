import { deleteTodo, updateTodo } from 'controllers/todo';
import { handler } from 'utils/api';

export default handler({
  PUTController: updateTodo,
  DELETEController: deleteTodo,
});
