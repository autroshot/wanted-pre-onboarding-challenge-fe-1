import { deleteTodo, updateTodo } from 'controllers/todo';
import { newControllerSwitch } from 'utils/api';

export default newControllerSwitch({
  PUTController: updateTodo,
  DELETEController: deleteTodo,
});
