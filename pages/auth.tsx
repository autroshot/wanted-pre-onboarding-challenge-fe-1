import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Head from 'next/head';
import LoginForm from '../components/forms/login';
import SignUpForm from '../components/forms/signUp';

export default function Auth() {
  return (
    <>
      <Head>
        <title>로그인 및 회원가입 | ToDo</title>
      </Head>
      <Container my="5">
        <Tabs isFitted variant="enclosed-colored">
          <TabList>
            <Tab>로그인</Tab>
            <Tab>회원가입</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignUpForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}
