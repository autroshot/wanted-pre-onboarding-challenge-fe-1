import { Text } from '@chakra-ui/react';

export default function DisplayTime({ title, ISOString }: Props) {
  return (
    <Text fontSize="xs">
      {title}: {toKoreanTime(ISOString)}
    </Text>
  );

  function toKoreanTime(ISOString: string) {
    const date = new Date(Date.parse(ISOString));
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  }
}

interface Props {
  title: string;
  ISOString: string;
}
