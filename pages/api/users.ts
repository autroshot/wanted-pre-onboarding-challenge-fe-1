import { signUp } from 'controllers/auth';
import { newControllerSwitch } from 'utils/api';

export default newControllerSwitch({ POSTController: signUp });
