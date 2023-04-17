import { createTodo, getTodos } from 'controllers/todo';
import { newControllerSwitch } from 'utils/api';

export default newControllerSwitch({
  POSTController: createTodo,
  GETController: getTodos,
});
