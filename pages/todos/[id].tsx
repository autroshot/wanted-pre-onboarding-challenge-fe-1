import Head from 'next/head';
import { useRouter } from 'next/router';
import BlockUnloginedUserModal from '../../components/blockUnloginedUser';
import TodoContainer from '../../components/todo/container';
import { useLoginToken } from '../../hooks/useLoginToken';

export default function Todo() {
  const router = useRouter();
  const loginToken = useLoginToken();

  return (
    <>
      <Head>
        <title>ToDo | ToDo</title>
      </Head>
      {loginToken === null ? (
        <BlockUnloginedUserModal router={router} />
      ) : (
        <TodoContainer loginToken={loginToken} />
      )}
    </>
  );
}
