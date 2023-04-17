import { login } from 'controllers/auth';
import { handler } from 'utils/api';

export default handler({ POSTController: login });
