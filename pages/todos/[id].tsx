import { TODO } from 'constants/terms';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BlockUnloginedUserModal from '../../components/block-unlogined-user-modal';
import TodoContainer from '../../components/todo/container';
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
        <BlockUnloginedUserModal router={router} />
      ) : (
        <TodoContainer loginToken={loginToken} />
      )}
    </>
  );
}
