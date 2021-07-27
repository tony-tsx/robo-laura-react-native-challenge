import useSWR from 'swr';
import {fetcher} from '../helpers/fetcher';
import {IRepo} from '../interfaces/IRepo';

export const useRepositories = (nickname: string | null) => {
  return useSWR<IRepo[]>(nickname ? `/users/${nickname}/repos` : null, fetcher);
};
