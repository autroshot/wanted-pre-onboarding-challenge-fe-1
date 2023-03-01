import { Button, LinkBox, LinkOverlay } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function ButtonLink({ href, text }: Props) {
  return (
    <LinkBox>
      <NextLink href={href} legacyBehavior>
        <LinkOverlay>
          <Button>{text}</Button>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
}

interface Props {
  href: string;
  text: string;
}
