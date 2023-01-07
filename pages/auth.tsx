import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Head from 'next/head';
import AuthForm from '../components/forms/auth';

export default function Auth() {
  return (
    <>
      <Head>
        <title>로그인 및 회원가입 | ToDo</title>
      </Head>
      <Container>
        <Tabs isFitted variant="enclosed-colored">
          <TabList>
            <Tab>로그인</Tab>
            <Tab>회원가입</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AuthForm buttonText="로그인" />
            </TabPanel>
            <TabPanel>
              <AuthForm buttonText="회원가입" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}
