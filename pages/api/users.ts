import { signUp } from 'controllers/auth';
import { handler } from 'utils/api';

export default handler({ POSTController: signUp });
