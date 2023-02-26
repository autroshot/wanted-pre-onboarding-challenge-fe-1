import { Text } from '@chakra-ui/react';
import { toKoreanTime } from './utils';

export default function DisplayTime({ title, ISOString, dataCy }: Props) {
  return (
    <Text fontSize="xs">
      {title}: <span data-cy={dataCy}>{toKoreanTime(ISOString)}</span>
    </Text>
  );
}

interface Props {
  title: string;
  ISOString: string;
  dataCy: string;
}
