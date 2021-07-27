import useSWR from 'swr';
import {fetcher} from '../helpers/fetcher';

export const useUserAccountDetails = (nickname: string | null) => {
  return useSWR<any>(nickname ? `/users/${nickname}` : null, fetcher);
};
