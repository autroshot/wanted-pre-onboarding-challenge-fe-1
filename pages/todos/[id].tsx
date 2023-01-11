import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BlockUnloginedUser from '../../components/blockUnloginedUser';

export default function ToDo() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ToDo | ToDo</title>
      </Head>
      <BlockUnloginedUser router={router}>
        <Container maxW="container.md" my="5">
          <SimpleGrid columns={[1, null, 2]} spacing="5">
            <Box>
              <HStack mb="2">
                <Box>
                  <Menu closeOnSelect={false}>
                    <MenuButton as={Button} colorScheme="gray">
                      정렬 항목
                    </MenuButton>
                    <MenuList minWidth="240px">
                      <MenuOptionGroup defaultValue="default" type="radio">
                        <MenuItemOption value="default">기본</MenuItemOption>
                        <MenuItemOption value="title">제목</MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Box>
                <Box>
                  <Button colorScheme="gray">오름차순</Button>
                </Box>
              </HStack>
              <Box mb="2">
                <Button size="sm" w="100%" aria-label="할 일 추가">
                  <AddIcon />
                </Button>
              </Box>
              <Button
                colorScheme="gray"
                variant="ghost"
                w="100%"
                borderRadius="0"
              >
                <Box textAlign="start" w="100%">
                  할 일 1
                </Box>
              </Button>
              <Button
                colorScheme="gray"
                variant="ghost"
                w="100%"
                borderRadius="0"
              >
                <Box textAlign="start" w="100%">
                  할 일 1
                </Box>
              </Button>
              <Button
                colorScheme="gray"
                variant="ghost"
                w="100%"
                borderRadius="0"
              >
                <Box textAlign="start" w="100%">
                  할 일 1
                </Box>
              </Button>
              <Button
                colorScheme="gray"
                variant="ghost"
                w="100%"
                borderRadius="0"
              >
                <Box textAlign="start" w="100%">
                  할 일 1
                </Box>
              </Button>
              <Button
                colorScheme="gray"
                variant="ghost"
                w="100%"
                borderRadius="0"
              >
                <Box textAlign="start" w="100%">
                  할 일 1
                </Box>
              </Button>
            </Box>
            <Box p="3" borderWidth="1px" borderRadius="lg">
              <VStack spacing="2" h="100%">
                <Input placeholder="제목" />
                <Textarea h="100%" placeholder="내용" resize="none" />
                <Box w="100%">
                  <Text fontSize="xs">생성된 시간:</Text>
                </Box>
                <Box w="100%">
                  <Text fontSize="xs">수정된 시간:</Text>
                </Box>
                <Flex w="100%">
                  <Spacer />
                  <ButtonGroup>
                    <Button colorScheme="red" size="sm">
                      삭제
                    </Button>
                    <Button size="sm">수정</Button>
                  </ButtonGroup>
                </Flex>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </BlockUnloginedUser>
    </>
  );
}
