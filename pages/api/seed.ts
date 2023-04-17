import { seed } from 'controllers/seed';
import { newControllerSwitch } from 'utils/api';

export default newControllerSwitch({ GETController: seed });
