import { useLoginToken } from './useLoginToken';

export function useIsLogined() {
  return useLoginToken() !== null;
}
