import { Link, useColorMode } from '@chakra-ui/react';
import styles from './github-link.module.css';

export default function GithubLink() {
  const { colorMode } = useColorMode();

  return (
    <Link
      href="https://github.com/autroshot/wanted-pre-onboarding-challenge-fe-1"
      isExternal
      className={
        colorMode === 'light' ? styles.githubLink : styles.darkGithubLink
      }
      aria-label="깃허브"
    />
  );
}
