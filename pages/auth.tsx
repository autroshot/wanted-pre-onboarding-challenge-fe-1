import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { LOGIN, TODO } from 'constants/terms';
import Head from 'next/head';
import LoginForm from '../components/auth/loginForm';
import SignUpForm from '../components/auth/signUpForm';

export default function Auth() {
  return (
    <>
      <Head>
        <title>
          {LOGIN} 및 회원가입 | {TODO}
        </title>
      </Head>
      <Container my="5">
        <Tabs isFitted variant="enclosed-colored">
          <TabList>
            <Tab>{LOGIN}</Tab>
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
