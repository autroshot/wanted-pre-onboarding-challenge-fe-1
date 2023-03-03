import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { LOGIN, SIGN_UP, TODO } from 'constants/terms';
import Head from 'next/head';
import LoginForm from '../components/auth/login-form';
import SignUpForm from '../components/auth/sign-up-form';

export default function Auth() {
  return (
    <>
      <Head>
        <title>{`${LOGIN} 및 ${SIGN_UP} | ${TODO}`}</title>
      </Head>
      <Container my="5">
        <Tabs isFitted variant="enclosed-colored">
          <TabList>
            <Tab>{LOGIN}</Tab>
            <Tab>{SIGN_UP}</Tab>
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
