import { TODO } from 'constants/terms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TodoContainer from '../../components/todo/container';
import UnloginedUserModal from '../../components/unlogined-user-modal';
import { useAuth } from '../../hooks/use-auth';

export default function Todo() {
  const router = useRouter();
  const { loginToken } = useAuth();

  return (
    <>
      <Head>
        <title>
          {TODO} | {TODO}
        </title>
      </Head>
      {loginToken === null ? (
        <UnloginedUserModal router={router} />
      ) : (
        <TodoContainer loginToken={loginToken} />
      )}
    </>
  );
}
