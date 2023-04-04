import { TODO } from 'constants/terms';
import Head from 'next/head';
import Component from '../../components/todo';
import UnloginedUserModal from '../../components/unlogined-user-modal';
import { useAuth } from '../../hooks/use-auth';

export default function Todo() {
  const { loginToken } = useAuth();

  return (
    <>
      <Head>
        <title>{`${TODO} | ${TODO}`}</title>
      </Head>
      {loginToken === null ? (
        <UnloginedUserModal />
      ) : (
        <Component loginToken={loginToken} />
      )}
    </>
  );
}
