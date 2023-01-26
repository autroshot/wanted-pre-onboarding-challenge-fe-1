import { Text } from '@chakra-ui/react';
import { toKoreanTime } from '../../../utils/time';

export default function DisplayTime({ title, ISOString, dataCy }: Props) {
  return (
    <Text fontSize="xs" data-cy={dataCy}>
      {title}: {toKoreanTime(ISOString)}
    </Text>
  );
}

interface Props {
  title: string;
  ISOString: string;
  dataCy: string;
}
