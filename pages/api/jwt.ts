import { login } from 'controllers/auth';
import { newControllerSwitch } from 'utils/api';

export default newControllerSwitch({ POSTController: login });
