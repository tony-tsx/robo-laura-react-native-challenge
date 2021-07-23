import useSWR from 'swr';
import {fetcher} from '../helpers/fetcher';

export const useOrgs = (nickname: string | null) => {
  return useSWR<any[]>(nickname ? `/users/${nickname}/repos` : null, fetcher);
};
