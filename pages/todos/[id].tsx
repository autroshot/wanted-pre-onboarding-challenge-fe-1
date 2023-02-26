import Head from 'next/head';
import { useRouter } from 'next/router';
import BlockUnloginedUserModal from '../../components/blockUnloginedUser';
import Container from '../../components/todo/container';
import { useLoginToken } from '../../hooks/useLoginToken';

export default function ToDo() {
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
        <Container loginToken={loginToken} />
      )}
    </>
  );
}
